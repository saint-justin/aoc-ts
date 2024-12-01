// 2024, Day 1 Part 1 -- https://adventofcode.com/2024/day/1
export const find_total_distance_between_lists = (double_list: string[]): number => {
  const [list_left, list_right] = parse_lists(double_list);
  list_left.sort();
  list_right.sort();
  return list_left.reduce((acc, left_val, i) => acc + Math.abs(left_val - list_right[i]), 0)
}

// 2024, Day 1 Part 2 -- https://adventofcode.com/2024/day/1#part2
export const find_similarity_score_between_lists = (double_list: string[]): number => {
  const [list_left, list_right] = parse_lists(double_list);
  const right_list_counts = new Map<number, number>();
  list_right.forEach(number => {
    if (!right_list_counts.has(number)) {
      right_list_counts.set(number, 1)
    } else {
      right_list_counts.set(number, right_list_counts.get(number)! + 1)
    }
  })

  return list_left.reduce((acc, n) => acc + (!right_list_counts.has(n) ? 0 : n * right_list_counts.get(n)!), 0)
}

// Parse two lists separated by 3 spaces
const parse_lists = (double_list: string[]) => {
  const list_left: number[] = [];
  const list_right: number[] = [];
  for (const line of double_list) {
    const [item_left, item_right] = line.split('   ').map(n => parseInt(n, 10))
    list_left.push(item_left);
    list_right.push(item_right)
  }
  return [list_left, list_right]
}