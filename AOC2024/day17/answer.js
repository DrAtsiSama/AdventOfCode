import run from "aocrunner";

// Fonction pour parser l'entrée brute
const parseInput = (rawInput) => rawInput;

// Fonction pour assurer un modulo toujours positif
const modulo = (x, n) => ((x % n) + n) % n;

// Fonction pour comparer deux tableaux
const arraysMatch = (a, b) =>
  a.length === b.length && a.every((val, i) => val === b[i]);

/**
 * Fonction principale pour exécuter les instructions du programme.
 * @param {number} startA - Valeur initiale de A
 * @param {number} startB - Valeur initiale de B
 * @param {number} startC - Valeur initiale de C
 * @param {Array} instructions - Liste des instructions [opcode, operand]
 * @returns {Array} - Tableau des valeurs produites par l'instruction 'out' (opcode 5)
 */
const process = (startA, startB, startC, instructions) => {
  let rA = startA, // Registre A
    rB = startB,   // Registre B
    rC = startC;   // Registre C
  let pointer = 0; // Pointeur d'instruction
  const output = []; // Stocke les valeurs produites par opcode 5

  // Fonction pour évaluer les "combo operands"
  const comboOp = (operand) => (operand < 4 ? operand : { 4: rA, 5: rB, 6: rC }[operand]);

  // Table des opcodes : chaque opcode est une fonction renvoyant le saut à effectuer
  const opcodes = {
    0: (op) => (rA = Math.trunc(rA / 2 ** comboOp(op)), 1), // Division par puissance de 2
    1: (op) => (rB ^= op, 1),                              // XOR avec une valeur littérale
    2: (op) => (rB = modulo(comboOp(op), 8), 1),           // Modulo 8
    3: (op) => (rA !== 0 ? ((pointer = op), 0) : 1),       // Saut conditionnel si A ≠ 0
    4: () => (rB ^= rC, 1),                                // XOR entre B et C
    5: (op) => (output.push(modulo(comboOp(op), 8)), 1),   // Stocke la sortie (modulo 8)
    6: (op) => (rB = Math.trunc(rA / 2 ** comboOp(op)), 1),// Division par puissance de 2 stockée dans B
    7: (op) => (rC = Math.trunc(rA / 2 ** comboOp(op)), 1),// Division par puissance de 2 stockée dans C
  };

  // Boucle d'exécution des instructions
  while (pointer < instructions.length) {
    const [operation, operand] = instructions[pointer]; // Opcode et opérande actuels
    const jump = opcodes[operation](operand); // Exécute l'opcode
    pointer += jump; // Incrémente le pointeur d'instructions
  }

  return output;
};

/**
 * Partie 1 : Exécute les instructions et retourne les valeurs produites.
 */
const part1 = (rawInput) => {
  const nums = rawInput.match(/\d+/g).map(Number); // Extraction des nombres de l'entrée
  const [rA, rB, rC] = nums.slice(0, 3); // Valeurs initiales des registres A, B et C

  // Construction de la liste des instructions [opcode, operand]
  const instructions = [];
  for (let i = 3; i < nums.length; i += 2) {
    instructions.push([nums[i], nums[i + 1]]);
  }

  return process(rA, rB, rC, instructions).join(",");
};

/**
 * Partie 2 : Trouve la plus petite valeur de A qui reproduit les instructions.
 */
const part2 = (rawInput) => {
  const nums = rawInput.match(/\d+/g).map(Number); // Extraction des nombres
  const targets = nums.slice(3); // Instructions cibles pour la comparaison

  // Construction de la liste des instructions
  const instructions = [];
  for (let i = 3; i < nums.length; i += 2) {
    instructions.push([nums[i], nums[i + 1]]);
  }

  const stack = [{ currA: 0, idx: 0 }]; // Pile DFS pour explorer les valeurs de A
  const seen = new Set(); // Ensemble pour éviter de revisiter les mêmes valeurs de A

  while (stack.length > 0) {
    const { currA, idx } = stack.pop();

    // Condition de sortie : toutes les instructions sont reproduites
    if (idx === targets.length) return currA;

    for (let add = 7; add >= 0; add--) {
      const nextNum = currA * 8 + add;
      if (seen.has(nextNum)) continue; // Ignore les valeurs déjà visitées

      seen.add(nextNum);
      const result = process(nextNum, 0, 0, instructions);
      const resultSlice = result.slice(-idx - 1);
      const targetSlice = targets.slice(-resultSlice.length);

      if (arraysMatch(resultSlice, targetSlice)) {
        stack.push({ currA: nextNum, idx: idx + 1 }); // Ajoute à la pile DFS
      }
    }
  }
};

// Exécution avec aocrunner
run({
  part1: {
    tests: [
      {
        input: `
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`,
        expected: "4,6,3,5,6,3,5,2,1,0",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0
`,
        expected: 117440,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
