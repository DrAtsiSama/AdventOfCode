const fs = require("fs");
const path = require("path");

// Charger le fichier d'entrée
const INPUT_PATH = path.join(__dirname, "input.txt");

if (!fs.existsSync(INPUT_PATH)) {
  console.error(`Fichier d'entrée non trouvé : ${INPUT_PATH}`);
  process.exit(1);
}

// Charger et parser l'entrée
const input = fs.readFileSync(INPUT_PATH, "utf8").trim().split("\n");
// Trouve la ligne vide pour séparer les sections de l'entrée
const mid = input.indexOf("");

// Parse les valeurs initiales des "wires" (fils électriques)
const wires = Object.fromEntries(input.slice(0, mid).map((line) => {
  const [k, v] = line.split(": "); // Sépare les noms et les valeurs
  return [k, parseInt(v)]; // Convertit les valeurs en entier
}));

// Parse les règles de manipulation des fils
const ruleLines = input.slice(mid + 1);
const rules = Object.fromEntries(
  ruleLines.map((line) => {
    const [left, op, right, , output] = line.split(" "); // Décompose les lignes en composants
    return [output, [left, op, right]]; // Associe chaque fil de sortie à sa règle
  })
);

// Opérations logiques supportées
const ops = {
  AND: (a, b) => a & b,  // Opération ET
  OR: (a, b) => a | b,   // Opération OU
  XOR: (a, b) => +(a !== b), // Opération XOR (OU exclusif)
};

// Fonction de simulation des fils électriques
const simulate = (wires, rules) => {
  const queue = Object.keys(rules); // Liste des fils à simuler
  const updatedWires = { ...wires }; // Copie des fils actuels

  while (queue.length) {
    const wire = queue.pop(); // Récupère un fil
    if (updatedWires[wire] !== undefined) continue; // Ignore si déjà calculé

    const [left, op, right] = rules[wire]; // Récupère la règle associée
    const leftVal = updatedWires[left];   // Valeur du fil gauche
    const rightVal = updatedWires[right]; // Valeur du fil droit

    // Si les fils nécessaires ne sont pas encore calculés, les rajouter dans la queue
    if (leftVal == null || rightVal == null) {
      queue.push(wire);
      if (leftVal == null) queue.push(left);
      if (rightVal == null) queue.push(right);
    } else {
      // Applique l'opération et stocke le résultat
      updatedWires[wire] = ops[op](leftVal, rightVal);
    }
  }

  return updatedWires;
};

// Fonction pour valider les fils
const validate = (wires) => {
  // Construit le binaire pour "x"
  const xBinary = Object.keys(wires)
    .filter((k) => k.startsWith("x"))
    .sort()
    .map((k) => wires[k])
    .reverse()
    .join("");

  // Construit le binaire pour "y"
  const yBinary = Object.keys(wires)
    .filter((k) => k.startsWith("y"))
    .sort()
    .map((k) => wires[k])
    .reverse()
    .join("");

  // Calcul de la somme attendue en binaire
  const expectedSum = (parseInt(xBinary, 2) + parseInt(yBinary, 2)).toString(2);

  // Construit le binaire pour "z"
  const zBinary = Object.keys(wires)
    .filter((k) => k.startsWith("z"))
    .sort()
    .reverse()
    .map((k) => wires[k])
    .join("");

  // Vérifie si le binaire "z" correspond à la somme
  return zBinary === expectedSum.padStart(zBinary.length, "0");
};

// PARTIE 1 : Simulation initiale
const wiresAfterSimulation = simulate(wires, rules);

// Extraction des fils "z" pour calculer leur valeur binaire
const zs = Object.keys(wiresAfterSimulation)
  .filter((wire) => wire.startsWith("z"))
  .sort()
  .reverse();

const zVals = zs.map((z) => wiresAfterSimulation[z]).join("");
const part1 = parseInt(zVals, 2); // Conversion du binaire en entier
console.log("Partie 1 :", part1);

// PARTIE 2 : Modification des règles pour optimiser la logique
let formulas = {};
let lineIndex = 0;

// Lecture des formules
ruleLines.forEach((line) => {
  const [x, op, y, z] = line.replace(" -> ", " ").split(" ");
  formulas[z] = { op, x, y }; // Stocke les règles sous forme de dictionnaire
});

// Génère un identifiant unique pour les fils
const makeWire = (char, num) => char + String(num).padStart(2, "0");

// Vérifie les contraintes sur les fils "z"
const verifyZ = (wire, num) => {
  if (!(wire in formulas)) return false;
  const { op, x, y } = formulas[wire];
  if (op !== "XOR") return false;
  if (num === 0) return [x, y].sort().join() === ["x00", "y00"].join();
  return (
    (verifyIntermediateXor(x, num) && verifyCarryBit(y, num)) ||
    (verifyIntermediateXor(y, num) && verifyCarryBit(x, num))
  );
};

// Vérifie les XOR intermédiaires
const verifyIntermediateXor = (wire, num) => {
  if (!(wire in formulas)) return false;
  const { op, x, y } = formulas[wire];
  if (op !== "XOR") return false;
  return [x, y].sort().join() === [makeWire("x", num), makeWire("y", num)].join();
};

// Vérifie le bit de retenue (carry)
const verifyCarryBit = (wire, num) => {
  if (!(wire in formulas)) return false;
  const { op, x, y } = formulas[wire];
  if (num === 1) {
    if (op !== "AND") return false;
    return [x, y].sort().join() === ["x00", "y00"].join();
  }
  if (op !== "OR") return false;
  return (
    (verifyDirectCarry(x, num - 1) && verifyRecarry(y, num - 1)) ||
    (verifyDirectCarry(y, num - 1) && verifyRecarry(x, num - 1))
  );
};

// Vérifie les AND directs
const verifyDirectCarry = (wire, num) => {
  if (!(wire in formulas)) return false;
  const { op, x, y } = formulas[wire];
  if (op !== "AND") return false;
  return [x, y].sort().join() === [makeWire("x", num), makeWire("y", num)].join();
};

// Vérifie la recopie des AND
const verifyRecarry = (wire, num) => {
  if (!(wire in formulas)) return false;
  const { op, x, y } = formulas[wire];
  if (op !== "AND") return false;
  return (
    (verifyIntermediateXor(x, num) && verifyCarryBit(y, num)) ||
    (verifyIntermediateXor(y, num) && verifyCarryBit(x, num))
  );
};

// Vérifie les règles jusqu'à un certain nombre
const verify = (num) => verifyZ(makeWire("z", num), num);

// Avance le compteur pour évaluer la profondeur maximale
const progress = () => {
  let i = 0;
  while (true) {
    if (!verify(i)) break;
    i++;
  }
  return i;
};

// Optimisation des formules via des permutations
let swaps = [];

for (let _ = 0; _ < 4; _++) {
  const baseline = progress();
  let swapped = false;
  let lastX, lastY;

  // Essaie d'échanger les formules pour améliorer la profondeur
  for (const x in formulas) {
    for (const y in formulas) {
      if (x === y) continue;
      [formulas[x], formulas[y]] = [formulas[y], formulas[x]]; // Échange
      if (progress() > baseline) {
        swapped = true;
        lastX = x;
        lastY = y;
        break;
      }
      [formulas[x], formulas[y]] = [formulas[y], formulas[x]]; // Réinitialise
    }
    if (swapped) break;
  }

  if (swapped) swaps.push(lastX, lastY);
}

// Affiche les résultats de la Partie 2
console.log("Partie 2 :", swaps.sort().join(","));
