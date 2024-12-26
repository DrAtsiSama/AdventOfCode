// Importer le module fs pour lire le fichier
const fs = require('fs');

// Fonction pour lire le fichier et le convertir en tableau d'entiers
const readInput = (filename) => {
  const data = fs.readFileSync(filename, 'utf-8').trim();
  return data.split(/\s+/).map(Number); // Divise en nombres par espace ou nouvelle ligne
};

// Cache pour stocker les résultats des calculs
const DP = {};

/**
 * Fonction récursive pour résoudre le problème.
 * @param {number} x - Le nombre initial.
 * @param {number} t - Le nombre d'étapes.
 * @returns {number} - La longueur de la liste résultante.
 */
const solve = (x, t) => {
  const key = `${x},${t}`; // Clé unique pour stocker dans le cache
  if (DP[key] !== undefined) return DP[key]; // Retourner le résultat en cache s'il existe

  let result;
  if (t === 0) {
    result = 1; // Base de la récursion : si t = 0, la longueur est 1
  } else if (x === 0) {
    result = solve(1, t - 1); // Si x = 0, passer à 1 pour l'étape suivante
  } else if (String(x).length % 2 === 0) {
    // Si le nombre de chiffres est pair
    const dstr = String(x); // Convertir en chaîne de caractères
    const mid = dstr.length / 2;
    const left = parseInt(dstr.slice(0, mid), 10); // Partie gauche
    const right = parseInt(dstr.slice(mid), 10); // Partie droite
    result = solve(left, t - 1) + solve(right, t - 1); // Somme des résultats des deux moitiés
  } else {
    // Si le nombre de chiffres est impair
    result = solve(x * 2024, t - 1); // Multiplier par 2024 pour l'étape suivante
  }

  DP[key] = result; // Stocker le résultat dans le cache
  return result;
};

/**
 * Calculer la somme des solutions pour toutes les valeurs dans D après t étapes.
 * @param {number[]} D - Liste des valeurs initiales.
 * @param {number} t - Nombre d'étapes.
 * @returns {number} - Somme des longueurs des listes résultantes.
 */
const solveAll = (D, t) => {
  return D.reduce((sum, x) => sum + solve(x, t), 0); // Somme des résultats pour chaque x
};

// Charger les données d'entrée
const D = readInput('input.txt');

// Résoudre pour 25 et 75 étapes et afficher les résultats
console.log(solveAll(D, 25));
console.log(solveAll(D, 75));
