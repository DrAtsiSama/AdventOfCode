const fs = require('fs');

// Lire le fichier d'entrée
const input = fs.readFileSync('input.txt', 'utf-8');

// Fonction pour résoudre la Partie 1
function solvePart1(input) {
    const regexMul = /mul\((\d+),(\d+)\)/g;
    let match;
    let sum = 0;

    while ((match = regexMul.exec(input)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
    }

    return sum;
}

// Fonction pour résoudre la Partie 2
function solvePart2(input) {
    const regexMul = /mul\((\d+),(\d+)\)/g;
    const regexDo = /do\(\)/g;
    const regexDont = /don't\(\)/g;

    let enabled = true; // Par défaut, les instructions `mul` sont activées
    let sum = 0;

    // Diviser l'entrée en tokens pour traiter dans l'ordre
    const tokens = input.split(/(?=mul\(|do\(\)|don't\(\))/g);

    for (const token of tokens) {
        if (regexDo.test(token)) {
            enabled = true; // Activer les `mul`
        } else if (regexDont.test(token)) {
            enabled = false; // Désactiver les `mul`
        } else {
            let match;
            while ((match = regexMul.exec(token)) !== null) {
                if (enabled) {
                    const x = parseInt(match[1], 10);
                    const y = parseInt(match[2], 10);
                    sum += x * y;
                }
            }
        }
    }

    return sum;
}

// Résoudre les deux parties
const part1Result = solvePart1(input);
const part2Result = solvePart2(input);

console.log('Résultat Partie 1 :', part1Result);
console.log('Résultat Partie 2 :', part2Result);
