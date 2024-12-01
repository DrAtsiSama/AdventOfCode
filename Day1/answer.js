const fs = require('fs');

// Fonction pour calculer le score de similarité
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

// Lire le fichier input.txt
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

    // Calculer et afficher le score de similarité
    const similarityScore = calculateSimilarityScore(leftList, rightList);
    console.log('Similarity Score:', similarityScore);
});
