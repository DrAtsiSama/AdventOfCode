# Advent of Code - Day 7: Bridge Repair

The Historians take you to a familiar rope bridge over a river in the middle of a jungle. The Chief isn't on this side of the bridge, though; maybe he's on the other side?

When you go to cross the bridge, you notice a group of engineers trying to repair it.  
(Apparently, it breaks pretty frequently.) You won't be able to cross until it's fixed.

---

## Part 1

You ask how long it'll take; the engineers tell you that it only needs final calibrations, but some young elephants were playing nearby and stole all the operators from their calibration equations! They could finish the calibrations if only someone could determine which test values could possibly be produced by placing any combination of operators into their calibration equations.

### Example

Here are some example equations:

```
190: 10 19 3267: 81 40 27 83: 17 5 156: 15 6 7290: 6 8 6 15 161011: 16 10 13 192: 17 8 14 21037: 9 7 18 13 292: 11 6 16 20
```


Each line represents a single equation.  
The test value appears **before the colon**, and the list of numbers to combine with operators appears **after**.

---

### Rules

1. Operators are evaluated **left-to-right**, **not** based on precedence.
2. Numbers in the equations **cannot be rearranged**.
3. Available operators are:
   - Addition (`+`)
   - Multiplication (`*`)

---

### Solution Process

You need to:
1. Check which equations can be made true using any combination of `+` and `*`.
2. Add up the test values of the equations that can be made true.

---

### Final Output for Part 1

**Total Calibration Result:** `6083020304036`

---

## Part 2

The engineers seem concerned; the total calibration result you gave them is nowhere close to being within safety tolerances. Just then, you spot your mistake: some well-hidden elephants are holding a **third type of operator**.

---

### New Operator

The **concatenation operator (`||`)** combines two numbers by joining their digits. For example:
- `12 || 345` → `12345`.

---

### Updated Rules

1. The three operators now available are:
   - Addition (`+`)
   - Multiplication (`*`)
   - Concatenation (`||`)
2. As before:
   - Operators are evaluated **left-to-right**.
   - Numbers **cannot** be rearranged.

---

### Final Output for Part 2

**Total Calibration Result:** `59002246504791`

---

### Combined Results

| Part | Calibration Result |
|------|--------------------|
|  1   | `6083020304036`    |
|  2   | `59002246504791`   |

---
