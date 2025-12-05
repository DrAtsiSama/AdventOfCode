package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
)

// Structure représentant une plage d'ingrédients
type Range struct {
	start int64
	end   int64
}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatalf("Impossible d'ouvrir input.txt: %v", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	var freshRanges []Range
	var availableIDs []int64

	readingRanges := true // devient false quand on croise la ligne vide

	// Lecture de fichier
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			readingRanges = false
			continue
		}

		if readingRanges {
			// Lecture des plages de la partie haute
			parts := strings.Split(line, "-")
			if len(parts) != 2 {
				log.Fatalf("Plage invalide : %s", line)
			}

			start, _ := strconv.ParseInt(parts[0], 10, 64)
			end, _ := strconv.ParseInt(parts[1], 10, 64)

			freshRanges = append(freshRanges, Range{start: start, end: end})
		} else {
			// Lecture des IDs individuels de la partie basse
			id, _ := strconv.ParseInt(line, 10, 64)
			availableIDs = append(availableIDs, id)
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatalf("Erreur de lecture : %v", err)
	}

	part1 := countFreshIDsInAvailable(availableIDs, freshRanges) // Partie 1
	part2 := countAllFreshIDs(freshRanges)                       // Partie 2

	fmt.Println("Part 1:", part1)
	fmt.Println("Part 2:", part2)
}

/* ===========================================================
		PARTIE 1
	 Compte seulement les IDs présents et frais
   =========================================================== */

// Vérifie si un ID donné est dans au moins une plage fraîche
func isFresh(id int64, ranges []Range) bool {
	for _, r := range ranges {
		if id >= r.start && id <= r.end {
			return true
		}
	}
	return false
}

// Calcule combien d'IDs disponibles sont frais
func countFreshIDsInAvailable(ids []int64, ranges []Range) int {
	count := 0
	for _, id := range ids {
		if isFresh(id, ranges) {
			count++
		}
	}
	return count
}

/* ===========================================================
		PARTIE 2
	 Compte combien d'IDs sont frais au total
	 en fusionnant les intervalles
   =========================================================== */

// Fusionne les ranges qui se chevauchent
func mergeRanges(ranges []Range) []Range {

	// Trier les plages par le début
	sort.Slice(ranges, func(i, j int) bool {
		return ranges[i].start < ranges[j].start
	})

	merged := []Range{ranges[0]}

	for i := 1; i < len(ranges); i++ {
		last := &merged[len(merged)-1]
		curr := ranges[i]

		// Si la plage actuelle chevauche la précédente → on fusionne
		if curr.start <= last.end+1 {
			if curr.end > last.end {
				last.end = curr.end
			}
		} else {
			// Sinon nouvelle plage séparée
			merged = append(merged, curr)
		}
	}

	return merged
}

// Compte le nombre total d'IDs considérés comme frais
func countAllFreshIDs(ranges []Range) int64 {
	if len(ranges) == 0 {
		return 0
	}

	merged := mergeRanges(ranges)

	var total int64 = 0
	for _, r := range merged {
		total += (r.end - r.start + 1) // plage inclusive
	}

	return total
}
