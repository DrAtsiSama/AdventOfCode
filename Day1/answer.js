const fs = require('fs');

// Fonction pour calculer la distance totale (Partie 1)
function calculateTotalDistance(left, right) {
    // Trier les deux listes pour minimiser les distances
    const sortedLeft = [...left].sort((a, b) => a - b);
    const sortedRight = [...right].sort((a, b) => a - b);

    // Calculer la distance absolue pour chaque paire
    let totalDistance = 0;
    for (let i = 0; i < sortedLeft.length; i++) {
        totalDistance += Math.abs(sortedLeft[i] - sortedRight[i]);
    }

    return totalDistance;
}

// Fonction pour calculer le score de similarité (Partie 2)
function calculateSimilarityScore(left, right) {
    // Créer un dictionnaire pour compter les occurrences dans la liste de droite
    const rightCount = {};
    for (const num of right) {
        rightCount[num] = (rightCount[num] || 0) + 1;
    }

    // Calculer le score de similarité
    let similarityScore = 0;
    for (const num of left) {
        if (rightCount[num]) {
            similarityScore += num * rightCount[num];
        }
    }

    return similarityScore;
}

// Lecture des données depuis le fichier input.txt
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }

    // Parse les données du fichier
    const lines = data.trim().split('\n');
    const leftList = [];
    const rightList = [];

    for (const line of lines) {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    }

    // Calcul des résultats pour les deux parties
    const totalDistance = calculateTotalDistance(leftList, rightList); // Partie 1
    const similarityScore = calculateSimilarityScore(leftList, rightList); // Partie 2

    // Affichage des résultats
    console.log('Total Distance (Part 1):', totalDistance);
    console.log('Similarity Score (Part 2):', similarityScore);
});
