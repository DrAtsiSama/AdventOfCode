const fs = require('fs');
const readline = require('readline');

// Fonctions utilitaires
const DIRS = {
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1]
};

// Charger les données
const inputFile = process.argv[2] || 'input.txt';
const input = fs.readFileSync(inputFile, 'utf-8').trim();
const [map, instrs] = input.split('\n\n');

// Résoudre le problème
function solve(map, part2) {
    let grid = map.split('\n').map(row => row.split(''));
    const R = grid.length;
    const C = grid[0].length;

    if (part2) {
        // Étendre la grille pour la deuxième partie
        const bigGrid = [];
        for (let r = 0; r < R; r++) {
            const newRow = [];
            for (let c = 0; c < C; c++) {
                const cell = grid[r][c];
                if (cell === '#') {
                    newRow.push('#', '#');
                } else if (cell === 'O') {
                    newRow.push('[', ']');
                } else if (cell === '.') {
                    newRow.push('.', '.');
                } else if (cell === '@') {
                    newRow.push('@', '.');
                }
            }
            bigGrid.push(newRow);
        }
        grid = bigGrid;
    }

    // Trouver la position initiale du robot
    let sr, sc;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '@') {
                sr = r;
                sc = c;
                grid[r][c] = '.';
            }
        }
    }

    // Parcourir les instructions
    let r = sr, c = sc;
    for (const inst of instrs) {
        if (inst === '\n') continue;
        const [dr, dc] = DIRS[inst];
        const rr = r + dr, cc = c + dc;

        if (grid[rr][cc] === '#') {
            continue;
        } else if (grid[rr][cc] === '.') {
            r = rr;
            c = cc;
        } else if (['[', ']', 'O'].includes(grid[rr][cc])) {
            const queue = [[r, c]];
            const seen = new Set();
            let ok = true;

            while (queue.length > 0) {
                const [curR, curC] = queue.shift();
                const key = `${curR},${curC}`;
                if (seen.has(key)) continue;
                seen.add(key);

                const nextR = curR + dr;
                const nextC = curC + dc;

                if (grid[nextR][nextC] === '#') {
                    ok = false;
                    break;
                }

                if (grid[nextR][nextC] === 'O') {
                    queue.push([nextR, nextC]);
                }
                if (grid[nextR][nextC] === '[') {
                    queue.push([nextR, nextC]);
                    if (grid[nextR][nextC + 1] !== ']') throw new Error('Malformed grid!');
                    queue.push([nextR, nextC + 1]);
                }
                if (grid[nextR][nextC] === ']') {
                    queue.push([nextR, nextC]);
                    if (grid[nextR][nextC - 1] !== '[') throw new Error('Malformed grid!');
                    queue.push([nextR, nextC - 1]);
                }
            }

            if (!ok) continue;

            while (seen.size > 0) {
                for (const [curR, curC] of Array.from(seen).map(coord => coord.split(',').map(Number))) {
                    const nextR = curR + dr;
                    const nextC = curC + dc;
                    const nextKey = `${nextR},${nextC}`;

                    if (!seen.has(nextKey)) {
                        if (grid[nextR][nextC] !== '.') throw new Error('Invalid move!');
                        grid[nextR][nextC] = grid[curR][curC];
                        grid[curR][curC] = '.';
                        seen.delete(`${curR},${curC}`);
                    }
                }
            }
            r = r + dr;
            c = c + dc;
        }
    }

    // Calculer la somme des coordonnées GPS
    let ans = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (['[', 'O'].includes(grid[r][c])) {
                ans += 100 * r + c;
            }
        }
    }
    return ans;
}

// Résultats
console.log(solve(map, false));
console.log(solve(map, true));
