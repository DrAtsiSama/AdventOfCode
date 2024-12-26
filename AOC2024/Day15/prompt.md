# Day 15: Warehouse Woes

## Context

You appear back inside your own mini submarine! Each Historian drives their mini submarine in a different direction; maybe the Chief has his own submarine down here somewhere as well?

You look up to see a vast school of lanternfish swimming past you. On closer inspection, they seem quite anxious, so you drive your mini submarine over to see if you can help.

Because lanternfish populations grow rapidly, they need a lot of food, and that food needs to be stored somewhere. That's why these lanternfish have built elaborate warehouse complexes operated by robots!

These lanternfish seem so anxious because they have lost control of the robot that operates one of their most important warehouses! It is currently running amok, pushing around boxes in the warehouse with no regard for lanternfish logistics or lanternfish inventory management strategies.

Right now, none of the lanternfish are brave enough to swim up to an unpredictable robot so they could shut it off. However, if you could anticipate the robot's movements, maybe they could find a safe option.

The lanternfish already have a map of the warehouse and a list of movements the robot will attempt to make (your puzzle input). The problem is that the movements will sometimes fail as boxes are shifted around, making the actual movements of the robot difficult to predict.

## Example

### Initial Warehouse Layout

```
########## #..O..O.O# #......O.# #.OO..O.O# #..O@..O.# #O#..O...# #O..O..O.# #.OO.O.OO# #....O...# ##########
```

### Robot's Movement Instructions

```
<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
```

### Movements and Final Layout
1. After moving `<`:

```
########## #..O..O.O# #......O.# #.OO..O.O# #..O@..O.# #O#..O...# #O..O..O.# #.OO.O.OO# #....O...# ##########
```

2. After moving `^`:

```
########## #..O..O.O# #......O.# #.OO..O.O# #.@O..O. # #O#..O...# #O..O..O.# #.OO.O.OO# #....O...# ##########
```


### GPS Coordinate Calculation
Each box's GPS coordinate is calculated as:

```
GPS = 100 * row_distance + col_distance
```

Sum all GPS coordinates to get the final result.

---

## Part Two: Extended Warehouse

The lanternfish use your information to find a safe moment to swim in and turn off the malfunctioning robot! However, reports come in that a second warehouse robot is also malfunctioning.

This warehouse's layout is similar but **twice as wide**:
- Walls (`#`) become `##`.
- Boxes (`O`) become `[]`.
- Empty spaces (`.`) become `..`.
- The robot (`@`) becomes `@.`.

### Example: Resized Warehouse

```
#################### ##....[]....[]..[]## ##............[]..## ##..[][]....[]..[]## ##....[]@.....[]..## ##[]##....[]......## ##[]....[]....[]..## ##..[][]..[]..[][]## ##........[]......## ####################
```

### Updated GPS Calculation
For wide boxes (`[]`), calculate the GPS coordinate based on the **closest edge**:

```
GPS = 100 * row_distance + col_distance
```

---

## Goals

1. Simulate the robot's movements in the warehouse.
2. Calculate the sum of all boxes' GPS coordinates after the robot finishes moving.

---

## Results

- **Part 1 Answer:** `1514333`
- **Part 2 Answer:** `1528453`
