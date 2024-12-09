const fs = require('fs');

// Lire le fichier d'entrée
const input = fs.readFileSync('input.txt', 'utf-8').trim();

function solve(part2) {
    const A = []; // Contiendra les informations sur les fichiers
    const SPACE = []; // Contiendra les espaces libres
    const FINAL = []; // Représentation finale
    let fileId = 0; // ID des fichiers
    let pos = 0; // Position actuelle

    // Construire la représentation initiale
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const size = parseInt(char, 10);

        if (i % 2 === 0) { // Si c'est un fichier
            if (part2) {
                A.push([pos, size, fileId]); // Stocker pour compaction
            }
            for (let j = 0; j < size; j++) {
                FINAL.push(fileId); // Ajouter l'ID du fichier
                if (!part2) {
                    A.push([pos, 1, fileId]); // Stocker chaque bloc
                }
                pos++;
            }
            fileId++;
        } else { // Si c'est un espace libre
            SPACE.push([pos, size]); // Stocker l'espace
            for (let j = 0; j < size; j++) {
                FINAL.push(null); // Ajouter des espaces libres
                pos++;
            }
        }
    }

    // Compactage des fichiers
    for (let k = A.length - 1; k >= 0; k--) {
        const [pos, size, fileId] = A[k];

        for (let spaceIndex = 0; spaceIndex < SPACE.length; spaceIndex++) {
            let [spacePos, spaceSize] = SPACE[spaceIndex];

            if (spacePos < pos && size <= spaceSize) {
                // Déplacer le fichier dans l'espace libre
                for (let i = 0; i < size; i++) {
                    if (FINAL[pos + i] !== fileId) {
                        throw new Error(`Unexpected file ID at FINAL[${pos + i}]: ${FINAL[pos + i]}`);
                    }
                    FINAL[pos + i] = null; // Supprimer du fichier actuel
                    FINAL[spacePos + i] = fileId; // Placer dans l'espace libre
                }

                // Mettre à jour l'espace
                SPACE[spaceIndex] = [spacePos + size, spaceSize - size];
                break;
            }
        }
    }

    // Calculer le checksum
    let ans = 0;
    for (let i = 0; i < FINAL.length; i++) {
        if (FINAL[i] !== null) {
            ans += i * FINAL[i];
        }
    }

    return ans;
}

// Résoudre pour part1 et part2
const p1 = solve(false);
const p2 = solve(true);

console.log('Part 1:', p1);
console.log('Part 2:', p2);
