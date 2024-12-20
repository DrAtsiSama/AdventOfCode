const fs = require('fs');
const path = require('path');

/**
 * Classe pour représenter une position sur la grille.
 */
class Pos {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    // Retourne une nouvelle position après addition avec une autre position.
    add(other) {
        return new Pos(this.i + other.i, this.j + other.j);
    }

    // Vérifie l'égalité entre deux positions.
    equals(other) {
        return this.i === other.i && this.j === other.j;
    }

    // Génère une clé unique pour cette position.
    hash() {
        return `${this.i},${this.j}`;
    }

    // Retourne les voisins (haut, bas, gauche, droite).
    getNeighbors() {
        return [
            new Pos(this.i + 1, this.j),
            new Pos(this.i - 1, this.j),
            new Pos(this.i, this.j + 1),
            new Pos(this.i, this.j - 1),
        ];
    }
}

/**
 * Classe pour représenter une grille et ses opérations.
 */
class Grid {
    constructor(grid) {
        this.grid = grid;
        this.height = grid.length;
        this.width = grid[0].length;
    }

    // Retourne le contenu de la grille à une position donnée.
    get(pos) {
        if (this.isInBounds(pos)) {
            return this.grid[pos.i][pos.j];
        }
        return null;
    }

    // Vérifie si une position est dans les limites de la grille.
    isInBounds(pos) {
        return pos.i >= 0 && pos.i < this.height && pos.j >= 0 && pos.j < this.width;
    }

    /**
     * Implémente BFS (parcours en largeur) pour calculer les distances
     * depuis une position de départ vers toutes les positions atteignables.
     */
    bfs(start) {
        const queue = [start];
        const distances = new Map();
        distances.set(start.hash(), 0);

        while (queue.length > 0) {
            const current = queue.shift();
            const currentDistance = distances.get(current.hash());

            for (const neighbor of current.getNeighbors()) {
                if (this.get(neighbor) === '#' || distances.has(neighbor.hash())) {
                    continue; // Ignore les murs et les positions déjà visitées.
                }
                distances.set(neighbor.hash(), currentDistance + 1);
                queue.push(neighbor);
            }
        }

        return distances;
    }
}

// Lecture de l'input
const infile = process.argv.length >= 3 ? process.argv[2] : 'input.txt';
const data = fs.readFileSync(path.resolve(__dirname, infile), 'utf-8').trim().split('\n');

// Analyse de la grille et détection des points de départ et d'arrivée.
let start, end;
const gridData = data.map((line, i) => {
    const row = line.split('');
    const startIndex = row.indexOf('S');
    const endIndex = row.indexOf('E');
    if (startIndex !== -1) {
        start = new Pos(i, startIndex);
        row[startIndex] = '.'; // Remplace 'S' par une cellule vide.
    }
    if (endIndex !== -1) {
        end = new Pos(i, endIndex);
        row[endIndex] = '.'; // Remplace 'E' par une cellule vide.
    }
    return row;
});

const grid = new Grid(gridData);

// Calcul des distances depuis le point de départ et le point d'arrivée.
const fromStart = grid.bfs(start);
const fromEnd = grid.bfs(end);
const shortestPath = fromStart.get(end.hash());

/**
 * Fonction pour calculer le nombre de "cheats" valables.
 * @param {number} maxCheatLength Longueur maximale d'un cheat.
 * @param {number} threshold Seuil de gain minimal pour qu'un cheat soit valide.
 * @returns {number} Nombre de cheats valables.
 */
function getNumGoodCheats(maxCheatLength, threshold) {
    let goodCheats = 0;

    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {
            const cheatStart = new Pos(i, j);
            if (grid.get(cheatStart) === '#') continue; // Ignore les murs.

            // Vérifie toutes les positions atteignables en cheatant.
            for (let ik = -maxCheatLength; ik <= maxCheatLength; ik++) {
                const maxJk = maxCheatLength - Math.abs(ik);
                for (let jk = -maxJk; jk <= maxJk; jk++) {
                    const cheatEnd = cheatStart.add(new Pos(ik, jk));

                    // Vérifie que la position finale est dans les limites et accessible.
                    if (grid.isInBounds(cheatEnd) && grid.get(cheatEnd) === '.') {
                        const startToCheat = fromStart.get(cheatStart.hash());
                        const cheatToEnd = fromEnd.get(cheatEnd.hash());

                        // Si la distance totale avec le cheat est inférieure au chemin direct, on valide.
                        if (
                            startToCheat !== undefined &&
                            cheatToEnd !== undefined &&
                            shortestPath - (startToCheat + Math.abs(ik) + Math.abs(jk) + cheatToEnd) >= threshold
                        ) {
                            goodCheats++;
                        }
                    }
                }
            }
        }
    }

    return goodCheats;
}

// Partie 1 : Cheats valables avec une longueur maximale de 2.
const part1 = getNumGoodCheats(2, 100);
console.log("Partie 1 :", part1);

// Partie 2 : Cheats valables avec une longueur maximale de 20.
const part2 = getNumGoodCheats(20, 100);
console.log("Partie 2 :", part2);
