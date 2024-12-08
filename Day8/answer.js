const fs = require('fs');

// Fonction pour afficher et copier le résultat (facultatif, basé sur votre utilisation de pyperclip)
const copyToClipboard = (text) => {
    console.log(text);
};

// Lecture et parsing de l'entrée
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const rows = input.length;
const cols = input[0].length;

// Regrouper les positions des antennes par fréquence
const positions = {};
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const char = input[r][c];
        if (char !== '.') {
            if (!positions[char]) {
                positions[char] = [];
            }
            positions[char].push([r, c]);
        }
    }
}

// Sets pour stocker les antinodes uniques
const antinodesPart1 = new Set();
const antinodesPart2 = new Set();

// Vérifier chaque position de la grille pour les antinodes
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        for (const [freq, antennaPositions] of Object.entries(positions)) {
            for (const [r1, c1] of antennaPositions) {
                for (const [r2, c2] of antennaPositions) {
                    if (r1 === r2 && c1 === c2) continue; // Ignorer si c'est la même antenne

                    const d1 = Math.abs(r - r1) + Math.abs(c - c1);
                    const d2 = Math.abs(r - r2) + Math.abs(c - c2);

                    const dr1 = r - r1, dr2 = r - r2;
                    const dc1 = c - c1, dc2 = c - c2;

                    // Vérifier si les points sont alignés (même pente) : dr1/dc1 == dr2/dc2
                    if (dr1 * dc2 === dr2 * dc1) {
                        // Partie 1 : Vérifier la condition de distance (d1 == 2*d2 ou d2 == 2*d1)
                        if ((d1 === 2 * d2 || d2 === 2 * d1) && r >= 0 && r < rows && c >= 0 && c < cols) {
                            antinodesPart1.add(`${r},${c}`);
                        }

                        // Partie 2 : Ajouter les antinodes alignés sans condition de distance
                        if (r >= 0 && r < rows && c >= 0 && c < cols) {
                            antinodesPart2.add(`${r},${c}`);
                        }
                    }
                }
            }
        }
    }
}

// Résultats des deux parties
const part1 = antinodesPart1.size;
const part2 = antinodesPart2.size;

// Afficher les résultats
copyToClipboard(part1);
copyToClipboard(part2);
