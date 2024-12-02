const fs = require('fs');

// Fonction pour vérifier si un rapport est "bon" (respecte les deux conditions)
function isGood(levels) {
    // Vérifie si les niveaux sont soit strictement croissants, soit strictement décroissants
    const isIncreasing = levels.every((_, i) => i === 0 || levels[i] > levels[i - 1]);
    const isDecreasing = levels.every((_, i) => i === 0 || levels[i] < levels[i - 1]);

    // Vérifie si les différences entre niveaux sont entre 1 et 3
    const isValidDifference = levels.every((_, i) =>
        i === 0 || (Math.abs(levels[i] - levels[i - 1]) >= 1 && Math.abs(levels[i] - levels[i - 1]) <= 3)
    );

    return (isIncreasing || isDecreasing) && isValidDifference;
}

// Fonction pour vérifier si un rapport peut être "bon" en supprimant un seul niveau
function isGoodWithDampener(levels) {
    // Test direct : le rapport est bon tel quel
    if (isGood(levels)) return true;

    // Test en supprimant chaque niveau un par un
    for (let i = 0; i < levels.length; i++) {
        const reducedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isGood(reducedLevels)) {
            return true;
        }
    }
    return false;
}

// Lecture des données depuis le fichier input.txt ou un fichier spécifié en argument
const inputFile = process.argv[2] || 'input.txt';
const data = fs.readFileSync(inputFile, 'utf-8').trim();
const reports = data.split('\n').map(line => line.split(' ').map(Number));

// Initialisation des compteurs pour les deux parties
let safeReportsPart1 = 0;
let safeReportsPart2 = 0;

// Analyse des rapports
for (const levels of reports) {
    if (isGood(levels)) safeReportsPart1++; // Partie 1 : rapport sûr sans modification
    if (isGoodWithDampener(levels)) safeReportsPart2++; // Partie 2 : rapport sûr avec le "Dampener"
}

// Affichage des résultats
console.log('Partie 1:', safeReportsPart1);
console.log('Partie 2:', safeReportsPart2);
