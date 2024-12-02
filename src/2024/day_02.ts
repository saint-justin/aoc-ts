// 2024, Day 2 Part 1 -- https://adventofcode.com/2024/day/2
export const count_safe_reports = (reports: string[]): number => {
  return reports.map(report => report.split(' ').map(reactor_levels => parseInt(reactor_levels, 10)))
    .filter(reactor_levels => check_level_safety(reactor_levels))
    .length;
}

// 2024, Day 2 Part 2 -- https://adventofcode.com/2024/day/2#part2
export const count_safe_reports_with_dampening = (reports: string[]): number => {
  return reports
    .map(report => report.split(' ').map(reactor_levels => parseInt(reactor_levels, 10)))
    .filter(reactor_levels => {
      // check full level
      if (check_level_safety(reactor_levels)) return true; 

      // check levels with each stage spliced out
      for (let i=0; i<reactor_levels.length; i++) {
        const level_with_i_spliced = [...reactor_levels.slice(0, i), ...reactor_levels.slice(i+1)];
        if (check_level_safety(level_with_i_spliced)) return true;
      }
      return false; // level checks exhausted, bail out
    }).length;
}

// -- Helper functions -- 

// Checks whether a reactor step is increasing or decreasing
const is_increasing = (n1: number, n2: number): boolean => n1 - n2 < 0;

// Checks whether a change is considered gradual
const is_gradual = (n1: number, n2: number): boolean => {
  const change = Math.abs(n1 - n2);
  return change >= 1 && change <= 3;
}

// checks if a given level is valid step-by-step
const check_level_safety = (reactor_levels: number[]) => {
  if (reactor_levels[0] === reactor_levels[1]) return false; 
  const increasing_at_start = is_increasing(reactor_levels[0], reactor_levels[1]);
  for (let i=0; i<reactor_levels.length - 1; i++) {
    if (increasing_at_start !== is_increasing(reactor_levels[i], reactor_levels[i+1])) return false;
    if (!is_gradual(reactor_levels[i], reactor_levels[i+1])) return false
  }
  return true;
}