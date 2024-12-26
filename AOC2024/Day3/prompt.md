# Advent of Code - Day 3: Mull It Over

"Our computers are having issues, so I have no idea if we have any Chief Historians in stock! You're welcome to check the warehouse, though," says the mildly flustered shopkeeper at the North Pole Toboggan Rental Shop. The Historians head out to take a look.

The shopkeeper turns to you.  
"Any chance you can see why our computers are having issues again?"

---

## Part 1

The computer appears to be trying to run a program, but its memory (your puzzle input) is corrupted. All of the instructions have been jumbled up!

It seems like the goal of the program is just to **multiply some numbers**. It does that with instructions like `mul(X,Y)`, where `X` and `Y` are each 1-3 digit numbers. For instance:
- `mul(44,46)` multiplies 44 by 46 to get a result of 2024.
- Similarly, `mul(123,4)` would multiply 123 by 4.

However, because the program's memory has been corrupted, there are also many invalid characters that should be ignored, even if they look like part of a `mul` instruction. Sequences like:
- `mul(4*`,
- `mul(6,9!`,
- `?(12,34)`, or
- `mul ( 2 , 4 )`

do **nothing**.

### Example

Consider the following section of corrupted memory:
```
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
```

Only the following sections are valid `mul` instructions:
- `mul(2,4)`
- `mul(32,64)`
- `mul(11,8)`
- `mul(8,5)`

Adding up the result of each instruction produces:
```
24 + 3264 + 118 + 85 = 161
```

### Task

Scan the corrupted memory for uncorrupted `mul` instructions.  
**What do you get if you add up all of the results of the multiplications?**

---

## Part 2

As you scan through the corrupted memory, you notice that some of the conditional statements are also still intact.  
If you handle some of the uncorrupted conditional statements in the program, you might be able to get an even more accurate result.

### New Instructions

There are two new instructions you'll need to handle:

1. **`do()`**: Enables future `mul` instructions.
2. **`don't()`**: Disables future `mul` instructions.

Only the most recent `do()` or `don't()` instruction applies. At the beginning of the program, `mul` instructions are enabled.

---

### Example

Consider the following corrupted memory:

xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))


Here’s how the instructions behave:
1. `mul(2,4)` → Enabled → Result: `2*4 = 8`.
2. `mul(3,7)` → Enabled → Result: `3*7 = 21`.
3. `don't()` → Disables `mul`.
4. `mul(5,5)` → **Disabled** → Ignored.
5. `mul(32,64)` → **Disabled** → Ignored.
6. `do()` → Enables `mul`.
7. `mul(11,8)` → Enabled → Result: `11*8 = 88`.
8. `mul(8,5)` → Enabled → Result: `8*5 = 40`.

The sum of the results is:
```
8 + 21 + 88 + 40 = 157
```

---

### Task

Handle the new instructions.  
**What do you get if you add up all of the results of just the enabled multiplications?**
