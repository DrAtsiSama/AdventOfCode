const fs = require('fs');

// Lecture du fichier d'entrée
const inputFile = 'input.txt';
const input = fs.readFileSync(inputFile, 'utf-8');

// Sépare les règles et les mises à jour
const [rulesInput, updatesInput] = input.split('\n\n');

// Fonction pour parser les règles
const parseRules = (input) => {
    return input.trim().split("\n").map(rule => {
        const [before, after] = rule.split('|').map(Number); // Extraction des pages avant et après
        return { before, after }; // Retourne un objet représentant une règle
    });
};

// Fonction pour parser les mises à jour
const parseUpdates = (input) => {
    return input.trim().split("\n").map(update => 
        update.split(',').map(Number) // Convertit les numéros de page en tableau de nombres
    );
};

// Vérifie si une mise à jour est valide selon les règles
const isValidUpdate = (update, rules) => {
    // Map des indices des pages pour un accès rapide
    const indexMap = new Map();
    update.forEach((page, index) => indexMap.set(page, index));

    // Vérification de toutes les règles
    for (const { before, after } of rules) {
        // Si les deux pages sont présentes dans la mise à jour
        if (indexMap.has(before) && indexMap.has(after)) {
            // Vérifie si 'before' apparaît avant 'after'
            if (indexMap.get(before) > indexMap.get(after)) {
                return false;
            }
        }
    }
    return true; // Mise à jour valide si toutes les règles sont respectées
};

// Trie une mise à jour incorrecte selon les règles
const sortUpdate = (update, rules) => {
    // Filtre les règles pertinentes pour cette mise à jour
    const relevantRules = rules.filter(({ before, after }) =>
        update.includes(before) && update.includes(after)
    );

    // Construction d'un graphe orienté et initialisation des degrés d'entrée
    const graph = new Map();
    const inDegree = new Map();

    update.forEach(page => {
        graph.set(page, []); // Initialise les voisins
        inDegree.set(page, 0); // Initialise les degrés d'entrée
    });

    // Remplit le graphe et les degrés d'entrée
    relevantRules.forEach(({ before, after }) => {
        graph.get(before).push(after);
        inDegree.set(after, inDegree.get(after) + 1);
    });

    // Algorithme de tri topologique
    const queue = [];
    inDegree.forEach((count, page) => {
        if (count === 0) queue.push(page); // Ajoute les pages sans dépendances
    });

    const sorted = [];
    while (queue.length) {
        const page = queue.shift(); // Traite la page sans dépendances
        sorted.push(page);
        for (const neighbor of graph.get(page)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) queue.push(neighbor); // Ajoute les voisins sans dépendances restantes
        }
    }

    // Retourne les pages triées en respectant les règles et présentes dans la mise à jour
    return sorted.filter(page => update.includes(page));
};

// Calcule la somme des pages centrales pour un ensemble de mises à jour
const calculateMiddleSum = (updates) => {
    return updates.reduce((sum, update) => {
        const middleIndex = Math.floor(update.length / 2); // Trouve l'indice central
        return sum + update[middleIndex]; // Ajoute la page centrale à la somme
    }, 0);
};

// Fonction principale pour résoudre les deux parties
const solve = (rulesInput, updatesInput) => {
    const rules = parseRules(rulesInput); // Parse les règles
    const updates = parseUpdates(updatesInput); // Parse les mises à jour

    const validUpdates = [];
    const invalidUpdates = [];

    // Sépare les mises à jour valides et invalides
    for (const update of updates) {
        if (isValidUpdate(update, rules)) {
            validUpdates.push(update);
        } else {
            invalidUpdates.push(update);
        }
    }

    // Partie 1 : somme des pages centrales des mises à jour valides
    const middleSumValid = calculateMiddleSum(validUpdates);

    // Partie 2 : somme des pages centrales des mises à jour corrigées
    const correctedUpdates = invalidUpdates.map(update => sortUpdate(update, rules));
    const middleSumCorrected = calculateMiddleSum(correctedUpdates);

    return { middleSumValid, middleSumCorrected }; // Retourne les résultats
};

// Appel de la fonction principale et affichage des résultats
const { middleSumValid, middleSumCorrected } = solve(rulesInput, updatesInput);
console.log("Partie 1 - Somme des pages centrales des mises à jour valides :", middleSumValid);
console.log("Partie 2 - Somme des pages centrales des mises à jour corrigées :", middleSumCorrected);
