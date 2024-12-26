const fs = require("fs");

// Lire l'entrée à partir du fichier `input.txt` et enlever les espaces superflus
const input = fs.readFileSync("input.txt", "utf-8").trim();

// Construire le graphe comme une liste d'adjacence
// Chaque connexion est représentée par une ligne du fichier, comme "a-b"
const edges = input.split("\n").map((line) => line.split("-")); // Divise chaque ligne en deux nœuds
const graph = {}; // Représentation du graphe

// Ajouter les connexions dans une liste d'adjacence
edges.forEach(([a, b]) => {
  // Si le nœud `a` ou `b` n'existe pas dans le graphe, l'initialiser
  if (!graph[a]) graph[a] = new Set();
  if (!graph[b]) graph[b] = new Set();
  // Ajouter chaque nœud dans la liste des voisins de l'autre
  graph[a].add(b);
  graph[b].add(a);
});

// Fonction pour trouver tous les triplets connectés (Partie 1)
function findTriplets(graph) {
  const triplets = []; // Liste pour stocker les triplets
  const nodes = Object.keys(graph); // Liste des nœuds du graphe

  // Parcourir toutes les combinaisons possibles de trois nœuds
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      for (let k = j + 1; k < nodes.length; k++) {
        const [a, b, c] = [nodes[i], nodes[j], nodes[k]];
        // Vérifier si les trois nœuds sont connectés entre eux
        if (
          graph[a].has(b) &&
          graph[a].has(c) &&
          graph[b].has(c)
        ) {
          triplets.push([a, b, c]); // Ajouter le triplet à la liste
        }
      }
    }
  }

  // Filtrer les triplets pour ne garder que ceux contenant au moins un nœud commençant par "t"
  const filteredTriplets = triplets.filter(
    (triplet) => triplet.some((node) => node.startsWith("t"))
  );

  return filteredTriplets; // Retourner les triplets filtrés
}

// Algorithme de Bron-Kerbosch pour trouver toutes les cliques maximales (Partie 2)
// `r` : ensemble de nœuds déjà dans la clique
// `p` : ensemble de candidats pour l'expansion
// `x` : ensemble de nœuds exclus
// `cliques` : liste pour stocker toutes les cliques maximales
function bronKerbosch(r, p, x, cliques) {
  // Condition de base : si `p` et `x` sont vides, `r` est une clique maximale
  if (p.size === 0 && x.size === 0) {
    cliques.push(Array.from(r)); // Ajouter la clique maximale à la liste
    return;
  }

  // Convertir `p` en tableau pour itérer
  const pArray = Array.from(p);
  for (const v of pArray) {
    const neighbors = graph[v] || new Set(); // Récupérer les voisins de `v`
    // Appel récursif avec :
    // - `r` étendu pour inclure `v`
    // - `p` réduit aux voisins de `v`
    // - `x` réduit aux voisins de `v`
    bronKerbosch(
      new Set([...r, v]),
      new Set([...p].filter((n) => neighbors.has(n))),
      new Set([...x].filter((n) => neighbors.has(n))),
      cliques
    );
    // Mettre à jour `p` et `x` en retirant `v`
    p.delete(v);
    x.add(v);
  }
}

// Résoudre la Partie 1
const triplets = findTriplets(graph); // Trouver les triplets connectés
const part1Result = triplets.length; // Nombre de triplets connectés filtrés

// Résoudre la Partie 2
const allNodes = new Set(Object.keys(graph)); // Ensemble de tous les nœuds
const cliques = []; // Liste pour stocker toutes les cliques maximales
bronKerbosch(new Set(), new Set(allNodes), new Set(), cliques); // Trouver les cliques

// Trouver la plus grande clique
let largestClique = [];
for (const clique of cliques) {
  if (clique.length > largestClique.length) {
    largestClique = clique; // Mettre à jour si une clique plus grande est trouvée
  }
}

// Calculer le mot de passe pour la Partie 2
// Trier les nœuds de la plus grande clique et les joindre avec des virgules
const password = largestClique.sort().join(",");

// Afficher les résultats
console.log("Part 1:", part1Result); // Affiche le résultat de la Partie 1
console.log("Part 2: Password to LAN party:", password); // Affiche le mot de passe pour la Partie 2

// Sauvegarder les résultats dans un fichier log
fs.writeFileSync(
  "results.log", // Nom du fichier
  `Part 1: ${part1Result}\nPart 2: Password to LAN party: ${password}\n`, // Contenu du fichier
  "utf-8" // Encodage
);
