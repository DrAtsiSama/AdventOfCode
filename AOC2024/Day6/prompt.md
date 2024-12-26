# Advent of Code - Day 6: Guard Gallivant

The Historians use their fancy device again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year 1518! It turns out that having direct access to history is very convenient for a group of historians.

You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single guard is patrolling this part of the lab.

Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?

---

## Part 1

You start by making a map (your puzzle input) of the situation. For example:

```
....#..... .........# .......... ..#....... .......#.. .......... .#..^..... ........#. #......... ......#...
```


The map shows:
- The guard's **starting position** (e.g., `^` for facing up).
- **Obstacles** such as crates, desks, or other objects marked with `#`.
- Empty spaces (`.`) where the guard can move freely.

The guard moves according to a strict patrol protocol:
1. **If there is something directly in front of the guard**, she turns 90° to the right.
2. **Otherwise**, she takes a step forward.

---

### Example Walkthrough

1. The guard begins at position `(6,4)`, facing up (`^`).
2. Moving up repeatedly until an obstacle:

```
....#..... ....^....# .......... ..#....... .......#.. .......... .#........ ........#. #......... ......#...
```

3. Turns right and moves right until another obstacle:


```
....#..... ........># .......... ..#....... .......#.. .......... .#........ ........#. #......... ......#...
```

4. Turns right again and moves downward:

```
....#..... .........# .......... ..#....... .......#.. .......... .#......v. ........#. #......... ......#...
```


This continues until the guard leaves the mapped area. By tracking the positions visited (including the starting position), you can determine the total number of **distinct positions** the guard visited before exiting.

---

### Example Output

Marking all visited positions with `X`, the map becomes:

```
....#..... ....XXXXX# ....X...X. ..#.X...X. ..XXXXX#X. ..X.X.X.X. .#XXXXXXX. .XXXXXXX#. #XXXXXXX.. ......#X..
```


The guard visits **41 distinct positions**.

---

### Task

Simulate the guard's patrol and determine:  
**How many distinct positions does the guard visit before leaving the mapped area?**

---

## Part 2

While The Historians work around the guard's patrol route, you discover a way to safely make the lab searchable: **place an obstacle** to trap the guard in a loop.

### New Goal

To minimize the risk of a time paradox, you must identify all possible positions to place a new obstacle (`O`) such that:
1. The guard **gets stuck in a loop**.
2. The new obstacle cannot be placed at the guard's starting position.

---

### Example Walkthrough

For the earlier example, there are 6 valid positions to place the obstacle:

1. Near the guard’s starting position:

```
....#..... ....+---+# ....|...|. ..#.|...|. ....|..#|. ....|...|. .#.O^---+. ........#. #......... ......#...
```


2. In the bottom-right quadrant:

```
....#..... ....+---+# ....|...|. ..#.|...|. ..+-+-+#|. ..|.|.|.|. .#+-^-+-+. ......O.#. #......... ......#...
```


3. Another valid placement in the bottom-right:

```
....#..... ....+---+# ....|...|. ..#.|...|. ..+-+-+#|. ..|.|.|.|. .#+-^-+-+. .+----+O#. #+----+... ......#...
```


4. Near the bottom-left:

```
....#..... ....+---+# ....|...|. ..#.|...|. ..+-+-+#|. ..|.|.|.|. .#+-^-+-+. ..|...|.#. #O+---+... ......#...
```


5. Slightly to the right:

```
....#..... ....+---+# ....|...|. ..#.|...|. ..+-+-+#|. ..|.|.|.|. .#+-^-+-+. ....|.|.#. #..O+-+... ......#...
```


6. Next to the solvent tank:

```
....#..... ....+---+# ....|...|. ..#.|...|. ..+-+-+#|. ..|.|.|.|. .#+-^-+-+. .+----++#. #+----++.. ......#O..
```


---

### Task

Determine how many valid positions can trap the guard in a loop.  
**How many positions can you choose for placing the new obstacle?**

---

### Example Output

For the given map:
- **Part 1:** 4883 distinct positions visited.
- **Part 2:** 1655 valid positions to place an obstacle.
