package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

// Directions des 8 voisins autour d'une cellule :
// (-1,-1) (-1,0) (-1,1)
// ( 0,-1)        ( 0,1)
// ( 1,-1) ( 1,0) ( 1,1)
var dirs = [][2]int{
	{-1, -1}, {-1, 0}, {-1, 1},
	{0, -1}, {0, 1},
	{1, -1}, {1, 0}, {1, 1},
}

// countNeighbors retourne combien de voisins '@' entourent la cellule (i,j).
func countNeighbors(grid [][]byte, i, j int) int {
	h := len(grid)
	w := len(grid[0])
	count := 0

	for _, d := range dirs {
		ni := i + d[0]
		nj := j + d[1]

		// Vérification que le voisin est dans la grille
		if ni >= 0 && ni < h && nj >= 0 && nj < w {
			if grid[ni][nj] == '@' {
				count++
			}
		}
	}

	return count
}

func main() {

	// --- LECTURE DU FICHIER ---
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatalf("Impossible d'ouvrir input.txt: %v", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	// La grille de caractères du puzzle (@ = roll, . = vide)
	grid := [][]byte{}
	for scanner.Scan() {
		grid = append(grid, []byte(scanner.Text()))
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("Erreur lecture input.txt: %v", err)
	}

	h := len(grid)
	w := len(grid[0])

	// --- PARTIE 1 ---
	// On compte les rouleaux '@' ayant STRICTEMENT moins de 4 voisins '@'.
	part1 := 0
	for i := 0; i < h; i++ {
		for j := 0; j < w; j++ {

			if grid[i][j] != '@' {
				continue
			}

			if countNeighbors(grid, i, j) < 4 {
				part1++
			}
		}
	}

	// --- PARTIE 2 ---
	// On doit simuler la suppression *répétée* :
	// Tant qu'il existe un rouleau '@' ayant < 4 voisins, on le retire.
	//
	// On modifie une copie, pour ne pas affecter le calcul de la partie 1.
	grid2 := make([][]byte, h)
	for i := range grid {
		grid2[i] = make([]byte, w)
		copy(grid2[i], grid[i])
	}

	totalRemoved := 0

	for {
		// Liste des positions à retirer lors de cette itération
		toRemove := [][2]int{}

		// Recherche des rouleaux accessibles
		for i := 0; i < h; i++ {
			for j := 0; j < w; j++ {
				if grid2[i][j] != '@' {
					continue
				}
				if countNeighbors(grid2, i, j) < 4 {
					toRemove = append(toRemove, [2]int{i, j})
				}
			}
		}

		// Si rien à retirer → on s'arrête
		if len(toRemove) == 0 {
			break
		}

		// Suppression des rouleaux trouvés
		for _, p := range toRemove {
			grid2[p[0]][p[1]] = '.'
		}

		// On augmente le compteur total
		totalRemoved += len(toRemove)
	}

	// --- AFFICHAGE DES RÉSULTATS ---
	fmt.Println("Part 1:", part1)
	fmt.Println("Part 2:", totalRemoved)
}
