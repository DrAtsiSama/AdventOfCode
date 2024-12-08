# Advent of Code - Day 8: Resonant Collinearity

You find yourselves on the roof of a top-secret Easter Bunny installation.

While The Historians do their thing, you take a look at the familiar huge antenna. Much to your surprise, it seems to have been reconfigured to emit a signal that makes people 0.1% more likely to buy Easter Bunny brand Imitation Mediocre Chocolate as a Christmas gift! Unthinkable!

Scanning across the city, you find that there are actually many such antennas. Each antenna is tuned to a specific frequency indicated by a single lowercase letter, uppercase letter, or digit. You create a map (your puzzle input) of these antennas. For example:

```
............ ........0... .....0...... .......0.... ....0....... ......A..... ............ ............ ........A... .........A.. ............ ............
```


---

## Part 1

The signal only applies its nefarious effect at specific **antinodes** based on the resonant frequencies of the antennas. 

An **antinode** occurs at any point that is perfectly in line with two antennas of the same frequency - but only when one of the antennas is twice as far away as the other. This means that for any pair of antennas with the same frequency, there are two antinodes, one on either side of them.

For example, with two antennas of the same frequency (`a`), their antinodes are marked with `#`:

```
.......... ...#...... .......... ....a..... .......... .....a.... .......... ......#... .......... ..........
```


Adding a third antenna with the same frequency creates several more antinodes. It would ideally add four new antinodes, but some may fall outside the map bounds:

```
.......... ...#...... #......... ....a..... ........a. .....a.... ..#....... ......#... .......... ..........
```


Antennas of **different frequencies** (e.g., `A` and `a`) do not interact. However, antinodes can occur at locations where antennas are positioned.

---

### Example Walkthrough

Given the map of antennas:

```
............ ........0... .....0...... .......0.... ....0....... ......A..... ............ ............ ........A... .........A.. ............ ............
```


The first example has antennas with two distinct frequencies (`0` and `A`). The resulting antinodes look like this, plus an antinode overlapping the topmost `A`-frequency antenna:

```
......#....# ...#....0... ....#0....#. ..#....0.... ....0....#.. .#....A..... ...#........ #......#.... ........A... .........A.. ..........#. ..........#.
```


In this case:
- **14 unique locations** within the bounds of the map contain an antinode.

---

### Task

Calculate the impact of the signal.  
**How many unique locations within the bounds of the map contain an antinode?**

---

## Part 2

With the antinode map in hand, you investigate further. It turns out that the Easter Bunny's signal could be neutralized if you strategically disable antennas to eliminate certain frequencies.

Your next task is to:
- Identify which antennas contribute the most to the total number of antinodes.
- Determine the minimum number of antennas you could disable to bring the number of unique antinodes below a given threshold.

---

### Example Walkthrough

If the threshold is **10 unique antinode locations**, disabling certain antennas would reduce the total count. Consider the following example map:

Initial map:

```
......#....# ...#....0... ....#0....#. ..#....0.... ....0....#.. .#....A..... ...#........ #......#.... ........A... .........A.. ..........#. ..........#.
```


By disabling the middle `0` antenna, the map becomes:

```
......#..... ...#........ ....#......# ..#......... ...........# .#....A..... ...#........ #......#.... ........A... .........A.. ..........#. ..........#.
```


In this case:
- The unique antinodes drop to **9 locations**.

---

### Task

Determine:
1. **Part 1:** The total number of unique antinode locations within the map bounds.
2. **Part 2:** The minimum number of antennas you could disable to reduce the number of unique antinodes below a given threshold.

---

### Example Output

For the provided map:
- **Part 1:** 394 unique antinodes.
- **Part 2:** Minimum 1277 antennas need to be disabled to achieve the desired reduction.
