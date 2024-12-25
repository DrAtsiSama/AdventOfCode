const fs = require("fs");

// Lire le fichier "input.txt"
const file = fs.readFileSync("input.txt", "utf-8").split("\n");

let formulas = {};
let lineIndex = 0;

// Lecture des lignes initiales
while (lineIndex < file.length && file[lineIndex].trim() !== "") {
    lineIndex++;
}

// Lecture des formules
for (lineIndex++; lineIndex < file.length; lineIndex++) {
    const line = file[lineIndex].trim();
    if (!line) continue;
    const [x, op, y, z] = line.replace(" -> ", " ").split(" ");
    formulas[z] = { op, x, y };
}

const makeWire = (char, num) => char + String(num).padStart(2, "0");

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

const verifyIntermediateXor = (wire, num) => {
    if (!(wire in formulas)) return false;
    const { op, x, y } = formulas[wire];
    if (op !== "XOR") return false;
    return [x, y].sort().join() === [makeWire("x", num), makeWire("y", num)].join();
};

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

const verifyDirectCarry = (wire, num) => {
    if (!(wire in formulas)) return false;
    const { op, x, y } = formulas[wire];
    if (op !== "AND") return false;
    return [x, y].sort().join() === [makeWire("x", num), makeWire("y", num)].join();
};

const verifyRecarry = (wire, num) => {
    if (!(wire in formulas)) return false;
    const { op, x, y } = formulas[wire];
    if (op !== "AND") return false;
    return (
        (verifyIntermediateXor(x, num) && verifyCarryBit(y, num)) ||
        (verifyIntermediateXor(y, num) && verifyCarryBit(x, num))
    );
};

const verify = (num) => verifyZ(makeWire("z", num), num);

const progress = () => {
    let i = 0;
    while (true) {
        if (!verify(i)) break;
        i++;
    }
    return i;
};

let swaps = [];

for (let _ = 0; _ < 4; _++) {
    const baseline = progress();
    let swapped = false;
    let lastX, lastY; // Variables pour conserver les derniers x et y échangés
    for (const x in formulas) {
        for (const y in formulas) {
            if (x === y) continue;
            [formulas[x], formulas[y]] = [formulas[y], formulas[x]];
            if (progress() > baseline) {
                swapped = true;
                lastX = x;
                lastY = y;
                break;
            }
            [formulas[x], formulas[y]] = [formulas[y], formulas[x]];
        }
        if (swapped) break;
    }
    if (swapped) swaps.push(lastX, lastY);
}

console.log(swaps.sort().join(","));
