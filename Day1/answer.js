const fs = require('fs');

// Fonction pour calculer la distance totale
function calculateTotalDistance(left, right) {
    // Trier les deux listes
    const sortedLeft = [...left].sort((a, b) => a - b);
    const sortedRight = [...right].sort((a, b) => a - b);

    // Calculer la distance totale
    let totalDistance = 0;
    for (let i = 0; i < sortedLeft.length; i++) {
        totalDistance += Math.abs(sortedLeft[i] - sortedRight[i]);
    }
    return totalDistance;
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

    // Calculer et afficher le résultat
    const totalDistance = calculateTotalDistance(leftList, rightList);
    console.log('Total Distance:', totalDistance);
});
