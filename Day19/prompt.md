# --- Day 19: Towel Arrangement Puzzles ---

After a relaxing day at the onsen, you’re invited back to help with some new arrangements of the towels. This time, the staff present you with a new challenge: arranging the towels in specific ways using the fewest number of towels possible.

Each towel at the onsen still has a unique pattern of colored stripes, and you can still request as many towels of any pattern as you need. The patterns are represented as sequences of colors, with each color denoted by a single letter: white (`w`), blue (`u`), black (`b`), red (`r`), or green (`g`).

The staff gives you two sets of inputs:

1. **Available towel patterns**: A list of all patterns you can use. For example:

```
r, wr, b, g, bwu, rb, gb, br
```

2. **Desired designs**: A list of towel arrangements you need to create. For example:

```
brwrr bggr gbbr rrbgbr ubwu bwurrg brgr bbrgwb
```


---

## Part One

For each desired design, your goal is to determine whether it can be created using the available towel patterns. A design can be created if it can be completely covered by overlapping one or more towel patterns in sequence.

For example:
- The design `brwrr` can be created using a `br` towel, a `wr` towel, and an `r` towel.
- The design `ubwu` cannot be created because there are no towels with a `u` stripe.

Your task is to count how many of the desired designs can be successfully created.

### Example

Given the inputs:

#### Available towel patterns:

```
r, wr, b, g, bwu, rb, gb, br
```

#### Desired designs:

```
brwrr bggr gbbr rrbgbr ubwu bwurrg brgr bbrgwb
```


The designs that can be created are:
- `brwrr`
- `bggr`
- `gbbr`
- `rrbgbr`
- `bwurrg`
- `brgr`

This gives a total of **6** designs that can be created.

**Output:**

```
6
```

---

## Part Two

The onsen staff has a more ambitious request: they want you to calculate all the different ways each desired design can be created using the available towel patterns.

For example:
- The design `brwrr` can be created in two different ways:
  1. `b` + `r` + `wr` + `r`
  2. `br` + `wr` + `r`
- The design `bggr` has only one possible arrangement: `b` + `g` + `g` + `r`.

If a design cannot be created, it contributes `0` to the total.

Your task is to find the total number of arrangements for all possible designs and sum them up.

### Example

Given the inputs:

#### Available towel patterns:

```
r, wr, b, g, bwu, rb, gb, br
```

#### Desired designs:

```
brwrr bggr gbbr rrbgbr ubwu bwurrg brgr bbrgwb
```


The possible arrangements are:
- `brwrr`: 2 ways
- `bggr`: 1 way
- `gbbr`: 4 ways
- `rrbgbr`: 6 ways
- `ubwu`: 0 ways
- `bwurrg`: 1 way
- `brgr`: 2 ways
- `bbrgwb`: 0 ways

The total number of arrangements is:

```
2 + 1 + 4 + 6 + 0 + 1 + 2 + 0 = 16
```

**Output:**

```
16
```

---

## Input Format

1. **Available towel patterns**: A comma-separated list of patterns on the first line.
2. A blank line.
3. **Desired designs**: One design per line.

### Example Input:
```
r, wr, b, g, bwu, rb, gb, br

brwrr bggr gbbr rrbgbr ubwu bwurrg brgr bbrgwb
```

---

## Output Format

1. **Part One**: An integer representing the number of designs that can be created.
2. **Part Two**: An integer representing the total number of arrangements for all designs.

### Example Output:
```
6 16
```

