const fs = require('fs');

/**
 * Génère toutes les combinaisons possibles d'opérateurs.
 * @param {number} length - Nombre d'opérateurs à générer.
 * @param {boolean} includeConcat - Inclure l'opérateur de concaténation (||).
 * @returns {string[][]} - Toutes les combinaisons d'opérateurs.
 */
function generateOperatorCombinations(length, includeConcat = false) {
    const combinations = [];
    const base = includeConcat ? 3 : 2; // 2 pour Partie 1, 3 pour Partie 2
    const max = Math.pow(base, length);
    for (let i = 0; i < max; i++) {
        const combo = [];
        let temp = i;
        for (let j = 0; j < length; j++) {
            const remainder = temp % base;
            combo.push(remainder === 0 ? '+' : remainder === 1 ? '*' : '||');
            temp = Math.floor(temp / base);
        }
        combinations.push(combo);
    }
    return combinations;
}

/**
 * Calcule le résultat d'une combinaison d'opérateurs.
 * @param {number[]} numbers - Liste des nombres.
 * @param {string[]} operators - Liste des opérateurs (dans l'ordre).
 * @returns {number} - Résultat calculé.
 */
function calculateResult(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else if (operators[i] === '||') {
            result = parseInt(result.toString() + numbers[i + 1].toString(), 10);
        }
    }
    return result;
}

/**
 * Résout une partie du problème.
 * @param {string} input - Données d'entrée.
 * @param {boolean} includeConcat - Inclure ou non l'opérateur de concaténation (||).
 * @returns {number} - Somme des valeurs cibles des équations valides.
 */
function solve(input, includeConcat = false) {
    const lines = input.trim().split('\n');
    let totalCalibration = 0;

    for (const line of lines) {
        const [target, numbersStr] = line.split(': ');
        const targetValue = parseInt(target, 10);
        const numbers = numbersStr.split(' ').map(Number);

        const operatorCombinations = generateOperatorCombinations(numbers.length - 1, includeConcat);
        let isValid = false;

        for (const operators of operatorCombinations) {
            if (calculateResult([...numbers], operators) === targetValue) {
                isValid = true;
                break;
            }
        }

        if (isValid) {
            totalCalibration += targetValue;
        }
    }

    return totalCalibration;
}

// Lecture du fichier input.txt
const input = fs.readFileSync('input.txt', 'utf-8');

// Partie 1 : Utilisation uniquement des opérateurs + et *
const part1Result = solve(input, false);
console.log('Part 1 - Total Calibration Result:', part1Result);

// Partie 2 : Ajout de l'opérateur de concaténation (||)
const part2Result = solve(input, true);
console.log('Part 2 - Total Calibration Result:', part2Result);
