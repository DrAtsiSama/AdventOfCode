package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// --------------------------------------------------------
// STRUCTURE DU GRAPHE
// --------------------------------------------------------

type Graph map[string][]string

// --------------------------------------------------------
// DFS AVEC MÉMO : NOMBRE DE CHEMINS DE start → target
// --------------------------------------------------------

func countPaths(g Graph, start, target string) uint64 {
	memo := make(map[string]uint64)

	// DFS récursif avec mémoisation
	var dfs func(string) uint64
	dfs = func(node string) uint64 {

		// Si on atteint la sortie → 1 chemin
		if node == target {
			return 1
		}

		// Si déjà calculé → on renvoie le cache
		if v, ok := memo[node]; ok {
			return v
		}

		var total uint64
		// Explorer toutes les sorties du nœud
		for _, next := range g[node] {
			total += dfs(next)
		}

		memo[node] = total
		return total
	}

	return dfs(start)
}

// --------------------------------------------------------
// LECTURE DE L'INPUT ET CONSTRUCTION DU GRAPHE
// --------------------------------------------------------

func loadGraph(path string) Graph {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	g := make(Graph)
	sc := bufio.NewScanner(file)

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}

		// Format : "aaa: bbb ccc ddd"
		parts := strings.Split(line, ":")
		from := strings.TrimSpace(parts[0])
		toList := strings.Fields(strings.TrimSpace(parts[1]))

		g[from] = append(g[from], toList...)
	}

	return g
}

// --------------------------------------------------------
// PARTIE 2 : CHEMINS SVR → OUT PASSANT PAR FFT ET DAC
// --------------------------------------------------------

func countPathsThroughTwoNodes(g Graph, start, must1, must2, target string) uint64 {

	// Nombre de chemins depuis start jusqu'à must1
	fromStartTo1 := countPaths(g, start, must1)
	// Nombre de chemins depuis start jusqu'à must2
	fromStartTo2 := countPaths(g, start, must2)

	// Nombre de chemins must1 → target
	from1ToOut := countPaths(g, must1, target)
	// Nombre de chemins must2 → target
	from2ToOut := countPaths(g, must2, target)

	// Nombre de chemins must1 → must2
	paths1to2 := countPaths(g, must1, must2)
	// Nombre de chemins must2 → must1
	paths2to1 := countPaths(g, must2, must1)

	// Total des chemins contenant obligatoirement must1 ET must2 :
	//
	//   start → must1 → must2 → out
	// + start → must2 → must1 → out
	//
	// (on multiplie car ce sont des blocs indépendants)
	return fromStartTo1*uint64(paths1to2)*from2ToOut +
		fromStartTo2*uint64(paths2to1)*from1ToOut
}

// --------------------------------------------------------
// MAIN : PARTIE 1 + PARTIE 2
// --------------------------------------------------------

func main() {

	// Charger le graphe depuis l'input
	g := loadGraph("input.txt")

	// -------------------------
	// PARTIE 1 : chemins you → out
	// -------------------------

	part1 := countPaths(g, "you", "out")
	fmt.Println("Part 1 :", part1)

	// -------------------------
	// PARTIE 2 : chemins svr → out
	// nécessitant fft et dac
	// -------------------------

	part2 := countPathsThroughTwoNodes(g, "svr", "fft", "dac", "out")
	fmt.Println("Part 2 :", part2)
}
