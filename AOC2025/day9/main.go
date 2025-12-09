package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"

	"aoc2025/utils"
)

// ----------------------------
// Structures principales
// ----------------------------

// Un point de coordonnées sur le sol
type coord [2]int

// Le path complet (liste ordonnée des tuiles rouges)
type path []coord

// ----------------------------
// Parsing d'une ligne "x,y"
// ----------------------------
func parseCoord(line string) coord {
	var x coord
	nums := strings.Split(line, ",")
	x[0], _ = strconv.Atoi(nums[0])
	x[1], _ = strconv.Atoi(nums[1])
	return x
}

// ----------------------------
// Fonctions utilitaires simples
// ----------------------------
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// ----------------------------
// Calcul d'aire de rectangle entre deux points rouges
// ----------------------------
func (p path) getRectangleArea(i, j int) int {
	x, y := p[i], p[j]

	// Aire = largeur × hauteur
	// +1 car inclusif (tuile rouge comprise)
	return (utils.AbsInt(x[0]-y[0]) + 1) * (utils.AbsInt(x[1]-y[1]) + 1)
}

// Retourne un vecteur entre deux points
func delta(v, w coord) coord {
	return coord{v[0] - w[0], v[1] - w[1]}
}

// Produit vectoriel (permet orientation)
func cross(v, w coord) int {
	return v[0]*w[1] - v[1]*w[0]
}

// Produit scalaire (direction)
func dot(v, w coord) int {
	return v[0]*w[0] + v[1]*w[1]
}

// ----------------------------
// Vérifie si le chemin est dans le sens horaire
//
// Pourquoi ?
// → On doit avoir un polygone "fermé"
// → Et le sens doit être consitent
// ----------------------------
func (p path) isClockwise() bool {
	cnt := 0
	n := len(p)

	for i := 0; i < n-2; i++ {
		// On compare les angles formés par 3 points successifs
		d0 := delta(p[i], p[i+1])
		d1 := delta(p[i+2], p[i+1])

		// Si cross > 0 → rotation à gauche
		if cross(d0, d1) > 0 {
			cnt++
		} else {
			cnt--
		}
	}
	// Si majorité des pivots sont dans un sens
	return cnt > 0
}

// ----------------------------
// Sélectionne des couples valides pour PARTIE 2
//
// Le rectangle doit être situé ENTIEREMENT à l'intérieur
// des limites formées par le polygone
//
// Cette fonction renvoie une liste d’indices j
// qui forment un angle valide avec i.
// ----------------------------
func (p path) filterEndpoints(idx int) []int {
	n := len(p)

	// On doit avoir au moins 3 points derrière avant de fermer la forme
	if idx >= n-3 {
		return []int{}
	}

	// On considère les points voisins
	var x, y, z coord
	y = p[idx]

	if idx == 0 {
		x, z = p[n-1], p[1]
	} else {
		x, z = p[idx-1], p[idx+1]
	}

	// Vecteurs formant l’angle
	d0, d1 := delta(x, y), delta(z, y)

	var f func(coord) bool

	// Détermine orientation (pivot)
	if cross(d0, d1) > 0 {
		// ANGLE CONCAVE
		f = func(c coord) bool {
			dc := delta(c, y)
			// Doit être du même côté que d0 ET d1
			return dot(dc, d0) > 0 && dot(dc, d1) > 0
		}
	} else {
		// ANGLE CONVEXE
		f = func(c coord) bool {
			dc := delta(c, y)
			// Doit sortir de l’axe
			return dot(dc, d0) < 0 || dot(dc, d1) < 0
		}
	}

	ret := make([]int, 0)
	for offset, c := range p[idx+2:] {
		if f(c) {
			ret = append(ret, idx+2+offset)
		}
	}
	return ret
}

// ----------------------------
// Vérifie qu'un rectangle ne coupe PAS le chemin
//
// Logique :
// → On prend les coordonnées opposées
// → On définit les limites X et Y
// → On vérifie qu’aucun segment du polygone
//
//	n’est compris à l’intérieur de ce rectangle
//
// Si oui → rectangle interdit
// ----------------------------
func (p path) getValidArea(i, j int) int {
	bounds := [2][2]int{
		{min(p[i][0], p[j][0]), max(p[i][0], p[j][0])},
		{min(p[i][1], p[j][1]), max(p[i][1], p[j][1])},
	}

	for k := 0; k < len(p)-1; k++ {
		v, w := p[k], p[k+1]

		// Détermine orientation du segment polygone
		var cnstIdx, varIdx int
		if v[0] == w[0] {
			// segment horizontal
			cnstIdx, varIdx = 0, 1
		} else {
			cnstIdx, varIdx = 1, 0
		}

		// Conditions excluant les segments hors rectangle
		if v[cnstIdx] <= bounds[cnstIdx][0] || v[cnstIdx] >= bounds[cnstIdx][1] {
			continue
		}
		if max(v[varIdx], w[varIdx]) <= bounds[varIdx][0] {
			continue
		}
		if min(v[varIdx], w[varIdx]) >= bounds[varIdx][1] {
			continue
		}

		// Si on arrive ici → segment coupe rectangle
		return 0
	}

	return p.getRectangleArea(i, j)
}

// ===========================================================================================
//
//	MAIN
//
// ===========================================================================================
func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	n, _ := utils.LineCounter(file)
	scanner := bufio.NewScanner(file)

	p := make(path, 0, n+1)

	// Lecture du fichier
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		p = append(p, parseCoord(line))
	}

	// On ferme le chemin : premier point répété en dernier
	p = append(p, p[0])

	// Toujours orienter dans le même sens
	if !p.isClockwise() {
		slices.Reverse(p)
	}

	var resA, resB int

	// -------------------------------------------------
	// PARTIE 1 → rectangle seulement basé sur points rouges
	// -------------------------------------------------
	for i := 0; i < len(p)-2; i++ {
		for j := i + 1; j < len(p)-1; j++ {
			resA = max(resA, p.getRectangleArea(i, j))
		}
	}

	// -------------------------------------------------
	// PARTIE 2 → rectangle doit respecter le contour vert
	// -------------------------------------------------
	for i := 0; i < len(p)-1; i++ {
		for _, j := range p.filterEndpoints(i) {
			area := p.getValidArea(i, j)
			resB = max(resB, area)
		}
	}

	fmt.Println("Part 1:", resA)
	fmt.Println("Part 2:", resB)
}
