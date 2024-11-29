// 2018, Day 1 Part 1 -- https://adventofcode.com/2018/day/1
export const find_resulting_frequency = (frequency_list: string[]): number => {
  return frequency_list
    .map(freq_as_str => parseInt(freq_as_str, 10))
    .reduce((acc, n) => acc += n, 0);
}

// 2018, Day 1 Part 2 -- https://adventofcode.com/2018/day/1#part2
export const find_first_dup_frequency = (frequency_list: string[]): number => {
  const found_frequencies = new Set<number>();
  let current_frequency = 0;
  let all_frequencies = frequency_list.map(freq_as_str => parseInt(freq_as_str, 10));
  for (let i=0; i<1_000_000; i++) {
    let position_in_list = i % all_frequencies.length;
    current_frequency += all_frequencies[position_in_list];
    if (found_frequencies.has(current_frequency)) {
      return current_frequency;
    }
    found_frequencies.add(current_frequency);
  }

  throw new Error("Reached max attempts (1,000,000)");
}