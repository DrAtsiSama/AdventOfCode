# 🎄 Advent of Code 2024 — Day 25: Code Chronicle 🎄

Out of ideas and time, The Historians decide to revisit the Chief Historian's office one last time, just in case he returned unnoticed.

Upon arrival, you are surprised to find the door locked! Someone is clearly inside, but your knocking gets no response. These doors are secured with sophisticated, virtual five-pin tumbler locks. You contact North Pole security for assistance.

Unfortunately, they've lost the lock and key mapping records. Instead, they send you schematics of **every lock and key** on the floor. The schematics are in a cryptic format, but they contain enough data for further investigation.

---

## 🧩 The Puzzle

The manufacturer of these locks explains: 

> "Our Virtual Five-Pin Tumbler locks are designed with simulated physical properties for marketing. You’ll need to test whether each key can fit into each lock."

### Lock and Key Properties:
- **Locks**: The schematics show pins extending **downwards** from the top row (`#`) to the bottom row (`.`).
- **Keys**: The schematics show their shapes extending **upwards** from the bottom row (`.`) to the top row (`#`).

#### Example Schematic:
Lock:

```
.#### .#### .#### .#.#. .#... .....
```
Key:
```
..... #.... #.... #...# #.#.# #.###
```

### Translating to Heights
Locks and keys can be represented as **heights** per column:
- Lock: `0,5,3,4,3`
- Key: `5,0,2,1,3`

> A lock and key fit together if **no column overlaps**. This occurs when the sum of their heights is within the lock's total height.

---

### 🛠 Example Analysis

Given these locks and keys:

Locks:
- `0,5,3,4,3`
- `1,2,0,5,3`

Keys:
- `5,0,2,1,3`
- `4,3,4,0,2`
- `3,0,2,0,1`

#### Results:
- Lock `0,5,3,4,3` and Key `5,0,2,1,3`: **Overlap** in column 5.
- Lock `0,5,3,4,3` and Key `4,3,4,0,2`: **Overlap** in column 2.
- Lock `0,5,3,4,3` and Key `3,0,2,0,1`: **Fit**!
- Lock `1,2,0,5,3` and Key `5,0,2,1,3`: **Overlap** in column 1.
- Lock `1,2,0,5,3` and Key `4,3,4,0,2`: **Fit**!
- Lock `1,2,0,5,3` and Key `3,0,2,0,1`: **Fit**!

**Total Unique Fits**: `3`

---

## 🎯 Part One: How Many Pairs Fit?

Write a program to count the total number of unique lock/key pairs that fit together.

---

## 🎉 Part Two: A Chronicle for Santa

After solving the lock problem, you finally enter the Chief Historian's office and wake him. He explains:

> "I've been working on a **high-priority chronicle for Santa** but fell asleep! There are still **50 places left to visit** before it's complete. Can you use the notes from our journey to finalize the chronicle?"

Your task is to consolidate **all visited locations** and **notes** into a single, complete chronicle for Santa. Then deliver it to him in time for tonight’s sleigh launch! 🎅
