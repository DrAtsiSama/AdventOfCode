const fs = require('fs');
const path = require('path');

// Dimensions de la grille
const X = 101; // Largeur
const Y = 103; // Hauteur

// Directions (haut, droite, bas, gauche)
const DIRS = [
    [-1, 0], // haut
    [0, 1],  // droite
    [1, 0],  // bas
    [0, -1], // gauche
];

// Lecture du fichier input.txt
const infile = process.argv[2] || 'input.txt';
const input = fs.readFileSync(path.resolve(__dirname, infile), 'utf-8').trim();

// Parsing de l'input
let robots = input.split('\n').map(line => {
    const [px, py, vx, vy] = line.match(/-?\d+/g).map(Number);
    return { px, py, vx, vy };
});

// Partie 1 : Calcul du Safety Factor après 100 secondes
let q1 = 0, q2 = 0, q3 = 0, q4 = 0;

for (let t = 1; t < 10 ** 6; t++) {
    // Grille initialisée avec des '.'
    const G = Array.from({ length: Y }, () => Array(X).fill('.'));

    // Coordonnées des robots
    robots = robots.map(({ px, py, vx, vy }) => {
        px = (px + vx) % X;
        py = (py + vy) % Y;

        if (px < 0) px += X;
        if (py < 0) py += Y;

        // Marquer la position du robot sur la grille
        G[py][px] = '#';
        return { px, py, vx, vy };
    });

    // Partie 1 : Calcul après 100 secondes
    if (t === 100) {
        q1 = q2 = q3 = q4 = 0;
        const mx = Math.floor(X / 2);
        const my = Math.floor(Y / 2);

        robots.forEach(({ px, py }) => {
            if (px < mx && py < my) q1++;
            if (px >= mx && py < my) q2++;
            if (px < mx && py >= my) q3++;
            if (px >= mx && py >= my) q4++;
        });

        // Afficher le Safety Factor
        console.log(`Safety Factor: ${q1 * q2 * q3 * q4}`);
    }

    // Partie 2 : Détection de compacité (nombre de composants connectés)
    let components = 0;
    const SEEN = new Set();

    const bfs = (sx, sy) => {
        const queue = [[sx, sy]];
        while (queue.length > 0) {
            const [x, y] = queue.shift();
            const key = `${x},${y}`;
            if (SEEN.has(key)) continue;
            SEEN.add(key);

            DIRS.forEach(([dx, dy]) => {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < X && ny >= 0 && ny < Y && G[ny][nx] === '#' && !SEEN.has(`${nx},${ny}`)) {
                    queue.push([nx, ny]);
                }
            });
        }
    };

    for (let y = 0; y < Y; y++) {
        for (let x = 0; x < X; x++) {
            if (G[y][x] === '#' && !SEEN.has(`${x},${y}`)) {
                components++;
                bfs(x, y);
            }
        }
    }

    // Détection de compacité
    if (components <= 200) {
        console.log(`Easter Egg found at time: ${t}`);
        G.forEach(row => console.log(row.join('')));
        break;
    }
}
