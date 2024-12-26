const fs = require('fs');

// Lire l'input depuis un fichier texte
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(line => line.split('').map(Number));

const R = input.length;
const C = input[0].length;

// Fonction pour trouver combien de positions de hauteur 0 sont atteignables depuis une position donnée
function ways1(sr, sc) {
    const queue = [[sr, sc]];
    const seen = new Set();
    let count = 0;

    while (queue.length > 0) {
        const [r, c] = queue.shift();
        const key = `${r},${c}`;

        if (seen.has(key)) {
            continue;
        }

        seen.add(key);

        if (input[r][c] === 0) {
            count++;
        }

        // Vérifier les directions
        for (const [dr, dc] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
            const rr = r + dr;
            const cc = c + dc;
            if (rr >= 0 && rr < R && cc >= 0 && cc < C && input[rr][cc] === input[r][c] - 1) {
                queue.push([rr, cc]);
            }
        }
    }

    return count;
}

// Mémoïsation pour accélérer le calcul des chemins distincts
const dp = {};

// Fonction pour calculer le nombre de chemins distincts vers une hauteur de 0
function ways(r, c) {
    if (input[r][c] === 0) {
        return 1;
    }

    const key = `${r},${c}`;
    if (dp[key] !== undefined) {
        return dp[key];
    }

    let totalWays = 0;

    // Vérifier les directions
    for (const [dr, dc] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
        const rr = r + dr;
        const cc = c + dc;
        if (rr >= 0 && rr < R && cc >= 0 && cc < C && input[rr][cc] === input[r][c] - 1) {
            totalWays += ways(rr, cc);
        }
    }

    dp[key] = totalWays;
    return totalWays;
}

// Calculer les résultats pour p1 et p2
let p1 = 0;
let p2 = 0;

for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
        if (input[r][c] === 9) {
            p1 += ways1(r, c); // Nombre de positions de hauteur 0 atteignables
            p2 += ways(r, c);  // Nombre de chemins distincts
        }
    }
}

// Afficher les résultats
console.log(`p1: ${p1}`);
console.log(`p2: ${p2}`);
