package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

// Représente un problème (un bloc de colonnes entre deux colonnes vides)
type Problem struct {
	colStart int
	colEnd   int
	op       byte // '*' ou '+'
}

func main() {
	f, err := os.Open("input.txt")
	if err != nil {
		log.Fatalf("Impossible d'ouvrir input.txt: %v", err)
	}
	defer f.Close()

	sc := bufio.NewScanner(f)
	var lines []string
	for sc.Scan() {
		// On NE TRIM PAS les espaces : on garde tout pour préserver les colonnes !
		lines = append(lines, sc.Text())
	}
	if err := sc.Err(); err != nil {
		log.Fatalf("Erreur de lecture: %v", err)
	}

	if len(lines) < 2 {
		log.Fatalf("Input insuffisant : %d lignes trouvées", len(lines))
	}

	// La dernière ligne contient les opérateurs
	h := len(lines)
	opRow := h - 1

	// On rend toutes les lignes de la même largeur en complétant avec des espaces à droite
	maxW := 0
	for _, l := range lines {
		if len(l) > maxW {
			maxW = len(l)
		}
	}
	for i, l := range lines {
		if len(l) < maxW {
			lines[i] = l + strings.Repeat(" ", maxW-len(l))
		}
	}
	w := maxW

	// Fonction utilitaire : savoir si une colonne est entièrement vide (que des spaces)
	isEmptyCol := func(col int) bool {
		for row := 0; row < h; row++ {
			if lines[row][col] != ' ' {
				return false
			}
		}
		return true
	}

	// 1) Détection des problèmes : blocs de colonnes séparés par des colonnes entièrement vides
	var problems []Problem
	col := 0
	for col < w {
		// Sauter les colonnes entièrement vides
		if isEmptyCol(col) {
			col++
			continue
		}
		// Début d'un problème
		start := col
		for col < w && !isEmptyCol(col) {
			col++
		}
		end := col - 1

		// Trouver l'opérateur dans la dernière ligne, quelque part entre start et end
		var op byte = 0
		for c := start; c <= end; c++ {
			ch := lines[opRow][c]
			if ch == '*' || ch == '+' {
				op = ch
				break
			}
		}
		if op == 0 {
			log.Fatalf("Aucun opérateur trouvé dans le bloc de colonnes [%d,%d]", start, end)
		}

		problems = append(problems, Problem{
			colStart: start,
			colEnd:   end,
			op:       op,
		})
	}

	// ----------------------
	// PARTIE 1
	// ----------------------
	//
	// Pour chaque problème :
	//   - Pour chaque ligne (sauf la dernière, qui contient les opérateurs),
	//     on lit la sous-chaîne [colStart:colEnd+1], on enlève les spaces :
	//         => si non vide, c'est un nombre de ce problème.
	//   - On applique l'opérateur op sur tous ces nombres.
	//   - On ajoute le résultat au total.

	var totalP1 int64 = 0

	for _, p := range problems {
		var nums []int64
		for row := 0; row < opRow; row++ {
			segment := lines[row][p.colStart : p.colEnd+1]
			segment = strings.ReplaceAll(segment, " ", "")
			if segment == "" {
				continue
			}
			n, err := strconv.ParseInt(segment, 10, 64)
			if err != nil {
				log.Fatalf("Erreur conversion nombre (Part 1) %q: %v", segment, err)
			}
			nums = append(nums, n)
		}

		if len(nums) == 0 {
			log.Fatalf("Aucun nombre trouvé pour le problème [%d,%d] (Part 1)", p.colStart, p.colEnd)
		}

		var res int64
		if p.op == '+' {
			var sum int64 = 0
			for _, n := range nums {
				sum += n
			}
			res = sum
		} else { // '*'
			prod := int64(1)
			for _, n := range nums {
				prod *= n
			}
			res = prod
		}

		totalP1 += res
	}

	// ----------------------
	// PARTIE 2
	// ----------------------
	//
	// Cephalopod math : "Chaque nombre est donné dans sa propre colonne,
	// le chiffre de poids fort en haut, le chiffre de poids faible en bas."
	//
	// Donc, pour chaque problème :
	//   - On parcourt chaque colonne du bloc (colStart..colEnd).
	//   - Pour cette colonne, on lit les caractères des lignes 0..opRow-1 :
	//         on garde uniquement les digits (non ' '), qu'on concatène.
	//         => si la chaîne est non vide, c'est un nombre.
	//   - On applique l'opérateur sur tous ces nombres.
	//   - On ajoute le résultat au total Part 2.
	//
	// Le fait que les problèmes soient "lus de droite à gauche" ne change
	// pas le résultat des multiplications / additions car elles sont commutatives.

	var totalP2 int64 = 0

	for _, p := range problems {
		var nums []int64
		for col := p.colStart; col <= p.colEnd; col++ {
			var sb strings.Builder
			for row := 0; row < opRow; row++ {
				ch := lines[row][col]
				if ch != ' ' {
					sb.WriteByte(ch)
				}
			}
			s := sb.String()
			if s == "" {
				continue
			}
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				log.Fatalf("Erreur conversion nombre (Part 2) %q: %v", s, err)
			}
			nums = append(nums, n)
		}

		if len(nums) == 0 {
			log.Fatalf("Aucun nombre trouvé pour le problème [%d,%d] (Part 2)", p.colStart, p.colEnd)
		}

		var res int64
		if p.op == '+' {
			var sum int64 = 0
			for _, n := range nums {
				sum += n
			}
			res = sum
		} else { // '*'
			prod := int64(1)
			for _, n := range nums {
				prod *= n
			}
			res = prod
		}

		totalP2 += res
	}

	fmt.Println("Part 1:", totalP1)
	fmt.Println("Part 2:", totalP2)
}
