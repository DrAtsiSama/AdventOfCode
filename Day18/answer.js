const fs = require('fs');

// Lire l'entrée depuis input.txt
const input = fs.readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.split(',').map(Number));

// Dimensions de la grille
const GRID_SIZE = 71;

// Directions possibles pour le déplacement (haut, droite, bas, gauche)
const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
];

// Fonction pour initialiser une grille vide
function initializeGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill('.'));
}

// BFS pour trouver le chemin le plus court
function findShortestPath(grid) {
    const queue = [[0, 0, 0]]; // [x, y, steps]
    const visited = new Set();
    visited.add(`0,0`);

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();

        // Si on atteint la sortie, retourner le nombre d'étapes
        if (x === GRID_SIZE - 1 && y === GRID_SIZE - 1) {
            return steps;
        }

        // Explorer les voisins
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 && nx < GRID_SIZE &&
                ny >= 0 && ny < GRID_SIZE &&
                grid[ny][nx] === '.' &&
                !visited.has(`${nx},${ny}`)
            ) {
                queue.push([nx, ny, steps + 1]);
                visited.add(`${nx},${ny}`);
            }
        }
    }

    return -1; // Aucun chemin n'existe
}

// Fonction pour vérifier si un chemin existe avec BFS
function pathExists(grid) {
    const queue = [[0, 0]];
    const visited = new Set();
    visited.add(`0,0`);

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        // Si on atteint la sortie, retourner vrai
        if (x === GRID_SIZE - 1 && y === GRID_SIZE - 1) {
            return true;
        }

        // Explorer les voisins
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 && nx < GRID_SIZE &&
                ny >= 0 && ny < GRID_SIZE &&
                grid[ny][nx] === '.' &&
                !visited.has(`${nx},${ny}`)
            ) {
                queue.push([nx, ny]);
                visited.add(`${nx},${ny}`);
            }
        }
    }

    return false; // Aucun chemin n'existe
}

// Partie 1 : Chemin le plus court après 1024 bytes
function partOne(input) {
    const grid = initializeGrid(GRID_SIZE);

    // Simuler les 1024 premiers bytes
    for (let i = 0; i < Math.min(1024, input.length); i++) {
        const [x, y] = input[i];
        grid[y][x] = '#';
    }

    // Trouver le chemin le plus court
    return findShortestPath(grid);
}

// Partie 2 : Trouver le premier byte qui bloque le chemin
function partTwo(input) {
    const grid = initializeGrid(GRID_SIZE);

    // Simuler les bytes un par un
    for (let i = 0; i < input.length; i++) {
        const [x, y] = input[i];
        grid[y][x] = '#'; // Corrompre la position

        // Vérifier si le chemin est bloqué
        if (!pathExists(grid)) {
            return `${x},${y}`; // Retourner les coordonnées du byte bloquant
        }
    }

    return null; // Aucun byte ne bloque le chemin
}

// Résoudre les deux parties
const resultPartOne = partOne(input);
const resultPartTwo = partTwo(input);

// Afficher les résultats
console.log(`p1=${resultPartOne}`); // Résultat de la Part One
console.log(`p2=${resultPartTwo}`); // Résultat de la Part Two