const fs = require('fs');
const PriorityQueue = require('js-priority-queue');

// Directions pour les mouvements (haut, droite, bas, gauche)
const DIRS = [
  [-1, 0], // haut
  [0, 1],  // droite
  [1, 0],  // bas
  [0, -1]  // gauche
];

// Fonction pour lire et analyser le fichier d'entrée
function parseInput(filename) {
  const grid = fs.readFileSync(filename, 'utf8').trim().split('\n').map(line => line.split(''));
  let start = null, end = null;

  // Trouver les positions de départ (S) et d'arrivée (E)
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 'S') start = [r, c];
      if (grid[r][c] === 'E') end = [r, c];
    }
  }

  return { grid, start, end };
}

// Algorithme de Dijkstra pour trouver le coût minimal jusqu'à l'objectif
function dijkstra(grid, start, end) {
  const [sr, sc] = start; // Départ (start row, start column)
  const [er, ec] = end;   // Fin (end row, end column)
  const R = grid.length;  // Nombre de lignes
  const C = grid[0].length; // Nombre de colonnes

  const dist = new Map(); // Distance minimale atteinte pour chaque état (clé: "r,c,dir")
  const pq = new PriorityQueue({ comparator: (a, b) => a[0] - b[0] }); // File de priorité
  pq.queue([0, sr, sc, 1]); // [coût, ligne, colonne, direction initiale]

  let bestScore = null;

  while (pq.length > 0) {
    const [cost, r, c, dir] = pq.dequeue(); // Extraire l'état avec le coût le plus faible
    const key = `${r},${c},${dir}`; // Clé unique pour l'état actuel

    // Si déjà visité, on passe
    if (dist.has(key)) continue;

    // Marquer comme visité avec le coût actuel
    dist.set(key, cost);

    // Si on atteint l'objectif pour la première fois, enregistrer le score
    if (r === er && c === ec && bestScore === null) {
      bestScore = cost;
    }

    // Mouvement dans la direction actuelle
    const [dr, dc] = DIRS[dir];
    const rr = r + dr;
    const cc = c + dc;
    if (rr >= 0 && rr < R && cc >= 0 && cc < C && grid[rr][cc] !== '#') {
      pq.queue([cost + 1, rr, cc, dir]); // Avancer dans la même direction
    }

    // Rotation de direction (90° horaire ou anti-horaire)
    pq.queue([cost + 1000, r, c, (dir + 1) % 4]); // Rotation horaire
    pq.queue([cost + 1000, r, c, (dir + 3) % 4]); // Rotation anti-horaire
  }

  return { dist, bestScore };
}

// Fonction pour trouver le nombre de tuiles appartenant à un chemin optimal
function findBestTiles(grid, start, end, dist, bestScore) {
  const [er, ec] = end; // Position de fin
  const R = grid.length;
  const C = grid[0].length;

  const revDist = new Map(); // Distances pour le chemin inverse
  const pq = new PriorityQueue({ comparator: (a, b) => a[0] - b[0] });
  pq.queue([0, er, ec, 0]); // Démarrer à la fin pour le chemin inverse

  // Calculer les distances inverses
  while (pq.length > 0) {
    const [cost, r, c, dir] = pq.dequeue();
    const key = `${r},${c},${dir}`;
    if (revDist.has(key)) continue; // Si déjà visité, on passe

    revDist.set(key, cost);

    // Mouvement en sens inverse
    const [dr, dc] = DIRS[(dir + 2) % 4]; // Direction opposée
    const rr = r + dr;
    const cc = c + dc;
    if (rr >= 0 && rr < R && cc >= 0 && cc < C && grid[rr][cc] !== '#') {
      pq.queue([cost + 1, rr, cc, dir]);
    }

    // Rotation 90° (horaire et anti-horaire)
    pq.queue([cost + 1000, r, c, (dir + 1) % 4]);
    pq.queue([cost + 1000, r, c, (dir + 3) % 4]);
  }

  // Identifier les tuiles appartenant au chemin optimal
  const bestTiles = new Set();
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      for (let dir = 0; dir < 4; dir++) {
        const key = `${r},${c},${dir}`;
        if (dist.has(key) && revDist.has(key)) {
          const forward = dist.get(key); // Coût dans le sens avant
          const backward = revDist.get(key); // Coût dans le sens inverse
          if (forward + backward === bestScore) {
            bestTiles.add(`${r},${c}`); // Ajouter les coordonnées uniques
          }
        }
      }
    }
  }

  return bestTiles.size;
}

// Fonction principale
function main(filename) {
  // Lire et analyser l'entrée
  const { grid, start, end } = parseInput(filename);

  // Calculer le coût minimal avec Dijkstra
  const { dist, bestScore } = dijkstra(grid, start, end);
  console.log("Part 1 (Meilleur score):", bestScore);

  // Trouver le nombre de tuiles optimales
  const bestTileCount = findBestTiles(grid, start, end, dist, bestScore);
  console.log("Part 2 (Nombre de tuiles optimales):", bestTileCount);
}

// Exécuter le programme avec le fichier d'entrée
main('input.txt');
