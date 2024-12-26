# Advent of Code - Day 10: Hoof It

The reindeer leads you to a Lava Production Facility on a floating island in the sky. As you begin exploring the industrial complex, a reindeer wearing a hard hat approaches and nudges your leg. Curious, you glance down to see that it's carrying a charred hiking guide and a blank topographic map.

The map needs help! Lava has scorched most of the book, but a few useful scraps remain. It's up to you to reconstruct the map and calculate the scores of the hiking trails. Can you help the reindeer?

---

## Part 1: Scoring Trailheads

The topographic map shows heights ranging from `0` (lowest) to `9` (highest). The goal is to find all possible hiking trails starting at trailheads (positions with height `0`) and ending at positions with height `9`. A hiking trail:
- Always increases by exactly `1` height at each step.
- Moves only up, down, left, or right.
- Never moves diagonally.

### Example Input
Here’s an example of a topographic map:

```
0123 1234 8765 9876
```


This map contains a single trailhead at the top-left (`0`), with one hiking trail that reaches a `9` at the bottom-left.

---

### Example Walkthrough

#### Simple Trailhead:
Consider the following map:

```
...0... ...1... ...2... 6543456 7.....7 8.....8 9.....9
```


- Starting at the trailhead (`0`):
  - One path moves straight down to the `9` at the bottom-left.
  - Another path moves right to the `9` at the bottom-right.
- **Score for this trailhead:** `2`.

#### Multiple Trailheads:
For this map:

```
10..9.. 2...8.. 3...7.. 4567654 ...8..3 ...9..2 .....01
```


- The trailhead at `(0,0)` has a score of `1` (it reaches a single `9` at the bottom-left).
- The trailhead at `(6,6)` has a score of `2` (it reaches two `9`s).
- **Sum of scores:** `3`.

---

### Task

Given the larger example:

```
89010123 78121874 87430965 96549874 45678903 32019012 01329801 10456732
```


- Find all trailheads.
- Calculate the sum of scores for all trailheads.

---

## Part 2: Rating Trailheads

The reindeer returns with a slightly-charred note that explains how to calculate a **trailhead rating**:
- A trailhead’s **rating** is the number of distinct hiking trails that start at the trailhead.

#### Example:
For this map:

```
.....0. ..4321. ..5..2. ..6543. ..7..4. ..8765. ..9....
```


There are **three distinct hiking trails**:
1. Straight down to the bottom-left `9`.
2. Down and right to the bottom-right `9`.
3. Down, left, and right to the bottom-right `9`.

- **Rating:** `3`.

---

### Example Walkthrough

#### A Single Trailhead:

```
..90..9 ...1.98 ...2..7 6543456 765.987 876.... 987....
```


- This trailhead has `13` distinct trails.

#### A Complex Map:

```
012345 123456 234567 345678 4.6789 56789.
```


- This map has `227` distinct trails.

---

### Task

Using the same map from Part 1:

```
89010123 78121874 87430965 96549874 45678903 32019012 01329801 10456732
```


- Calculate the sum of ratings for all trailheads.

---

## Visualization

Here’s a visual example for a small map:

### Input:

```
...0... ...1... ...2... 6543456 7.....7 8.....8 9.....9
```


### Output:
Each trail is marked:

```
...X... ...X... ...X... 6543456 7XXXXX7 8XXXXX8 9XXXXX9
```


The trailhead’s score is `2` (both `9`s are reachable).

### Larger Example:
For the larger map:

```
89010123 78121874 87430965 96549874 45678903 32019012 01329801 10456732
```


The output would mark all trailheads and paths, with scores and ratings displayed separately.

---

## Conclusion

By finding both the **score** (number of reachable `9`s) and the **rating** (number of distinct trails), you’ll help the reindeer reconstruct the map and plan the perfect hiking trails!

**Your Final Results**:
- **Part 1 Score Total:** `688`
- **Part 2 Rating Total:** `1459`