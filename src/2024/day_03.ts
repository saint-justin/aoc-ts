const mul_pattern = /mul\((\d+),(\d+)\)/g;

// 2024, Day 3 Part 1 -- https://adventofcode.com/2024/day/3
export const find_mul_sum = (instruction_sets: string[]) => {
  let sum = 0;
  instruction_sets.forEach(line => 
    [...line.matchAll(mul_pattern)].forEach(([_, n1, n2]) => sum += parseInt(n1) * parseInt(n2))
  );
  return sum;
}

// 2024, Day 3 Part 2 -- https://adventofcode.com/2024/day/3#part2
export const find_enabled_mul_sum = (instruction_sets: string[]) => {
  let sum = 0;
  let enabled = true;
  instruction_sets.forEach(line => 
    [...line.matchAll(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g)].forEach((full_capture) => {
      const partial = full_capture[0].match(/(mul|don't|do)/g)![0];
      if (partial === `do`) enabled = true;
      if (partial === `don't`) enabled = false;
      if (partial === `mul` && enabled) {
        const [capture] = `${full_capture}`.matchAll(mul_pattern);
        sum += parseInt(capture[1]) * parseInt(capture[2])
      }
    }));
  return sum;
}