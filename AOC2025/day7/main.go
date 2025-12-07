package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

// -----------------------------------------------------------
// PART 1 : compter combien de fois l'on déclenche un split.
// -----------------------------------------------------------
//
// Logique :
// - La particule descend verticalement depuis S
// - Chaque fois qu’elle rencontre un '^', on augmente le compteur
// - Ensuite la particule se divise et ces beams avancent aussi
//
// MAIS contrairement à la partie 2 :
// → Ici seules les fusions de faisceaux sont ignorées.
// → On ne compte que les événements “rencontre un splitter”
//
// Implémentation : propagation BFS des faisceaux.
//

func solvePart1(grid []string) int {
	h := len(grid)
	w := len(grid[0])

	// Chercher la position initiale S
	sr, sc := -1, -1
	for r := 0; r < h; r++ {
		for c := 0; c < w; c++ {
			if grid[r][c] == 'S' {
				sr, sc = r, c
				break
			}
		}
	}

	if sr == -1 {
		log.Fatal("Aucun S trouvé")
	}

	type beam struct{ r, c int }

	// Visité : éviter que le même beam soit traité plusieurs fois au même endroit
	visited := make(map[beam]bool)

	queue := []beam{{sr, sc}}

	splits := 0

	for len(queue) > 0 {
		b := queue[0]
		queue = queue[1:]

		if visited[b] {
			continue
		}
		visited[b] = true

		r, c := b.r, b.c

		// Attente : on descend
		if r+1 >= h {
			continue
		}

		nextCell := grid[r+1][c]

		if nextCell == '.' || nextCell == 'S' {
			// Simple descente : un seul beam
			queue = append(queue, beam{r + 1, c})
		} else if nextCell == '^' {
			// On compte un split
			splits++

			// On émet deux beams sur la même ligne (à gauche et à droite)
			if c-1 >= 0 {
				queue = append(queue, beam{r + 1, c - 1})
			}
			if c+1 < w {
				queue = append(queue, beam{r + 1, c + 1})
			}
		}
	}

	return splits
}

// -----------------------------------------------------------
// PART 2 : nombre total de timelines
// -----------------------------------------------------------
//
// Logique :
// - Une timeline part depuis S
// - Lorsqu’elle atteint '^', on double:
//      → une timeline va à gauche
//      → une timeline va à droite
// - Toutes les timelines indépendantes sont comptées
//
// Implémentation :
// DP[r][c] = nombre de timelines atteignant (r,c)
//
// On remplit ligne par ligne en descendant
// -----------------------------------------------------------

func solvePart2(grid []string) uint64 {
	h := len(grid)
	w := len(grid[0])

	// Trouver S
	sr, sc := -1, -1
	for r := 0; r < h; r++ {
		for c := 0; c < w; c++ {
			if grid[r][c] == 'S' {
				sr, sc = r, c
				break
			}
		}
	}
	if sr == -1 {
		log.Fatal("Aucun S trouvé")
	}

	// DP[r][c] = nombre de timelines arrivant à (r,c)
	DP := make([][]uint64, h)
	for i := range DP {
		DP[i] = make([]uint64, w)
	}

	// Une timeline part de S
	DP[sr][sc] = 1

	// On descend ligne par ligne depuis juste sous le S
	for r := sr + 1; r < h; r++ {
		for c := 0; c < w; c++ {

			// combien de timelines proviennent de juste au-dessus
			fromAbove := DP[r-1][c]
			if fromAbove == 0 {
				continue
			}

			cell := grid[r][c]

			if cell == '.' || cell == 'S' {
				// Le faisceau continue verticalement
				DP[r][c] += fromAbove

			} else if cell == '^' {
				// Split quantique :
				// la timeline se subdivise en 2 timelines différentes
				// -> gauche & droite, sur la même ligne
				if c-1 >= 0 {
					DP[r][c-1] += fromAbove
				}
				if c+1 < w {
					DP[r][c+1] += fromAbove
				}
				// Rien ne descend dans la colonne actuelle
			}
		}
	}

	// Le total est la somme des timelines arrivées sur la dernière ligne
	var total uint64 = 0
	for c := 0; c < w; c++ {
		total += DP[h-1][c]
	}

	return total
}

// -----------------------------------------------------------
// MAIN PROGRAMME
// -----------------------------------------------------------

func main() {
	f, err := os.Open("input.txt")
	if err != nil {
		log.Fatalf("Impossible d'ouvrir input.txt: %v", err)
	}
	defer f.Close()

	var grid []string
	sc := bufio.NewScanner(f)

	for sc.Scan() {
		grid = append(grid, sc.Text())
	}
	if err := sc.Err(); err != nil {
		log.Fatalf("Erreur de lecture: %v", err)
	}

	// PARTIE 1
	part1 := solvePart1(grid)
	fmt.Println("Part 1:", part1)

	// PARTIE 2
	part2 := solvePart2(grid)
	fmt.Println("Part 2:", part2)
}
