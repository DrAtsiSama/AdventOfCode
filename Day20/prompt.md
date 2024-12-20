# --- Day 20: Race Condition ---

The Historians are quite pixelated again. This time, a massive, black building looms over you - you're right outside the CPU!

While The Historians get to work, a nearby program sees that you're idle and challenges you to a race. Apparently, you've arrived just in time for the frequently-held **Race Condition Festival**!

The race takes place on a particularly long and twisting code path; programs compete to see who can finish in the fewest picoseconds. The winner even gets their very own mutex!

---

## Part One

The map consists of:
- **Track**: Represented by `.`
- **Walls**: Represented by `#`
- **Start position**: Represented by `S`
- **End position**: Represented by `E`

For example:

```
############### #...#...#.....# #.#.#.#.#.###.# #S#...#.#.#...# #######.#.#.### #######.#.#...# #######.#.###.# ###..E#...#...# ###.#######.### #...###...#...# #.#####.#.###.# #.#...#.#.#...# #.#.#.#.#.#.### #...#...#...### ###############
```

Each move takes 1 picosecond. The goal is to go from `S` to `E` in the fewest picoseconds. 

To make the race more interesting, **cheating** is allowed:
- A program may disable collisions **once** for a limited duration.
- While cheating, it can pass through walls (`#`) as if they were track (`.`).
- The cheat must start and end on a normal track (`.`) to avoid disqualification.

Your task for Part One is to determine how many distinct cheats of **2 picoseconds** save at least **100 picoseconds** compared to the shortest path without cheating.

### Example

Given the map:

```
############### #...#...#.....# #.#.#.#.#.###.# #S#...#.#.#...# #######.#.#.### #######.#.#...# #######.#.###.# ###..E#...#...# ###.#######.### #...###...#...# #.#####.#.###.# #.#...#.#.#...# #.#.#.#.#.#.### #...#...#...### ###############
```

Cheats:
- Saves 12 picoseconds: `1` and `2` positions.
- Saves 20 picoseconds: `1` and `2` positions.

---

## Part Two

The rules for cheating have been updated:
- The cheat duration is extended to **20 picoseconds**.
- You must determine how many distinct cheats save at least **100 picoseconds** with the extended cheat duration.

For example, using the extended cheat duration:

```
############### #...#...#.....# #.#.#.#.#.###.# #S12..#.#.#...# ###3###.#.#.### ###4###.#.#...# ###5###.#.###.# ###6.E#...#...# ###.#######.### #...###...#...# #.#####.#.###.# #.#...#.#.#...# #.#.#.#.#.#.### #...#...#...### ###############
```

This cheat saves **76 picoseconds**.

---

## Input Format

The input consists of:
1. A rectangular grid where:
    - `S` marks the **start** position.
    - `E` marks the **end** position.
    - `.` represents **track**.
    - `#` represents **walls**.
2. The grid is terminated by a blank line.

### Example Input

```
############### #...#...#.....# #.#.#.#.#.###.# #S#...#.#.#...# #######.#.#.### #######.#.#...# #######.#.###.# ###..E#...#...# ###.#######.### #...###...#...# #.#####.#.###.# #.#...#.#.#...# #.#.#.#.#.#.### #...#...#...### ###############
```

---

## Output Format

1. **Part One**: The number of cheats saving at least **100 picoseconds** with a cheat duration of **2 picoseconds**.
2. **Part Two**: The number of cheats saving at least **100 picoseconds** with a cheat duration of **20 picoseconds**.

### Example Output

```
1404 1010981
```