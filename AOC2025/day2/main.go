package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

// isInvalidPart1 vérifie la règle de la partie 1 :
// l'ID est composé d'une séquence répétée exactement deux fois.
// Exemples : 55, 6464, 123123.
func isInvalidPart1(n int) bool {
	s := strconv.Itoa(n)

	// Doit avoir une longueur paire
	if len(s)%2 != 0 {
		return false
	}

	half := len(s) / 2
	left := s[:half]
	right := s[half:]

	return left == right
}

// isInvalidPart2 vérifie la règle de la partie 2 :
// l'ID est composé d'une séquence répétée au moins deux fois.
// Exemples : 12341234 (1234x2), 123123123 (123x3),
// 1212121212 (12x5), 1111111 (1x7).
func isInvalidPart2(n int) bool {
	s := strconv.Itoa(n)
	L := len(s)

	// On teste toutes les longueurs possibles de motif
	// d allant de 1 à L/2
	for d := 1; d <= L/2; d++ {
		if L%d != 0 {
			continue
		}
		repeats := L / d
		if repeats < 2 {
			continue
		}

		pattern := s[:d]
		ok := true
		for i := 1; i < repeats; i++ {
			start := i * d
			end := start + d
			if s[start:end] != pattern {
				ok = false
				break
			}
		}
		if ok {
			return true
		}
	}
	return false
}

func main() {
	// Lecture de input.txt (une seule ligne avec toutes les plages séparées par des virgules)
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

	// Découpe des plages "A-B" séparées par des virgules
	ranges := strings.Split(line, ",")

	totalPart1 := 0
	totalPart2 := 0

	for _, r := range ranges {
		r = strings.TrimSpace(r)
		if r == "" {
			continue
		}

		parts := strings.Split(r, "-")
		if len(parts) != 2 {
			log.Fatalf("Format de plage invalide: %s", r)
		}

		start, err1 := strconv.Atoi(parts[0])
		end, err2 := strconv.Atoi(parts[1])
		if err1 != nil || err2 != nil {
			log.Fatalf("Valeurs invalides dans la plage %s", r)
		}

		for id := start; id <= end; id++ {
			if isInvalidPart1(id) {
				totalPart1 += id
			}
			if isInvalidPart2(id) {
				totalPart2 += id
			}
		}
	}

	fmt.Println("Part 1:", totalPart1)
	fmt.Println("Part 2:", totalPart2)
}
