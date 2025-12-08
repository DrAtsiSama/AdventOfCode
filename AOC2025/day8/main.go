package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"sort"
)

type Point struct {
	x, y, z float64
}

type Edge struct {
	a, b int
	dist float64
}

type UF struct {
	parent []int
	size   []int
}

func NewUF(n int) *UF {
	p := make([]int, n)
	s := make([]int, n)
	for i := range p {
		p[i] = i
		s[i] = 1
	}
	return &UF{p, s}
}

func (uf *UF) find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.find(uf.parent[x])
	}
	return uf.parent[x]
}

// return true if merged
func (uf *UF) union(a, b int) bool {
	ra := uf.find(a)
	rb := uf.find(b)
	if ra == rb {
		return false
	}
	if uf.size[ra] < uf.size[rb] {
		uf.parent[ra] = rb
		uf.size[rb] += uf.size[ra]
	} else {
		uf.parent[rb] = ra
		uf.size[ra] += uf.size[rb]
	}
	return true
}

func dist(a, b Point) float64 {
	return math.Sqrt(
		(a.x-b.x)*(a.x-b.x) +
			(a.y-b.y)*(a.y-b.y) +
			(a.z-b.z)*(a.z-b.z),
	)
}

func main() {
	f, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	var points []Point

	sc := bufio.NewScanner(f)
	for sc.Scan() {
		var X, Y, Z float64
		_, err := fmt.Sscanf(sc.Text(), "%f,%f,%f", &X, &Y, &Z)
		if err != nil {
			log.Fatal(err)
		}
		points = append(points, Point{X, Y, Z})
	}
	if err := sc.Err(); err != nil {
		log.Fatal(err)
	}

	n := len(points)
	fmt.Println("Nombre de points:", n)

	// build all edges
	var edges []Edge
	edges = make([]Edge, 0, n*n)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			edges = append(edges, Edge{
				a:    i,
				b:    j,
				dist: dist(points[i], points[j]),
			})
		}
	}

	// sort ascending
	sort.Slice(edges, func(i, j int) bool {
		return edges[i].dist < edges[j].dist
	})

	// PART 1 — 1000 first merges
	uf1 := NewUF(n)
	connected := 0
	for k := 0; k < 1000; k++ {
		if uf1.union(edges[k].a, edges[k].b) {
			connected++
		}
	}

	// Count sizes
	compSize := make(map[int]int)
	for i := 0; i < n; i++ {
		root := uf1.find(i)
		compSize[root]++
	}

	var sizes []int
	for _, c := range compSize {
		sizes = append(sizes, c)
	}
	sort.Slice(sizes, func(i, j int) bool { return sizes[i] > sizes[j] })

	part1Result := sizes[0] * sizes[1] * sizes[2]

	fmt.Println("Part 1:", part1Result)

	// PART 2 — Continue union until single group
	uf2 := NewUF(n)
	groups := n
	var lastA, lastB int

	for _, e := range edges {
		if uf2.union(e.a, e.b) {
			groups--
			if groups == 1 {
				lastA = e.a
				lastB = e.b
				break
			}
		}
	}

	// compute expected output
	x1 := int(points[lastA].x)
	x2 := int(points[lastB].x)

	part2Result := x1 * x2

	fmt.Println("Part 2:", part2Result)
}
