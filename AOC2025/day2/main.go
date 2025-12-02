package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

// isInvalidPart1 vérifie si un ID est composé de deux moitiés identiques.
// Exemple : 55, 6464, 123123.
func isInvalidPart1(n int) bool {
	s := strconv.Itoa(n)

	// Longueur impaire → ne peut pas être composé de deux parties identiques.
	if len(s)%2 != 0 {
		return false
	}

	// On découpe le nombre en deux parties égales.
	half := len(s) / 2
	left := s[:half]
	right := s[half:]

	// L'ID est invalide si les deux moitiés sont identiques.
	return left == right
}

// isInvalidPart2 vérifie si un ID est composé d’un motif répété au moins deux fois.
// Exemple : 1212, 123123123, 1111111.
func isInvalidPart2(n int) bool {
	s := strconv.Itoa(n)
	L := len(s)

	// On teste tous les motifs possibles.
	for d := 1; d <= L/2; d++ {

		// Le motif doit répéter un nombre de fois exact.
		if L%d != 0 {
			continue
		}

		repeats := L / d
		if repeats < 2 {
			continue
		}

		// Motif à tester.
		pattern := s[:d]
		matches := true

		// Vérifie que tout le nombre est composé du même motif répété.
		for i := 1; i < repeats; i++ {
			start := i * d
			end := start + d
			if s[start:end] != pattern {
				matches = false
				break
			}
		}

		if matches {
			return true
		}
	}

	return false
}

func main() {
	// Lecture du fichier input.txt (une seule ligne).
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatalf("Impossible d'ouvrir input.txt: %v", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	if !scanner.Scan() {
		log.Fatal("input.txt est vide")
	}
	line := scanner.Text()

	// Chaque plage est du type "A-B", séparée par des virgules.
	ranges := strings.Split(line, ",")

	totalPart1 := 0
	totalPart2 := 0

	// Traitement de chaque plage.
	for _, r := range ranges {
		r = strings.TrimSpace(r)
		if r == "" {
			continue
		}

		parts := strings.Split(r, "-")
		if len(parts) != 2 {
			log.Fatalf("Format de plage invalide: %s", r)
		}

		// Conversion en entier.
		start, err1 := strconv.Atoi(parts[0])
		end, err2 := strconv.Atoi(parts[1])
		if err1 != nil || err2 != nil {
			log.Fatalf("Valeurs invalides dans la plage %s", r)
		}

		// Vérifie tous les IDs dans la plage.
		for id := start; id <= end; id++ {

			// Partie 1 : motif répété deux fois.
			if isInvalidPart1(id) {
				totalPart1 += id
			}

			// Partie 2 : motif répété au moins deux fois.
			if isInvalidPart2(id) {
				totalPart2 += id
			}
		}
	}

	// Affichage des résultats.
	fmt.Println("Part 1:", totalPart1)
	fmt.Println("Part 2:", totalPart2)
}
