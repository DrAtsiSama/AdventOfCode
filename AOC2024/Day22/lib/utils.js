// La fonction `pipe` permet de composer plusieurs fonctions pour les exécuter de manière séquentielle.
// Chaque fonction prend en entrée le résultat de la fonction précédente.

export const pipe =
  (...fns) => // `...fns` : Prend un nombre quelconque de fonctions en argument, sous forme de tableau.
  (input) => // Retourne une nouvelle fonction qui prend une valeur `input` comme argument initial.
    fns.reduce(
      (acc, fn) => fn(acc), // Applique chaque fonction `fn` à l'accumulateur `acc`.
      input // Initialise l'accumulateur avec la valeur d'entrée `input`.
    );

// Exemple d'utilisation :
// const add = (x) => x + 2;
// const multiply = (x) => x * 3;
// const composed = pipe(add, multiply); // Combine les fonctions `add` et `multiply`.
// console.log(composed(5)); // Résultat : (5 + 2) * 3 = 21
