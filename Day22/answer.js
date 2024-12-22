import { map, max, sum } from "./lib/arrays.js"; // Importation de fonctions utilitaires pour manipuler les tableaux.
import { pipe } from "./lib/utils.js"; // Importation de `pipe`, une fonction utilitaire pour composer des fonctions.
import fs from "fs"; // Module natif pour la gestion des fichiers.

// Fonction pour parser l'input
const parse = (input) => input.split("\n").map(Number);
// Cette fonction prend l'entrée brute du fichier (chaîne de caractères), 
// la divise par lignes et convertit chaque ligne en un nombre entier.

// Générer la séquence PRNG
const prng = (secret) => {
  const secrets = [secret]; // Initialisation de la liste des secrets avec le secret de départ.
  let run = 2000; // Nombre d'itérations à effectuer (2000 secrets à générer).
  while (run--) { // Boucle de 2000 itérations pour générer la séquence.
    // Calcul du secret suivant avec des opérations de mélange et de "pruning".
    secret = ((secret << 6) ^ secret) & 0xffffff;
    secret = ((secret >> 5) ^ secret) & 0xffffff;
    secret = ((secret << 11) ^ secret) & 0xffffff;
    secrets.push(secret); // Ajout du nouveau secret à la liste.
  }
  return secrets; // Retourne tous les secrets générés.
};

// Partie 1
const part1 = pipe(
  parse, // Convertit l'entrée brute en un tableau de nombres.
  map(prng), // Génère la séquence de secrets pour chaque nombre.
  map((secrets) => secrets.at(-1)), // Récupère le dernier (2000e) secret de chaque séquence.
  sum // Calcule la somme de ces 2000e secrets.
);

// Différences entre les prix
const diff = (prices) =>
  [prices, prices.map((p, i) => p - prices[i - 1])].map((v) => v.slice(1));
// Cette fonction calcule les différences entre les prix successifs :
// - Crée deux tableaux : l'original et les différences (chaque prix - prix précédent).
// - Utilise `.slice(1)` pour supprimer la première valeur (qui est invalide pour les différences).

// Mapper les séquences de prix
const seqPriceMap = (data) => {
  const sequenceKeys = new Set(); // Un ensemble pour stocker toutes les séquences uniques de prix.
  return [
    sequenceKeys,
    data.map(
      ([prices, diffs]) =>
        new Map(
          diffs
            .map((_, i) => {
              // Génère une clé unique basée sur une séquence de 4 différences successives.
              const key = diffs
                .slice(i, i + 4) // Prend une tranche de 4 différences.
                .reduce((acc, i) => acc * 100 + (i + 10), 0); // Convertit la tranche en un entier unique.
              sequenceKeys.add(key); // Ajoute la clé à l'ensemble des clés uniques.
              return [key, prices[i + 3]]; // Associe la clé au prix correspondant.
            })
            .reverse() // Inverse l'ordre pour prioriser les séquences les plus récentes.
        )
    ),
  ];
};

// Sommes des séquences
const sums = ([keys, maps]) =>
  [...keys].map((seq) =>
    // Pour chaque clé de séquence :
    maps.reduce((sum, map) => sum + (map.get(seq) ?? 0), 0)
    // Calcule la somme des prix associés à cette séquence à travers tous les maps.
  );

// Partie 2
const part2 = pipe(
  parse, // Convertit l'entrée brute en un tableau de nombres.
  map(prng), // Génère la séquence de secrets pour chaque nombre.
  map((secrets) => secrets.map((v) => v % 10)), // Garde uniquement le chiffre des unités de chaque secret.
  map(diff), // Calcule les différences entre les prix successifs.
  seqPriceMap, // Génère les maps de séquences de prix et collecte les clés uniques.
  sums, // Calcule les sommes des prix pour chaque séquence unique.
  max // Récupère le maximum parmi toutes les sommes.
);

// Lecture du fichier d'entrée
const input = fs.readFileSync("input.txt", "utf-8").trim();
// Lecture du fichier d'entrée et suppression des espaces ou lignes vides superflus.

console.log("Part 1:", part1(input)); // Affiche le résultat de la partie 1.
console.log("Part 2:", part2(input)); // Affiche le résultat de la partie 2.