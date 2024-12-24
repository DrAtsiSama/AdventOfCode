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
const mid = input.indexOf("");

// Parse les données
const wires = Object.fromEntries(input.slice(0, mid).map((line) => {
  const [k, v] = line.split(": ");
  return [k, parseInt(v)];
}));

const ruleLines = input.slice(mid + 1);

const rules = Object.fromEntries(
  ruleLines.map((line) => {
    const [left, op, right, , output] = line.split(" ");
    return [output, [left, op, right]];
  })
);

const ops = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => +(a !== b),
};

// Fonction de simulation
const simulate = (wires, rules) => {
  const queue = Object.keys(rules);
  const updatedWires = { ...wires };

  while (queue.length) {
    const wire = queue.pop();
    if (updatedWires[wire] !== undefined) continue;

    const [left, op, right] = rules[wire];
    const leftVal = updatedWires[left];
    const rightVal = updatedWires[right];

    if (leftVal == null || rightVal == null) {
      queue.push(wire);
      if (leftVal == null) queue.push(left);
      if (rightVal == null) queue.push(right);
    } else {
      updatedWires[wire] = ops[op](leftVal, rightVal);
    }
  }

  return updatedWires;
};

// Valider le système
const validate = (wires) => {
  const xBinary = Object.keys(wires)
    .filter((k) => k.startsWith("x"))
    .sort()
    .map((k) => wires[k])
    .reverse()
    .join("");

  const yBinary = Object.keys(wires)
    .filter((k) => k.startsWith("y"))
    .sort()
    .map((k) => wires[k])
    .reverse()
    .join("");

  const expectedSum = (parseInt(xBinary, 2) + parseInt(yBinary, 2)).toString(2);
  const zBinary = Object.keys(wires)
    .filter((k) => k.startsWith("z"))
    .sort()
    .reverse()
    .map((k) => wires[k])
    .join("");

  return zBinary === expectedSum.padStart(zBinary.length, "0");
};

// Trouver les swaps nécessaires
const findSwaps = (rules, wires) => {
  const possibleSwaps = Object.keys(rules)
    .filter((key) => key.startsWith("z"))
    .flatMap((key1, i, arr) =>
      arr.slice(i + 1).map((key2) => [key1, key2])
    );

  for (const [key1, key2] of possibleSwaps) {
    const swappedRules = { ...rules };
    [swappedRules[key1], swappedRules[key2]] = [swappedRules[key2], swappedRules[key1]];

    const updatedWires = simulate({ ...wires }, swappedRules);

    if (validate(updatedWires)) {
      return [key1, key2];
    }
  }

  return [];
};

// PARTIE 1 : Simulation initiale
const wiresAfterSimulation = simulate(wires, rules);

const zs = Object.keys(wiresAfterSimulation)
  .filter((wire) => wire.startsWith("z"))
  .sort()
  .reverse();

const zVals = zs.map((z) => wiresAfterSimulation[z]).join("");
const part1 = parseInt(zVals, 2);
console.log("Partie 1 :", part1);

// PARTIE 2 : Détection des swaps
const swaps = findSwaps(rules, wires);

if (swaps.length) {
  console.log("Part 2 :", swaps.join(","));
} else {
  console.log("Part 2 : Aucun swap trouvé");
}
