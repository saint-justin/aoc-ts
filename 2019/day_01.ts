
// 2019, Day 1 Part 1 -- https://adventofcode.com/2019/day/1
export const find_fuel_requirements = (input: string[]) => {
  return input.map(mass => Math.floor(parseInt(mass) / 3) - 2).reduce((sum, current) => sum + current, 0);
}

// 2019, Day 1 Part 2
export const find_recursive_fuel_requirements = (input: string[]) => {
  const findFuel = (fuel: number): number => {    
    const remainder = Math.floor(fuel / 3) - 2;
    if (remainder <= 2) return Math.max(remainder, 0);
    return remainder + findFuel(remainder);
  }

  return input.map(mass => findFuel(parseInt(mass))).reduce((sum, current) => sum + current, 0);
}
