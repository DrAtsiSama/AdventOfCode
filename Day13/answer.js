const fs = require('fs');
const path = require('path');

// Classe pour représenter une machine à pince
class ClawMachine {
    constructor(buttonA, buttonB, prize) {
        this.buttonA = buttonA; // Coordonnées du déplacement lorsque le bouton A est pressé { x, y }
        this.buttonB = buttonB; // Coordonnées du déplacement lorsque le bouton B est pressé { x, y }
        this.prize = prize;     // Coordonnées de la position du prix { x, y }
    }
}

// Fonction pour résoudre une machine donnée
function solveClawMachine(clawMachine, offset = 0) {
    // Extraire les coordonnées des boutons et du prix
    const { buttonA, buttonB, prize } = clawMachine;

    // Ajouter l'offset (nécessaire pour Part 2) aux coordonnées du prix
    const prizeX = offset + prize.x;
    const prizeY = offset + prize.y;
    const buttonAX = buttonA.x;
    const buttonAY = buttonA.y;
    const buttonBX = buttonB.x;
    const buttonBY = buttonB.y;

    // Calculer le nombre de pressions sur le bouton B (b) en réorganisant les équations données
    const b = Math.round(
        (prizeY - (prizeX / buttonAX) * buttonAY) / 
        (buttonBY - (buttonBX / buttonAX) * buttonAY)
    );

    // Calculer le nombre de pressions sur le bouton A (a)
    const a = Math.round((prizeX - b * buttonBX) / buttonAX);

    // Vérifier si ces valeurs de `a` et `b` permettent d'atteindre les coordonnées exactes du prix
    const actualX = a * buttonAX + b * buttonBX; // X atteint
    const actualY = a * buttonAY + b * buttonBY; // Y atteint

    // Valider si le prix est atteint avec des valeurs valides pour a et b (a >= 0, b >= 0)
    if (actualX === prizeX && actualY === prizeY && a >= 0 && b >= 0) {
        return a * 3 + b; // Coût total : 3 tokens pour chaque pression de A, 1 token pour chaque pression de B
    }

    return -1; // Si le prix n'est pas atteignable, retourner -1
}

// Fonction pour parser les données d'entrée
function parseClawMachine(lines) {
    const buttonALine = lines[0]; // Ligne contenant les coordonnées du bouton A
    const buttonBLine = lines[1]; // Ligne contenant les coordonnées du bouton B
    const prizeLine = lines[2];   // Ligne contenant les coordonnées du prix

    // Extraire les coordonnées du bouton A
    const buttonAParts = buttonALine.split(':')[1].split(',');
    const buttonAX = parseInt(buttonAParts[0].trim().substring(2), 10);
    const buttonAY = parseInt(buttonAParts[1].trim().substring(2), 10);

    // Extraire les coordonnées du bouton B
    const buttonBParts = buttonBLine.split(':')[1].split(',');
    const buttonBX = parseInt(buttonBParts[0].trim().substring(2), 10);
    const buttonBY = parseInt(buttonBParts[1].trim().substring(2), 10);

    // Extraire les coordonnées du prix
    const prizeParts = prizeLine.split(':')[1].split(',');
    const prizeX = parseInt(prizeParts[0].trim().substring(2), 10);
    const prizeY = parseInt(prizeParts[1].trim().substring(2), 10);

    // Retourner un objet ClawMachine avec les données extraites
    return new ClawMachine(
        { x: buttonAX, y: buttonAY },
        { x: buttonBX, y: buttonBY },
        { x: prizeX, y: prizeY }
    );
}

// Fonction principale pour résoudre le problème
function solve(inputPath) {
    // Lire les données du fichier d'entrée
    const data = fs.readFileSync(path.resolve(__dirname, inputPath), 'utf8').trim();
    const lines = data.split('\n').filter(line => line.trim().length > 0); // Supprimer les lignes vides

    let part1 = 0; // Résultat de la partie 1
    let part2 = 0; // Résultat de la partie 2

    // Parcourir les données d'entrée par blocs de 3 lignes (1 machine à pince par bloc)
    for (let i = 0; i < lines.length; i += 3) {
        const clawMachine = parseClawMachine(lines.slice(i, i + 3)); // Créer une instance de ClawMachine
        const cost1 = solveClawMachine(clawMachine); // Calculer le coût pour la partie 1 (sans offset)
        const cost2 = solveClawMachine(clawMachine, 10000000000000); // Calculer le coût pour la partie 2 (avec offset)

        if (cost1 > 0) part1 += cost1; // Ajouter le coût valide à la partie 1
        if (cost2 > 0) part2 += cost2; // Ajouter le coût valide à la partie 2
    }

    return { part1, part2 }; // Retourner les résultats des deux parties
}

// Chemin du fichier d'entrée
const inputPath = process.argv[2] || 'input.txt'; // Lire le chemin depuis les arguments de la commande, ou utiliser un fichier par défaut
const { part1, part2 } = solve(inputPath); // Résoudre le problème
console.log(`Part 1: ${part1}`); // Afficher le résultat de la partie 1
console.log(`Part 2: ${part2}`); // Afficher le résultat de la partie 2
