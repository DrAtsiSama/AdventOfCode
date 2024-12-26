# Advent of Code - Day 12: Garden Groups

The Elves' vast garden stretches beyond what the eye can see, and the task at hand seems daunting. While some Historians search for the Chief Gardener, others are enlisted to assist the Elves in understanding their gardens' intricate layout.

You are handed a **map** of the garden, represented as a grid. Each cell of the grid contains a letter, representing the type of plant that grows in that plot. The Elves want to **group plots of the same type** into regions and determine how to fence them. 

Regions are defined as clusters of adjacent garden plots with the same plant type. Adjacent plots share a side (horizontal or vertical). Your task is to determine the **cost of fencing** all the regions.

---

## Rules for Fence Calculation

1. **Region Area**:
   - The area of a region is the number of plots in that region.

2. **Region Perimeter**:
   - The perimeter of a region is the total number of exposed sides of plots in the region. A side is considered "exposed" if it does not touch another plot in the same region.

3. **Fence Cost**:
   - The cost of fencing a region is calculated by multiplying the **area** of the region by its **perimeter**.

4. **Total Fence Cost**:
   - The total cost of fencing is the sum of the costs for all regions in the garden.

---

## Example 1

Given the following garden map:

```
AAAA BBCD BBCC EEEC
```


#### Regions:
- Region `A`: Area = 4, Perimeter = 10 → Cost = \(4 \times 10 = 40\)
- Region `B`: Area = 4, Perimeter = 8 → Cost = \(4 \times 8 = 32\)
- Region `C`: Area = 4, Perimeter = 10 → Cost = \(4 \times 10 = 40\)
- Region `D`: Area = 1, Perimeter = 4 → Cost = \(1 \times 4 = 4\)
- Region `E`: Area = 3, Perimeter = 8 → Cost = \(3 \times 8 = 24\)

**Total Fence Cost**: \(40 + 32 + 40 + 4 + 24 = 140\).

---

## Example 2

For the following map:

```
OOOOO OXOXO OOOOO OXOXO OOOOO
```


#### Regions:
- Region `O`: Area = 21, Perimeter = 36 → Cost = \(21 \times 36 = 756\)
- Region `X` (each of the 4 regions): Area = 1, Perimeter = 4 → Cost = \(1 \times 4 = 4\)

**Total Fence Cost**: \(756 + 4 + 4 + 4 + 4 = 772\).

---

## Larger Example

```
RRRRIICCFF RRRRIICCCF VVRRRCCFFF VVRCCCJFFF VVVVCJJCFE VVIVCCJJEE VVIIICJJEE MIIIIIJJEE MIIISIJEEE MMMISSJEEE
```


#### Regions and Costs:
- Region `R`: Area = 12, Perimeter = 18 → Cost = \(12 \times 18 = 216\)
- Region `I`: Area = 4, Perimeter = 8 → Cost = \(4 \times 8 = 32\)
- Region `C`: Area = 14, Perimeter = 28 → Cost = \(14 \times 28 = 392\)
- Region `F`: Area = 10, Perimeter = 18 → Cost = \(10 \times 18 = 180\)
- Region `V`: Area = 13, Perimeter = 20 → Cost = \(13 \times 20 = 260\)
- Region `J`: Area = 11, Perimeter = 20 → Cost = \(11 \times 20 = 220\)
- Region `E`: Area = 13, Perimeter = 18 → Cost = \(13 \times 18 = 234\)
- Region `M`: Area = 5, Perimeter = 12 → Cost = \(5 \times 12 = 60\)
- Region `S`: Area = 3, Perimeter = 8 → Cost = \(3 \times 8 = 24\)

**Total Fence Cost**: \(216 + 32 + 392 + 180 + 260 + 220 + 234 + 60 + 24 = 1930\).

---

## Tasks

### Part 1

Calculate the **total cost of fencing** all regions in the garden.

### Part 2

With a **bulk discount**, the price of the fence is now calculated differently. Instead of the **perimeter**, the price is calculated using the **number of sides** a region has. Each straight segment of fence counts as one side, regardless of length.

For the example:

```
AAAA BBCD BBCC EEEC
```


Using the new calculation:
- Region `A`: Area = 4, Sides = 4 → Cost = \(4 \times 4 = 16\)
- Region `B`: Area = 4, Sides = 4 → Cost = \(4 \times 4 = 16\)
- Region `C`: Area = 4, Sides = 8 → Cost = \(4 \times 8 = 32\)
- Region `D`: Area = 1, Sides = 4 → Cost = \(1 \times 4 = 4\)
- Region `E`: Area = 3, Sides = 4 → Cost = \(3 \times 4 = 12\)

**Total Fence Cost**: \(16 + 16 + 32 + 4 + 12 = 80\).

For the given input, determine the **total cost** using both methods.
