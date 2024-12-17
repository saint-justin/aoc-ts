// Helpers because they're bulky
const ZERO = BigInt(0);
const ONE = BigInt(1);
const BIG = BigInt(2024);

// 2024, Day 11 Part 1 -- https://adventofcode.com/2024/day/11
export const count_stones_after_25_blinks = (input: string[]) => {
    // Initialize a map of stone id => stone count
    let stone_map = new Map<bigint, number>();
    input[0].split(' ').map(s => BigInt(s)).forEach(stone => stone_map.set(stone, 1));
    for (let i=0; i<25; i++) {
      stone_map = blink(stone_map);
    }
    return [...stone_map].reduce((acc, [_, ct]) => acc + ct, 0);
}

// 2024, Day 11 Part 2 -- https://adventofcode.com/2024/day/11#part2
export const count_stones_after_75_blinks = (input: string[]) => {
  // Initialize a map of stone id => stone count
  let stone_map = new Map<bigint, number>();
  input[0].split(' ').map(s => BigInt(s)).forEach(stone => stone_map.set(stone, 1));
  for (let i=0; i<75; i++) {
    stone_map = blink(stone_map);
  }
  return [...stone_map].reduce((acc, [_, ct]) => acc + ct, 0);
}

// Iterate over each key in the map, expanding till it gets biggums
const blink = (old_map: Map<bigint, number>): Map<bigint, number> => {
  const new_map = new Map<bigint, number>();
  const add_stones = (id: bigint, count: number) => new_map.set(id, (new_map.get(id) || 0) + count);
  for (const [id, count] of old_map) {
    if (id === ZERO) {
      add_stones(ONE, count); // if zero, add a 1
      continue;
    }

    const id_str = id.toString(); // if even, split in half and add both
    if (id_str.length % 2 === 0) {
      const id_1 = BigInt(id_str.slice(0, id_str.length / 2));
      const id_2 = BigInt(id_str.slice(id_str.length / 2));
      add_stones(id_1, count);
      add_stones(id_2, count);
      continue;
    }

    add_stones(id * BIG, count); // else add big boi
  }
  return new_map;
}

