# Advent of Code - Day 5: Print Queue

Satisfied with their search on Ceres, the squadron of scholars suggests subsequently scanning the stationery stacks of sub-basement 17.

The North Pole printing department is busier than ever this close to Christmas, and while The Historians continue their search of this historically significant facility, an Elf operating a very familiar printer beckons you over.

The Elf must recognize you, because they waste no time explaining that the new sleigh launch safety manual updates won't print correctly. Failure to update the safety manuals would be dire indeed, so you offer your services.

---

## Problem Statement

Safety protocols clearly indicate that new pages for the safety manuals must be printed in a **very specific order**. The notation `X|Y` means that if both page number `X` and page number `Y` are to be produced as part of an update, page number `X` must be printed **before** page number `Y`.

The Elf has provided you with:
1. **Page ordering rules**.
2. **Pages required for each update**.

Your task is to determine:
1. Which updates are already in the correct order.
2. The sum of the **middle page numbers** for those correctly-ordered updates.

---

## Example Input

### Rules
```
47|53 97|13 97|61 97|47 75|29 61|13 75|53 29|13 97|29 53|29 61|53 97|53 61|29 47|13 75|47 97|75 47|61 75|61 47|29 75|13 53|13
```

### Updates

```
75,47,61,53,29 97,61,53,29,13 75,29,13 75,97,47,61,53 61,13,29 97,13,75,29,47
```


---

## Example Explanation

### Update Analysis

- **Update 1**: `75,47,61,53,29`  
  Correctly ordered:
  - `75` comes before all other pages (`75|47`, `75|61`, etc.).
  - `47` comes before `61`, `53`, and `29`.
  - Other rules are respected.

- **Update 2**: `97,61,53,29,13`  
  Correctly ordered.

- **Update 3**: `75,29,13`  
  Correctly ordered.

- **Update 4**: `75,97,47,61,53`  
  Incorrectly ordered:
  - Violates `97|75`.

- **Update 5**: `61,13,29`  
  Incorrectly ordered:
  - Violates `29|13`.

- **Update 6**: `97,13,75,29,47`  
  Incorrectly ordered:
  - Violates multiple rules.

---

### Middle Pages of Correctly Ordered Updates

1. **Update 1**: Middle page is `61`.
2. **Update 2**: Middle page is `53`.
3. **Update 3**: Middle page is `29`.

**Sum of middle pages**: `61 + 53 + 29 = 143`.

---

## Tasks

### Part 1

Identify which updates are already in the correct order based on the rules.

### Part 2

Find the **middle page number** of each correctly-ordered update and calculate their sum.

---

## Notes

1. Ignore rules involving page numbers that are **not part of the update**.
2. An update is valid if it satisfies **all applicable rules**.

---

## Visual Example

### Rules Representation
Each `X|Y` rule specifies that `X` must be printed **before** `Y`. For example:

```
47|53 → 47 must be before 53 97|13 → 97 must be before 13
```


### Update Example
Given `75,47,61,53,29`:
- Correct Order: `75 → 47 → 61 → 53 → 29`
- Violations: None.

Given `75,97,47,61,53`:
- Violates: `97|75`.

---

## Output

For the given example:
- Correctly-ordered updates: `75,47,61,53,29`, `97,61,53,29,13`, `75,29,13`
- **Middle page numbers**: `61`, `53`, `29`
- **Sum**: `143`

