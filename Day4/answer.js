const fs = require('fs');

// Fonction principale
function solve(input) {
    const grid = input.trim().split('\n'); // Lire la grille et la diviser en lignes
    const R = grid.length; // Nombre de lignes
    const C = grid[0].length; // Nombre de colonnes
    let p1 = 0; // Compteur pour la partie 1
    let p2 = 0; // Compteur pour la partie 2

    // Vérifie toutes les occurrences de "XMAS" dans toutes les directions
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            // Partie 1 - "XMAS" dans toutes les directions
            if (c + 3 < C && grid[r][c] === 'X' && grid[r][c + 1] === 'M' && grid[r][c + 2] === 'A' && grid[r][c + 3] === 'S') p1++; // Horizontal
            if (r + 3 < R && grid[r][c] === 'X' && grid[r + 1][c] === 'M' && grid[r + 2][c] === 'A' && grid[r + 3][c] === 'S') p1++; // Vertical
            if (r + 3 < R && c + 3 < C && grid[r][c] === 'X' && grid[r + 1][c + 1] === 'M' && grid[r + 2][c + 2] === 'A' && grid[r + 3][c + 3] === 'S') p1++; // Diagonale descendante
            if (r - 3 >= 0 && c + 3 < C && grid[r][c] === 'X' && grid[r - 1][c + 1] === 'M' && grid[r - 2][c + 2] === 'A' && grid[r - 3][c + 3] === 'S') p1++; // Diagonale montante

            if (c + 3 < C && grid[r][c] === 'S' && grid[r][c + 1] === 'A' && grid[r][c + 2] === 'M' && grid[r][c + 3] === 'X') p1++; // Horizontal inversé
            if (r + 3 < R && grid[r][c] === 'S' && grid[r + 1][c] === 'A' && grid[r + 2][c] === 'M' && grid[r + 3][c] === 'X') p1++; // Vertical inversé
            if (r + 3 < R && c + 3 < C && grid[r][c] === 'S' && grid[r + 1][c + 1] === 'A' && grid[r + 2][c + 2] === 'M' && grid[r + 3][c + 3] === 'X') p1++; // Diagonale descendante inversée
            if (r - 3 >= 0 && c + 3 < C && grid[r][c] === 'S' && grid[r - 1][c + 1] === 'A' && grid[r - 2][c + 2] === 'M' && grid[r - 3][c + 3] === 'X') p1++; // Diagonale montante inversée

            // Partie 2 - Recherche de motifs X-MAS
            if (r + 2 < R && c + 2 < C && grid[r][c] === 'M' && grid[r + 1][c + 1] === 'A' && grid[r + 2][c + 2] === 'S' && grid[r + 2][c] === 'M' && grid[r][c + 2] === 'S') p2++; // X-MAS normal
            if (r + 2 < R && c + 2 < C && grid[r][c] === 'M' && grid[r + 1][c + 1] === 'A' && grid[r + 2][c + 2] === 'S' && grid[r + 2][c] === 'S' && grid[r][c + 2] === 'M') p2++; // X-MAS inversé
            if (r + 2 < R && c + 2 < C && grid[r][c] === 'S' && grid[r + 1][c + 1] === 'A' && grid[r + 2][c + 2] === 'M' && grid[r + 2][c] === 'M' && grid[r][c + 2] === 'S') p2++; // X-MAS inversé
            if (r + 2 < R && c + 2 < C && grid[r][c] === 'S' && grid[r + 1][c + 1] === 'A' && grid[r + 2][c + 2] === 'M' && grid[r + 2][c] === 'S' && grid[r][c + 2] === 'M') p2++; // X-MAS normal inversé
        }
    }

    // Résultats
    console.log("Partie 1 - Total XMAS :", p1);
    console.log("Partie 2 - Total X-MAS :", p2);
}

// Lecture du fichier input.txt
const inputFile = process.argv[2] || 'input.txt'; // Par défaut, lire 'input.txt' si aucun argument n'est donné
const input = fs.readFileSync(inputFile, 'utf8');
solve(input);
