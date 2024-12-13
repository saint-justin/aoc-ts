// Helper cache to speed up operand generation
let operands_cache;

// 2024, Day 7 Part 1 -- https://adventofcode.com/2024/day/6
export const find_base_calibration_result = (equations: string[]) => {
  operands_cache = new Map<number, string[][]>();
  return equations
    .map(eq_string => eq_string.split(/: | /g).map(value => BigInt(value)))
    .filter(eq_args => evaluates_to_target(eq_args[0], eq_args.slice(1), false))
    .reduce((acc, eq_args) => acc + eq_args[0], BigInt(0));
}

// 2024, Day 7 Part 2 -- https://adventofcode.com/2024/day/6#part2
export const find_expanded_calibration_result = (equations: string[]) => {
  operands_cache = new Map<number, string[][]>();

  return equations
    .map(eq_string => eq_string.split(/: | /g).map(value => BigInt(value)))
    .filter(eq_args => evaluates_to_target(eq_args[0], eq_args.slice(1), true))
    .reduce((acc, eq_args) => acc + eq_args[0], BigInt(0));
}

// Evaluate whether a series of values can evaluate to a given target
export const evaluates_to_target = (target: bigint, values: bigint[], expanded: boolean): boolean => {
  // console.log(`Evaluating target [${target}] for values [${values}]`);
  if (values.length < 2) throw new Error('Not enough values to evaluate!');

  // Check all operand arrangements
  const operand_arrangements = generate_test_operands(values.length - 1, expanded);

  for (const config of operand_arrangements) {
    let total: bigint = values[0];
    for (let i = 1; i < values.length; i++) {
      if (config[i-1] === '+') total += values[i];
      if (config[i-1] === '*') total *= values[i];
      if (config[i-1] === '|') total = BigInt(`${total}${values[i]}`)
    }
    
    if (total === target) return true;
  }
  return false;
}

export const generate_test_operands = (count: number, expanded: boolean): string[][] => {
  // Base case
  if (count === 1 && !expanded) return [['+'], ['*']];
  if (count === 1 && expanded)  return [['+'], ['*'], ['|']];

  // Check for a cache hit
  if (operands_cache.has(count)) return operands_cache.get(count);

  // No cache hit, generate a new set and append to cache
  const child_operands = generate_test_operands(count - 1, expanded);
  const operands_for_count = [
    ...child_operands.map(operands => [...operands, "+"]),
    ...child_operands.map(operands => [...operands, "*"]),
  ];
  if (expanded) {
    operands_for_count.push(...child_operands.map(operands => [...operands, "|"]))
  }
  operands_cache.set(count, operands_for_count);
  return operands_for_count;
}

/**
 * Options
 * 10:    05 05
 *          +
 *          -
 * 
 * 100:   05,05,10
 *          +  +
 *          +  -
 *          -  +
 *          -  -
 * 
 * 1000:  05,05,10,10    
 *          +  +  +
 *          +  +  -
 *          +  -  +
 *          +  -  -
 *          -  +  +
 *          -  +  -
 *          -  -  +
 *          -  -  -
 * 
 * 10000: 05 05 10 10 10
 *          +  +  +  +
 *          +  +  +  -
 *          +  +  -  +
 *          +  +  -  -
 *          +  -  +  +
 *          +  -  +  -
 *          +  -  -  +
 *          +  -  -  -
 *          -  +  +  +
 *          -  +  +  -
 *          -  +  -  +
 *          -  +  -  -
 *          -  -  +  +
 *          -  -  +  -
 *          -  -  -  +
 *          -  -  -  -

 */