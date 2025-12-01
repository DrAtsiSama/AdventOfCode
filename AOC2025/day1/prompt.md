🎄 Advent of Code 2025 – Day 1
Secret Entrance
🧝‍♂️ Introduction

Les Lutins ont une bonne nouvelle et une mauvaise nouvelle :

Bonne nouvelle : ils ont découvert le project management.

Mauvaise nouvelle : plus aucun Lutin n’a de temps pour décorer le Pôle Nord.

Pour sauver Noël, tu arrives à l’entrée secrète de la base… mais le mot de passe a changé.

Un document explique que la combinaison du coffre contenant le mot de passe est décrite dans ton puzzle input.

🔐 Le coffre et son cadran

Le coffre possède un cadran circulaire avec les valeurs 0 à 99.
Chaque rotation clique sur chaque valeur franchie.

L → rotation vers la gauche (vers les nombres plus petits)

R → rotation vers la droite (vers les nombres plus grands)

Le cadran commence à 50.

🔁 Exemple de rotation

Si le cadran est à 11 :

R8 → 19

L19 → 0

Si le cadran est à 5 :

L10 → 95

R5 → 0

Les rotations sont circulaires :

tourner à gauche depuis 0 → 99

tourner à droite depuis 99 → 0

⭐ Partie 1 – Le vrai premier mot de passe

On suit chaque rotation. Après chaque rotation, si le cadran pointe sur 0, on incrémente un compteur.

Exemple fourni

Input :

L68
L30
R48
L5
R60
L55
L1
L99
R14
L82

Étapes (résumé) :

Start at 50
L68 → 82
L30 → 52
R48 → 0
L5 → 95
R60 → 55
L55 → 0
L1 → 99
L99 → 0
R14 → 14
L82 → 32

→ Le cadran passe 3 fois sur zéro en fin de rotation.

Réponse de la Partie 1 : 1150
⭐⭐ Partie 2 – Méthode 0x434C49434B

Un second document précise :
"Veuillez désormais utiliser la méthode de mot de passe 0x434C49434B."

Cette méthode signifie :

→ Il faut compter chaque clic qui passe par 0, même au milieu d’une rotation.

Exemple :
R1000 depuis 50 passe par 0 dix fois avant de revenir à 50.

Exemple enrichi

Avec le même input :

L68 → passe 1 fois par 0

L30 → passe 0 fois

R48 → arrive sur 0

L5 → 0 fois

R60 → passe 1 fois par 0

L55 → arrive sur 0

L1 → 0 fois

L99 → arrive sur 0

R14 → 0 fois

L82 → passe 1 fois par 0

Total :

3 zéros finaux

3 zéros intermédiaires
→ nouveau mot de passe : 6

Résultat pour ton puzzle
Réponse de la Partie 2 : 6738
📌 Résumé
Partie	Description	Réponse
Part 1	Zéros en fin de rotation	1150
Part 2	Zéros en fin + pendant les rotations (clics)	6738