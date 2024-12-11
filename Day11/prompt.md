# Advent of Code - Day 11: Plutonian Pebbles

The ancient civilization on Pluto was known for its ability to manipulate spacetime. As **The Historians** explore their infinite corridors, you've come across a peculiar set of **physics-defying stones**.

At first glance, these stones appear ordinary: they are **arranged in a straight line**, each engraved with a **number**. But as you observe them, something strange happens.

Every time you blink, the stones **transform**:

- Some stones change their numbers.
- Others split into two stones.
- The order of the stones always remains **perfectly aligned**.

---

## Rules of Transformation

Every blink transforms the stones according to these rules:

1. **Rule 1**: If a stone has the number `0`, it is replaced by a stone with the number `1`.
2. **Rule 2**: If the stone's number has an **even number of digits**, it splits into two stones:
   - The left half of the digits form the first new stone.
   - The right half form the second stone.
   - **Example**: `1000` becomes stones `10` and `0`.
3. **Rule 3**: If none of the other rules apply, the stone's number is multiplied by `2024`.

---

## Example Transformations

### Given the stones engraved with the numbers:

```
0 1 10 99 999
```


### After 1 Blink:

1. The stone `0` becomes `1`.
2. The stone `1` is multiplied by `2024` to become `2024`.
3. The stone `10` splits into `1` and `0`.
4. The stone `99` splits into two stones `9` and `9`.
5. The stone `999` becomes `2021976` (`999 * 2024`).

**Result**:

```
1 2024 1 0 9 9 2021976
```


---

### Longer Example:

#### Initial Stones:

```
125 17
```


#### After 1 Blink:

```
253000 1 7
```


#### After 2 Blinks:

```
253 0 2024 14168
```

#### After 3 Blinks:
```
512072 1 20 24 28676032
```

#### After 6 Blinks:
```
2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2
```

After **25 blinks**, the stones become **55312** in total.

---

## Tasks

1. **Part 1**: How many stones will you have after blinking **25 times**?
2. **Part 2**: How many stones will you have after blinking **75 times**?

---

## Input

The initial arrangement of stones is provided in the file `input.txt`.

---
Outputs

For the given example input:

    Part 1: 199753
    Part 2: 239413123020116