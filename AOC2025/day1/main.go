package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

// Le cadran fait 100 positions : 0 à 99
// Toutes les opérations se font modulo 100
const modulo = 100

// countZerosDuring calcule le nombre de clics qui font passer la position par 0
// pendant UNE rotation.
//
// Le cadran clique une fois par unité de distance :
// - Un déplacement de R10 fait passer par pos+1, pos+2, ..., pos+10
// - Un déplacement de L10 fait passer par pos-1, pos-2, ..., pos-10 (mod 100)
//
// On NE simule PAS chaque clic individuellement, car certaines distances dépassent
// 900, 1000 ou plus → trop lent.
// À la place, on calcule directement à quels moments (k) le cadran tombe sur 0.
//
// Mathématique derrière :
// On cherche les k (1 ≤ k ≤ dist) tels que :
//
//	(pos + k) mod 100 == 0   (si R)
//	(pos - k) mod 100 == 0   (si L)
//
// Pour une équation modulo 100, on obtient un "premier" k, puis un 0 tous les 100 pas.
//
// Exemple :
//
//	pos = 50, R → premiers 0 à k = 50 (car 50 + 50 = 100 → 0)
//	puis à k = 150, 250, 350...
//
// Donc :
//   - Calculer le premier k0 qui tombe sur 0
//   - Puis compter combien de multiples de 100 rentrent dans la distance
func countZerosDuring(pos int, dir byte, dist int) int {

	// rem = position actuelle modulo 100
	// (au cas où pos serait négatif, ce qui peut arriver avec L)
	rem := pos % modulo
	if rem < 0 {
		rem += modulo
	}

	// k0 = nombre de clics nécessaires pour atteindre un premier 0
	var k0 int

	switch dir {
	case 'R':
		// Pour aller à droite (pos + k ≡ 0 mod 100)
		// - si rem = 0 → premier 0 après un tour complet → k0 = 100
		// - sinon k0 = 100 - rem
		if rem == 0 {
			k0 = modulo
		} else {
			k0 = modulo - rem
		}

	case 'L':
		// Pour aller à gauche (pos - k ≡ 0 mod 100)
		// - si rem = 0 → premier 0 après un tour → k0 = 100
		// - sinon k0 = rem
		if rem == 0 {
			k0 = modulo
		} else {
			k0 = rem
		}

	default:
		log.Fatalf("direction invalide: %c", dir)
	}

	// Si la distance est plus courte que k0, on ne touche pas 0
	if dist < k0 {
		return 0
	}

	// Sinon :
	// 1 clic pour atteindre 0 à k0
	// + un clic tous les 100 pas supplémentaires
	// Formule : 1 + (dist - k0) / 100
	return 1 + (dist-k0)/modulo
}

func main() {
	// Lecture de input.txt dans le même dossier
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatalf("impossible d'ouvrir input.txt: %v", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	// Le cadran commence pointé sur 50
	pos := 50

	// part1 = nombre de fois où la position finale après une rotation est 0
	part1 := 0

	// part2 = nombre total de fois où un clic (pendant OU à la fin) passe par 0
	part2 := 0

	// Pour chaque instruction : Lxx ou Ryy
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}

		// Première lettre → direction
		dir := line[0]

		// Le reste → distance
		distStr := line[1:]
		dist, err := strconv.Atoi(distStr)
		if err != nil {
			log.Fatalf("distance invalide dans la ligne %q: %v", line, err)
		}

		// --- PARTIE 2 ---
		// On compte combien de fois on passe par 0 pendant la rotation
		part2 += countZerosDuring(pos, dir, dist)

		// --- MISE À JOUR DE LA POSITION (commune aux deux parties) ---
		switch dir {
		case 'R':
			pos = (pos + dist) % modulo
		case 'L':
			pos = (pos - dist) % modulo
			if pos < 0 {
				pos += modulo
			}
		default:
			log.Fatalf("direction invalide %q dans la ligne %q", dir, line)
		}

		// --- PARTIE 1 ---
		// Si la position finale est 0, on incrémente
		if pos == 0 {
			part1++
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatalf("erreur de lecture de input.txt: %v", err)
	}

	// Résultats
	fmt.Println("Part 1:", part1)
	fmt.Println("Part 2:", part2)
}
