const cache = new Map<bigint, bigint | bigint[]>();
cache.set(BigInt(0), BigInt(1))

// 2024, Day 10 Part 1 -- https://adventofcode.com/2024/day/10
export const count_stones_after_25_blinks = (input: string[]) => {
  let stones: bigint[] = input[0].split(' ').map(s => BigInt(s));

  for (let i = 0; i < 75; i++) {
    stones = stones.map(stone => blink(stone)).flat()
    console.log(`After ${i.toString().padStart(2)}: ${stones.length}`);
  }

  return stones.length;
}

const blink = (stone: bigint) => {
  if (cache.has(stone)) return cache.get(stone);

  if (stone.toString().length % 2 === 0) {
    const as_str = stone.toString();
    const left = as_str.slice(0, as_str.length / 2);
    const right = as_str.slice(as_str.length / 2);
    cache.set(stone, [BigInt(left), BigInt(right)])
    return [BigInt(left), BigInt(right)];
  }

  const output = stone * BigInt(2024)
  cache.set(stone, output)
  return output;
}