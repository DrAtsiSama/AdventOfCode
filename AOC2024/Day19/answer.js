const fs = require('fs');

// Fonction pour afficher les résultats
function pr(s) {
    console.log(s);
}

// Définir les directions pour navigation, si nécessaire (haut, droite, bas, gauche)
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

// Fonction utilitaire pour extraire tous les entiers d'une chaîne
function ints(s) {
    return Array.from(s.matchAll(/-?\d+/g), match => parseInt(match[0]));
}

// Chargement des données d'entrée depuis le fichier input.txt
const infile = process.argv[2] || 'input.txt';
const D = fs.readFileSync(infile, 'utf8').trim();
const [wordsBlock, targetsBlock] = D.split('\n\n');
const words = wordsBlock.split(', ');
const targets = targetsBlock.split('\n');

// Cache pour mémorisation dynamique
const DP = {};

// Fonction pour calculer le nombre de façons de former `target` avec `words`
function ways(words, target) {
    if (DP[target] !== undefined) {
        return DP[target];
    }
    
    let ans = 0;
    if (target === '') {
        ans = 1; // Si la cible est vide, c'est une solution valide
    } else {
        for (const word of words) {
            if (target.startsWith(word)) {
                ans += ways(words, target.slice(word.length));
            }
        }
    }

    DP[target] = ans; // Stocker dans le cache pour éviter les recalculs
    return ans;
}

// Initialisation des compteurs
let p1 = 0; // Nombre de cibles formables
let p2 = 0; // Nombre total de façons de former toutes les cibles

// Calcul pour chaque cible
for (const target of targets) {
    const targetWays = ways(words, target);
    if (targetWays > 0) {
        p1 += 1; // La cible est formable
    }
    p2 += targetWays; // Ajouter toutes les façons de former cette cible
}

// Affichage des résultats
pr(p1);
pr(p2);
