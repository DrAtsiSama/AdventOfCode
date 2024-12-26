const fs = require('fs');

// Fonction pour afficher le résultat
function pr(s) {
    console.log(s);
}

// Configuration des directions (haut, droite, bas, gauche)
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

// Fonction pour extraire des entiers d'une chaîne
function ints(s) {
    return [...s.matchAll(/-?\d+/g)].map(match => parseInt(match[0], 10));
}

// Lecture du fichier d'entrée
const infile = process.argv.length >= 3 ? process.argv[2] : 'input.txt';
const D = fs.readFileSync(infile, 'utf-8').trim();

const shapes = D.split('\n\n');
let keys = [];
let locks = [];

// Traitement des formes
for (const shape of shapes) {
    const G = shape.split('\n');
    const R = G.length;
    const C = G[0].length;
    const grid = G.map(row => row.split(''));

    let isKey = true;
    for (let c = 0; c < C; c++) {
        if (grid[0][c] === '#') {
            isKey = false;
            break;
        }
    }
    if (isKey) {
        keys.push(shape);
    } else {
        locks.push(shape);
    }
}

// Fonction pour vérifier si une clé s'adapte à une serrure
function fits(key, lock) {
    const R = key.length;
    const C = key[0].length;
    if (R !== lock.length || C !== lock[0].length) {
        throw new Error("Dimensions des clés et serrures ne correspondent pas");
    }
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (key[r][c] === '#' && lock[r][c] === '#') {
                return false;
            }
        }
    }
    return true;
}

// Conversion des chaînes en grilles
function stringToGrid(str) {
    return str.split('\n').map(row => row.split(''));
}

let ans = 0;

// Vérification des combinaisons clé-serrure
for (const key of keys) {
    for (const lock of locks) {
        const keyGrid = stringToGrid(key);
        const lockGrid = stringToGrid(lock);
        if (fits(keyGrid, lockGrid)) {
            ans += 1;
        }
    }
}

pr(ans);
