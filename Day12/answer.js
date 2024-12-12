const fs = require('fs');

// Directions: up, right, down, left
const DIRS = [
    [-1, 0], [0, 1], [1, 0], [0, -1]
];

// Read input file
const inputFile = process.argv[2] || 'input.txt';
const input = fs.readFileSync(inputFile, 'utf8').trim();

const G = input.split('\n'); // Grid as an array of strings
const R = G.length; // Number of rows
const C = G[0].length; // Number of columns

let p1 = 0;
let p2 = 0;
const SEEN = new Set(); // Track visited cells

// Helper to encode coordinates as a string for the Set
const encode = (r, c) => `${r},${c}`;

// BFS to process a connected component
for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
        if (SEEN.has(encode(r, c))) continue;

        const queue = [[r, c]];
        let area = 0; // Component area
        let perim = 0; // Component perimeter
        const PERIM = {}; // Perimeter tracking for each direction

        while (queue.length > 0) {
            const [r2, c2] = queue.shift();

            if (SEEN.has(encode(r2, c2))) continue;
            SEEN.add(encode(r2, c2));
            area++;

            for (const [dr, dc] of DIRS) {
                const rr = r2 + dr;
                const cc = c2 + dc;

                // If within bounds and same type, enqueue neighbor
                if (rr >= 0 && rr < R && cc >= 0 && cc < C && G[rr][cc] === G[r2][c2]) {
                    queue.push([rr, cc]);
                } else {
                    perim++; // Increase perimeter
                    const dirKey = `${dr},${dc}`;
                    if (!PERIM[dirKey]) PERIM[dirKey] = new Set();
                    PERIM[dirKey].add(encode(r2, c2));
                }
            }
        }

        // Calculate sides
        let sides = 0;
        for (const [dirKey, cells] of Object.entries(PERIM)) {
            const SEEN_PERIM = new Set();
            let oldSides = sides;

            for (const cell of cells) {
                if (SEEN_PERIM.has(cell)) continue;

                sides++;
                const queue = [cell];
                while (queue.length > 0) {
                    const current = queue.shift();
                    if (SEEN_PERIM.has(current)) continue;

                    SEEN_PERIM.add(current);
                    const [r3, c3] = current.split(',').map(Number);

                    for (const [dr, dc] of DIRS) {
                        const rr = r3 + dr;
                        const cc = c3 + dc;
                        const neighborKey = encode(rr, cc);

                        if (cells.has(neighborKey)) {
                            queue.push(neighborKey);
                        }
                    }
                }
            }
        }

        p1 += area * perim;
        p2 += area * sides;
    }
}

console.log(p1);
console.log(p2);
