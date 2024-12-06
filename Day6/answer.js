const fs = require('fs');

// Lire l'entrée depuis le fichier input.txt
const input = fs.readFileSync('input.txt', 'utf8');

// Convertit l'entrée en une grille 2D
function parseInput(input) {
    return input.trim().split('\n').map(line => line.split(''));
}

// Trouve la position initiale du garde et la direction
function findGuardStart(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if ('^v<>'.includes(grid[i][j])) {
                return [i, j, '^v<>'.indexOf(grid[i][j])]; // [x, y, directionIndex]
            }
        }
    }
    throw new Error('Guard start position not found');
}

// Simule le déplacement du garde, retourne soit le nombre de positions distinctes visitées
// soit un indicateur si une boucle est détectée (si newObstacle est utilisé)
function simulateGuard(grid, newObstacle = null, startX, startY, startDirectionIndex) {
    const directions = [
        { dx: -1, dy: 0 }, // Up
        { dx: 0, dy: 1 },  // Right
        { dx: 1, dy: 0 },  // Down
        { dx: 0, dy: -1 }  // Left
    ];

    if (newObstacle) {
        const [obstacleX, obstacleY] = newObstacle;
        grid[obstacleX][obstacleY] = '#'; // Ajouter un obstacle temporaire
    }

    const visitedPositions = new Set();
    const visitedStates = new Set();
    let x = startX, y = startY, directionIndex = startDirectionIndex;

    const isInsideGrid = (x, y) => x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
    const serializeState = (x, y, directionIndex) => `${x},${y},${directionIndex}`;

    while (true) {
        const state = serializeState(x, y, directionIndex);

        if (visitedStates.has(state)) {
            // Si une boucle est détectée
            return true;
        }
        visitedStates.add(state);
        visitedPositions.add(`${x},${y}`);

        const { dx, dy } = directions[directionIndex];
        const nx = x + dx, ny = y + dy;

        if (!isInsideGrid(nx, ny)) {
            // Si le garde quitte la zone
            return visitedPositions.size; // Retourne le nombre de positions distinctes
        }

        if (grid[nx][ny] === '#') {
            // Tourner à droite si un obstacle est devant
            directionIndex = (directionIndex + 1) % 4;
        } else {
            // Avancer
            x = nx;
            y = ny;
        }
    }
}

// Trouve toutes les positions valides pour placer un obstacle créant une boucle
function findObstaclePositions(grid) {
    const [startX, startY, startDirectionIndex] = findGuardStart(grid);
    const validPositions = [];
    const originalGrid = grid.map(row => [...row]); // Clone de la grille d'origine

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '.' && !(i === startX && j === startY)) {
                // Tester cette position comme obstacle potentiel
                if (simulateGuard(
                    originalGrid.map(row => [...row]), 
                    [i, j], 
                    startX, 
                    startY, 
                    startDirectionIndex
                ) === true) {
                    validPositions.push([i, j]);
                }
            }
        }
    }

    return validPositions.length; // Retourne le nombre de positions valides
}

// Main : Calcul des réponses pour les deux parties
const grid = parseInput(input);
const [startX, startY, startDirectionIndex] = findGuardStart(grid);

// Partie 1 : Nombre de positions distinctes visitées avant de sortir
const part1 = simulateGuard(grid.map(row => [...row]), null, startX, startY, startDirectionIndex);

// Partie 2 : Nombre de positions valides pour créer une boucle
const part2 = findObstaclePositions(grid);

console.log(`Partie 1 : ${part1}`);
console.log(`Partie 2 : ${part2}`);
