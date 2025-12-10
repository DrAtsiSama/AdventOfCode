package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type machine struct {
	target    int
	buttons   []int
	joltGoals []int
	size      int
}

// --------------------- PARSING ------------------------
func parseMachine(line string) machine {
	var ret machine

	// Parse pattern
	pattern := regexp.MustCompile(`(\.|\#)+`).FindString(line)
	for i, r := range pattern {
		if r == '#' {
			ret.target |= 1 << i
		}
	}

	ret.size = len(pattern)

	// Parse buttons
	btStrs := regexp.MustCompile(`\([\d,]*\)`).FindAllString(line, -1)
	for _, b := range btStrs {
		b = strings.Trim(b, "()")
		mask := 0
		for _, num := range strings.Split(b, ",") {
			if num == "" {
				continue
			}
			idx, _ := strconv.Atoi(num)
			mask |= 1 << idx
		}
		ret.buttons = append(ret.buttons, mask)
	}

	// Parse joltage goal
	jStr := regexp.MustCompile(`\{[\d,]+\}`).FindString(line)
	jStr = strings.Trim(jStr, "{}")
	if jStr != "" {
		for _, num := range strings.Split(jStr, ",") {
			x, _ := strconv.Atoi(num)
			ret.joltGoals = append(ret.joltGoals, x)
		}
	}

	return ret
}

// --------------------- PART 1 -------------------------
func (m machine) minPushesLights() int {
	dp := map[int]int{0: 0}
	states := []int{0}
	steps := 0

	for len(states) > 0 {
		next := []int{}
		steps++

		for _, cur := range states {
			for _, b := range m.buttons {
				nxt := cur ^ b
				if _, ok := dp[nxt]; !ok {
					dp[nxt] = steps
					next = append(next, nxt)
				}
			}
		}

		if v, ok := dp[m.target]; ok {
			return v
		}

		states = next
	}

	return -1
}

// --------------------- PART 2 -------------------------
func (m machine) minPushesJoltage(machineID int, totalMachines int) int {
	target := m.joltGoals
	nButtons := len(m.buttons)
	nCounters := len(target)

	// matrix[i counter][j button]
	matrix := make([][]int, nCounters)
	for i := 0; i < nCounters; i++ {
		matrix[i] = make([]int, nButtons)
	}

	for j, b := range m.buttons {
		for bit := 0; bit < nCounters; bit++ {
			if b&(1<<bit) != 0 {
				matrix[bit][j] = 1
			}
		}
	}

	type node struct {
		levels []int
		steps  int
	}

	start := node{levels: make([]int, nCounters), steps: 0}
	visited := map[string]bool{}
	queue := []node{start}

	serialize := func(v []int) string {
		s := ""
		for _, x := range v {
			s += fmt.Sprintf("%d.", x)
		}
		return s
	}

	visited[serialize(start.levels)] = true

	expansions := 0

	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]

		// Check match
		match := true
		for i := 0; i < nCounters; i++ {
			if cur.levels[i] != target[i] {
				match = false
				break
			}
		}
		if match {
			fmt.Printf(" → Machine %d/%d solved at %d presses (visited %d states)\n",
				machineID, totalMachines, cur.steps, expansions)
			return cur.steps
		}

		for b := 0; b < nButtons; b++ {
			next := make([]int, nCounters)
			copy(next, cur.levels)

			valid := true
			for i := 0; i < nCounters; i++ {
				next[i] += matrix[i][b]
				if next[i] > target[i] {
					valid = false
					break
				}
			}

			if !valid {
				continue
			}

			key := serialize(next)
			if !visited[key] {
				visited[key] = true
				queue = append(queue, node{levels: next, steps: cur.steps + 1})
				expansions++

				// Print progress every 4000 new states
				if expansions%4000 == 0 {
					fmt.Printf("   Machine %d/%d: searching... %d states\n",
						machineID, totalMachines, expansions)
				}
			}
		}
	}

	return -1
}

// -----------------------------------------------------
func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	machines := []machine{}
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line != "" {
			machines = append(machines, parseMachine(line))
		}
	}

	fmt.Printf("Total machines: %d\n", len(machines))

	totalA := 0
	totalB := 0

	for i, m := range machines {
		fmt.Printf("\nProcessing machine %d/%d...\n", i+1, len(machines))

		// Partie 1
		p1 := m.minPushesLights()
		totalA += p1
		fmt.Printf("Part 1 machine result: %d\n", p1)

		// Partie 2 avec tracking progress
		p2 := m.minPushesJoltage(i+1, len(machines))
		totalB += p2
	}

	fmt.Println("\n========= RESULTS =========")
	fmt.Println("PART 1:", totalA)
	fmt.Println("PART 2:", totalB)
}
