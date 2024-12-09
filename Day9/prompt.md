# Advent of Code - Day 9: Disk Fragmenter

Another push of the button leaves you in the familiar hallways of some friendly amphipods! Good thing you each somehow got your own personal mini submarine. The Historians jet away in search of the Chief, mostly by driving directly into walls.

While The Historians quickly figure out how to pilot these things, you notice an amphipod in the corner struggling with his computer. He's trying to make more contiguous free space by compacting all of the files, but his program isn't working; you offer to help.

---

## Part 1

The amphipod shows you the disk map (your puzzle input) he's already generated. For example:

```
2333133121414131402
```


The disk map uses a dense format to represent the layout of files and free space on the disk. The digits alternate between indicating the length of a file and the length of free space.

### Representation Example

For a disk map `12345`, the structure looks like:
- 1 block file (`0`)
- 2 blocks of free space
- 3 blocks file (`1`)
- 4 blocks of free space
- 5 blocks file (`2`)

Visualized:
```
0..111....22222
```


### Compaction Process

The amphipod's program compacts files by moving blocks from the end of the disk to the nearest leftmost free space. For the disk map `12345`, the compaction progresses as:

```
0..111....22222 02.111....2222. 022111....222.. 0221112...22... 02211122..2.... 022111222......
```


The goal is to calculate a **checksum** for the resulting compacted disk. The checksum is computed by multiplying the position of each block with its file ID and summing them.

For example:
- Position `0`: `0 * 0 = 0`
- Position `1`: `1 * 0 = 0`
- Position `2`: `2 * 9 = 18`
- ...
- **Checksum**: `1928`.

### Input Data

For the puzzle input, the solution computes the checksum after compacting the disk.

---

## Part 2

This time, the amphipod wants to compact files **by moving whole files** instead of individual blocks. The process differs:
1. Attempt to move each file as a whole to the nearest leftmost span of free space.
2. Files are moved in descending order of their IDs (starting with the highest ID).
3. If a file cannot move because there is no span large enough to fit it, it remains in place.

### Example

Using the same input:

```
2333133121414131402
```


The compacting process proceeds as:

```
00...111...2...333.44.5555.6666.777.888899 0099.111...2...333.44.5555.6666.777.8888.. 0099.1117772...333.44.5555.6666.....8888.. 0099.111777244.333....5555.6666.....8888.. 00992111777.44.333....5555.6666.....8888..
```


The checksum calculation remains the same as in Part 1.

---

## Solution

### Input File

The input file (`input.txt`) contains a single line representing the dense disk map. For this problem:

**Part 1 Result:** `6259790630969`  
**Part 2 Result:** `6289564433984`
