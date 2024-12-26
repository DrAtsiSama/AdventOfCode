const fs = require('fs');

/**
 * Lit le fichier d'entrée et le transforme en un tableau de lignes.
 * @param {string} file - Chemin du fichier d'entrée.
 * @returns {string[]} - Tableau des lignes d'entrée.
 */
function parseInput(file) {
    return fs.readFileSync(file, 'utf8').trim().split('\n');
}

// Mappage des coordonnées sur le pavé numérique (chaque touche a des coordonnées x et y).
const numMap = {
    "A": { x: 2, y: 0 }, // Position de la touche "A".
    "0": { x: 1, y: 0 },
    "1": { x: 0, y: 1 },
    "2": { x: 1, y: 1 },
    "3": { x: 2, y: 1 },
    "4": { x: 0, y: 2 },
    "5": { x: 1, y: 2 },
    "6": { x: 2, y: 2 },
    "7": { x: 0, y: 3 },
    "8": { x: 1, y: 3 },
    "9": { x: 2, y: 3 },
};

// Mappage des coordonnées pour les directions sur un pavé directionnel.
const dirMap = {
    "A": { x: 2, y: 1 }, // Position de départ "A".
    "^": { x: 1, y: 1 },
    "<": { x: 0, y: 0 },
    "v": { x: 1, y: 0 },
    ">": { x: 2, y: 0 },
};

/**
 * Résout une partie spécifique (1 ou 2) du problème.
 * @param {string[]} input - Lignes d'entrée.
 * @param {number} part - Partie du problème (1 ou 2).
 * @returns {number} - Résultat calculé.
 */
function day21(input, part) {
    const robots = part === 2 ? 25 : 2; // Définit le nombre de robots en fonction de la partie.
    return getSequence(input, numMap, dirMap, robots);
}

/**
 * Calcule le total des séquences en utilisant les mouvements générés.
 * @param {string[]} input - Lignes d'entrée.
 * @param {object} numMap - Mappage des coordonnées sur le pavé numérique.
 * @param {object} dirMap - Mappage des directions sur le pavé directionnel.
 * @param {number} robotCount - Nombre de robots à utiliser.
 * @returns {number} - Total calculé.
 */
function getSequence(input, numMap, dirMap, robotCount) {
    let total = 0; // Initialisation du total.
    const cache = {}; // Cache pour stocker les résultats intermédiaires.

    for (let line of input) {
        const chars = line.split(''); // Découpe la ligne en caractères.
        const moves = getNumPadSequence(chars, 'A', numMap); // Génère la séquence de mouvements sur le pavé numérique.
        const length = countSequences(moves, robotCount, 1, cache, dirMap); // Calcule les séquences possibles.
        const multiplier = parseInt(line.slice(0, 3).replace(/^0+/, ''), 10); // Multiplie par les 3 premiers chiffres de la ligne.
        total += multiplier * length; // Ajoute le produit au total.
    }

    return total; // Retourne le total final.
}

/**
 * Génère une séquence de mouvements sur le pavé numérique.
 * @param {string[]} input - Séquence de touches à appuyer.
 * @param {string} start - Position de départ sur le pavé.
 * @param {object} numMap - Mappage des coordonnées sur le pavé numérique.
 * @returns {string[]} - Séquence des mouvements nécessaires.
 */
function getNumPadSequence(input, start, numMap) {
    let curr = numMap[start]; // Position actuelle.
    const seq = []; // Initialisation de la séquence des mouvements.

    for (let char of input) {
        const dest = numMap[char]; // Position de destination.
        const dx = dest.x - curr.x; // Différence horizontale (x).
        const dy = dest.y - curr.y; // Différence verticale (y).

        const horiz = []; // Mouvement horizontal.
        const vert = []; // Mouvement vertical.

        // Génère les mouvements horizontaux.
        for (let i = 0; i < Math.abs(dx); i++) {
            horiz.push(dx >= 0 ? '>' : '<'); // Droite (>) ou gauche (<).
        }

        // Génère les mouvements verticaux.
        for (let i = 0; i < Math.abs(dy); i++) {
            vert.push(dy >= 0 ? '^' : 'v'); // Haut (^) ou bas (v).
        }

        // Ajoute les mouvements dans le bon ordre en fonction des positions.
        if (curr.y === 0 && dest.x === 0) {
            seq.push(...vert, ...horiz);
        } else if (curr.x === 0 && dest.y === 0) {
            seq.push(...horiz, ...vert);
        } else if (dx < 0) {
            seq.push(...horiz, ...vert);
        } else {
            seq.push(...vert, ...horiz);
        }

        curr = dest; // Met à jour la position actuelle.
        seq.push('A'); // Ajoute un arrêt ou une pause.
    }

    return seq;
}

/**
 * Compte les séquences possibles en utilisant un nombre donné de robots.
 * @param {string[]} input - Séquence de mouvements.
 * @param {number} maxRobots - Nombre maximal de robots disponibles.
 * @param {number} robot - Robot actuel utilisé.
 * @param {object} cache - Cache pour éviter des recalculs.
 * @param {object} dirMap - Mappage des directions sur le pavé directionnel.
 * @returns {number} - Nombre de séquences possibles.
 */
function countSequences(input, maxRobots, robot, cache, dirMap) {
    const key = input.join(''); // Crée une clé unique pour la séquence.
    if (cache[key] && robot <= cache[key].length && cache[key][robot - 1] !== 0) {
        return cache[key][robot - 1]; // Retourne le résultat mis en cache si disponible.
    }

    if (!cache[key]) {
        cache[key] = Array(maxRobots).fill(0); // Initialise le cache pour cette séquence.
    }

    const seq = getDirPadSequence(input, 'A', dirMap); // Génère la séquence sur le pavé directionnel.
    if (robot === maxRobots) {
        return seq.length; // Si le dernier robot est utilisé, retourne la longueur de la séquence.
    }

    const steps = splitSequence(seq); // Divise la séquence en sous-séquences.
    let count = 0;

    for (let step of steps) {
        count += countSequences(step, maxRobots, robot + 1, cache, dirMap); // Appel récursif pour les sous-séquences.
    }

    cache[key][robot - 1] = count; // Stocke le résultat dans le cache.
    return count;
}

/**
 * Génère une séquence de mouvements sur le pavé directionnel.
 * @param {string[]} input - Séquence de mouvements.
 * @param {string} start - Position de départ.
 * @param {object} dirMap - Mappage des directions sur le pavé directionnel.
 * @returns {string[]} - Séquence de mouvements directionnels.
 */
function getDirPadSequence(input, start, dirMap) {
    let curr = dirMap[start]; // Position actuelle.
    const seq = []; // Initialisation de la séquence des mouvements.

    for (let char of input) {
        const dest = dirMap[char]; // Position de destination.
        const dx = dest.x - curr.x; // Différence horizontale (x).
        const dy = dest.y - curr.y; // Différence verticale (y).

        const horiz = []; // Mouvement horizontal.
        const vert = []; // Mouvement vertical.

        // Génère les mouvements horizontaux.
        for (let i = 0; i < Math.abs(dx); i++) {
            horiz.push(dx >= 0 ? '>' : '<');
        }

        // Génère les mouvements verticaux.
        for (let i = 0; i < Math.abs(dy); i++) {
            vert.push(dy >= 0 ? '^' : 'v');
        }

        // Ajoute les mouvements dans le bon ordre.
        if (curr.x === 0 && dest.y === 1) {
            seq.push(...horiz, ...vert);
        } else if (curr.y === 1 && dest.x === 0) {
            seq.push(...vert, ...horiz);
        } else if (dx < 0) {
            seq.push(...horiz, ...vert);
        } else {
            seq.push(...vert, ...horiz);
        }

        curr = dest; // Met à jour la position actuelle.
        seq.push('A'); // Ajoute un arrêt ou une pause.
    }

    return seq;
}

/**
 * Divise une séquence complète en sous-séquences basées sur le caractère "A".
 * @param {string[]} input - Séquence complète.
 * @returns {string[][]} - Tableau de sous-séquences.
 */
function splitSequence(input) {
    const result = [];
    let current = [];

    for (let char of input) {
        current.push(char); // Ajoute le caractère à la sous-séquence en cours.
        if (char === 'A') {
            result.push(current); // Ajoute la sous-séquence terminée au résultat.
            current = []; // Réinitialise pour la prochaine sous-séquence.
        }
    }

    return result;
}

// Utilisation
const input = parseInput('./input.txt'); // Lit les données du fichier.
console.log("Part 1:", day21(input, 1)); // Résout la partie 1.
console.log("Part 2:", day21(input, 2)); // Résout la partie 2.
