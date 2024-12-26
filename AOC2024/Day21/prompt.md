# Advent of Code 2024 - Day 21: Keypad Conundrum

## Problem Description

Santa's Reindeer-class starship has encountered a **keypad conundrum**! To unlock a locked door, specific codes must be typed into a **numeric keypad**, but due to the ship's hazards, only **robots** can be used to press the buttons.

### Numeric Keypad Layout
The numeric keypad is arranged as follows:

```
+---+---+---+ | 7 | 8 | 9 | +---+---+---+ | 4 | 5 | 6 | +---+---+---+ | 1 | 2 | 3 | +---+---+---+ | 0 | A | +---+---+
```

The robot tasked with typing on this keypad uses a **directional keypad** for control. Its layout is:

+---+---+
| ^ | A |
```
+---+---+---+ | < | v | > | +---+---+---+
```

The robot begins by aiming at the `A` button. It moves the robotic arm using `<` (left), `>` (right), `^` (up), and `v` (down). Pressing `A` causes the robot to push the button it is currently aimed at.

---

## Example

To type the code `029A` on the numeric keypad, one possible sequence of button presses on the directional keypad is:

```
<A^A>^^AvvvA
```

Each part of the sequence corresponds to moving the arm to the correct button and pressing `A`.

---

## Problem Mechanics

### Keypad Chain
To press buttons on the **numeric keypad**, the robots rely on **chains of directional keypads**:
- **Your directional keypad** controls a **robot** typing on another directional keypad.
- That second robot controls another robot on another directional keypad.
- This chain continues until the robot typing directly on the numeric keypad is reached.

### Constraints
- Robots must never aim at gaps in the keypad layout; doing so causes them to panic.
- Each robot starts aimed at the `A` button.

---

## Part One

**Task**: For 5 door codes, determine the shortest sequence of button presses required to type each code. Compute the **complexity** of each code as:

```
complexity = (length of the shortest sequence) * (numeric part of the code)
```

For example:
- Code `029A` has a shortest sequence of 68 button presses.
- The numeric part of `029A` is `29`.
- Complexity: `68 * 29 = 1972`.

The sum of complexities for all five codes is the answer to Part One.

---

## Part Two

**Task**: Same as Part One, but this time:
- There are **25 directional keypads** in the chain.
- The codes remain the same.

The increased complexity arises from the extended chain of robots.

---

## Example Input and Output

### Input Codes:

```
029A 980A 179A 456A 379A
```

### Example Complexity Calculation:

For the code `029A`:
- Shortest sequence length: `68`
- Numeric part: `29`
- Complexity: `68 * 29 = 1972`

Sum of complexities for all codes in Part One (example): `126384`.

---

## Results

- **Part One Answer**: `184716`
- **Part Two Answer**: `229403562787554`

---

## Visual Explanation

### Keypads:
1. **Numeric Keypad**:
    ```
    +---+---+---+
    | 7 | 8 | 9 |
    +---+---+---+
    | 4 | 5 | 6 |
    +---+---+---+
    | 1 | 2 | 3 |
    +---+---+---+
        | 0 | A |
        +---+---+
    ```

2. **Directional Keypad**:
    ```
        +---+---+
        | ^ | A |
    +---+---+---+
    | < | v | > |
    +---+---+---+
    ```

### Sequence Chain (Example for `029A`):
```
Your keypad: <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A Robot 1 keypad: v<<A>>^A<A>AvA<^AA>A<vAAA>^A Robot 2 keypad: <A^A>^^AvvvA Numeric keypad: 029A
```
