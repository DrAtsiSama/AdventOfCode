package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

// best12 returns the lexicographically largest subsequence
// of length 12 from the digit-string s.
//
// The digits must stay in order; we only choose which 12 to keep.
func best12(s string) string {
	K := 12
	n := len(s)
	result := make([]byte, 0, K)

	// Position dans s où l’on peut commencer à chercher
	start := 0

	for needed := K; needed > 0; needed-- {
		// Il nous faut encore "needed" chiffres.
		// On peut chercher le prochain caractère entre:
		//   start ... n - needed
		maxPos := -1
		maxDigit := byte('0')

		limit := n - needed
		for i := start; i <= limit; i++ {
			if s[i] > maxDigit {
				maxDigit = s[i]
				maxPos = i
			}
		}

		// On ajoute le meilleur digit trouvé
		result = append(result, maxDigit)
		// Et on continue juste après lui
		start = maxPos + 1
	}

	return string(result)
}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatalf("Impossible d'ouvrir input.txt: %v", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	totalPart1 := 0
	totalPart2 := int64(0)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		// PARTIE 1 (2 digits)
		best2 := 0
		for i := 0; i < len(line)-1; i++ {
			for j := i + 1; j < len(line); j++ {
				x := int(line[i] - '0')
				y := int(line[j] - '0')
				val := x*10 + y
				if val > best2 {
					best2 = val
				}
			}
		}
		totalPart1 += best2

		// PARTIE 2 (12 digits)
		s12 := best12(line)

		// Convertit ce nombre de 12 chiffres en int64
		val12 := int64(0)
		for i := 0; i < len(s12); i++ {
			val12 = val12*10 + int64(s12[i]-'0')
		}
		totalPart2 += val12
	}

	if err := scanner.Err(); err != nil {
		log.Fatalf("Erreur de lecture: %v", err)
	}

	fmt.Println("Part 1:", totalPart1)
	fmt.Println("Part 2:", totalPart2)
}
