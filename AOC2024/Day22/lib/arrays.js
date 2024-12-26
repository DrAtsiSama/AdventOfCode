// Fonction `map`
// `map` prend une fonction `fn` en argument et retourne une nouvelle fonction.
// Cette nouvelle fonction applique `fn` à chaque élément d'un tableau `arr`.
// Cela permet de créer une version partiellement appliquée de `Array.prototype.map`.
export const map = (fn) => (arr) => arr.map(fn);

// Exemple d'utilisation de `map`:
// const double = (x) => x * 2;
// const doubledArray = map(double)([1, 2, 3]); // Résultat : [2, 4, 6]

// Fonction `sum`
// `sum` calcule la somme des éléments d'un tableau `arr`.
// Utilise `Array.prototype.reduce` pour additionner tous les éléments du tableau.
export const sum = (arr) => arr.reduce((acc, x) => acc + x, 0);

// Exemple d'utilisation de `sum`:
// const total = sum([1, 2, 3, 4]); // Résultat : 10

// Fonction `max`
// `max` retourne la valeur maximale d'un tableau `arr`.
// Utilise `Math.max` avec l'opérateur de décomposition `...` pour traiter tous les éléments du tableau.
export const max = (arr) => Math.max(...arr);

// Exemple d'utilisation de `max`:
// const maximum = max([1, 5, 3, 9, 2]); // Résultat : 9
