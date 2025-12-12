package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Shape struct {
	cells int // nombre de cases '#' dans la forme (aire)
}

// ----------------------------
//   PARSE D'UNE FORME
// ----------------------------

// parseShape lit une forme comme :
// 0:
// .##
// ##.
// ###
// et retourne la quantité de '#' qu'elle contient
func parseShape(lines []string) Shape {
	count := 0
	for _, line := range lines {
		for _, c := range line {
			if c == '#' {
				count++
			}
		}
	}
	return Shape{cells: count}
}

// ----------------------------
//
//	MAIN
//
// ----------------------------
func main() {

	file, _ := os.Open("input.txt")
	defer file.Close()

	sc := bufio.NewScanner(file)

	shapes := []Shape{}
	regionsOK := 0

	// ----------------------------
	//   1) Lecture des formes
	// ----------------------------
	for {
		if !sc.Scan() {
			break
		}
		line := strings.TrimSpace(sc.Text())

		// si la ligne est vide → sauter
		if line == "" {
			continue
		}

		// fin des formes : si la ligne contient "x" (ex: "47x48:") on sort
		if strings.Contains(line, "x") {
			// cette ligne appartient à la section des régions → on va la traiter après
			processRegionLine(line, sc, shapes, &regionsOK)
			break
		}

		// on est en train de lire une forme
		// "0:" → identifiant, on ignore
		if strings.HasSuffix(line, ":") {
			shapeLines := []string{}
			// lire toutes les lignes suivantes qui appartiennent à la forme
			for sc.Scan() {
				next := strings.TrimSpace(sc.Text())
				if next == "" {
					break
				}
				shapeLines = append(shapeLines, next)
			}
			shapes = append(shapes, parseShape(shapeLines))
		}
	}

	// ----------------------------
	//   2) Lecture du reste des régions
	// ----------------------------
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		if strings.Contains(line, "x") {
			processRegionLine(line, sc, shapes, &regionsOK)
		}
	}

	// ----------------------------
	//   3) Résultat final
	// ----------------------------
	fmt.Println("Nombre de régions qui peuvent contenir tous les cadeaux :", regionsOK)
}

// ----------------------------
//
//	TRAITEMENT D'UNE RÉGION
//
// ----------------------------
func processRegionLine(line string, sc *bufio.Scanner, shapes []Shape, regionsOK *int) {

	// Exemple d'une ligne région :
	// 47x48: 59 59 54 61 53 61

	parts := strings.Split(line, ":")
	sizeStr := strings.TrimSpace(parts[0])
	countStr := strings.TrimSpace(parts[1])

	// taille
	xy := strings.Split(sizeStr, "x")
	W, _ := strconv.Atoi(xy[0])
	H, _ := strconv.Atoi(xy[1])

	regionArea := W * H

	// quantités de chaque forme
	countParts := strings.Fields(countStr)
	totalShapesArea := 0

	for i, c := range countParts {
		qty, _ := strconv.Atoi(c)
		totalShapesArea += qty * shapes[i].cells
	}

	// Condition AoC Day 12 :
	// la somme des aires des cadeaux doit tenir dans la région
	if totalShapesArea <= regionArea {
		*regionsOK++
	}
}
