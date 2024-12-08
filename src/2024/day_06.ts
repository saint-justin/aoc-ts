// 2024, Day 6 Part 1 -- https://adventofcode.com/2024/day/6
export const count_spaces_traversed = (input: string[]): number => {
  const map = input.map(s => s.split(''));
  const guard_pos = find_base_guard_pos(map);
  return generate_traversed_locations_set(map, guard_pos).size;
};

// 2024, Day 6 Part 2 -- https://adventofcode.com/2025/day/6#part2
export const count_looping_obstructions = (input: string[]): number => {
  const base_map = input.map(s => s.split(''));
  const guard_pos = find_base_guard_pos(base_map);
  return Array.from(generate_traversed_locations_set(base_map, guard_pos))
    .filter(pos_to_explore => {
      const [x, y] = pos_to_explore.split(',').map(s => parseInt(s));
      const map_with_new_obstruction = base_map.map(row => row.slice(0));
      map_with_new_obstruction[x][y] = '#';
      return check_for_infinite_loop(map_with_new_obstruction, guard_pos)
    })
    .length
}

/* --- Helper Tooling Below --- */
enum Direction {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
}

// Loop through each position of the map, search for the guard indicator (^)
const find_base_guard_pos = (map: string[][]) => {
  for (let i=0; i<map.length; i++) {
    for (let j=0; j<map[0].length; j++) {
      if (map[i][j] === '^') {
        map[i][j] === '.';
        return [i, j];
      }
    }
  }
  throw new Error('Unable to find default guard position');
}

// Generates a set of all locations traversed by the guard during their shift
const generate_traversed_locations_set = (map: string[][], default_guard_pos: number[]): Set<string> => {
  let guard_dir = Direction.UP;
  let guard_pos = default_guard_pos;

  const positions_traversed = new Set<string>();
  while (map[guard_pos[0]][guard_pos[1]] !== "0") {
    positions_traversed.add(`${guard_pos[0]},${guard_pos[1]}`)

    const [next_pos, next_dir] = find_next_pos(map, guard_pos, guard_dir);
    guard_pos = next_pos;
    guard_dir = next_dir;
  }

  return positions_traversed;
}

// Checks next position, if free then return it. If blocked, return current pos rotated by 90deg
const find_next_pos = (map: string[][], guard_pos: number[], guard_dir: Direction): [number[], Direction] => {
  let [y_diff, x_diff] = [0, 0];
  if (guard_dir === Direction.UP) y_diff = -1;
  if (guard_dir === Direction.DOWN) y_diff = 1;
  if (guard_dir === Direction.RIGHT) x_diff = 1;
  if (guard_dir === Direction.LEFT) x_diff = -1;

  // Rotate if next pos is an obstacle
  if (map[guard_pos[0] + y_diff][guard_pos[1] + x_diff] === '#') {
    // Directions enum just evaluates as values (0-3) so we can just return (n+1) % 4 to cycle between directions
    return [guard_pos, (guard_dir + 1) % 4]; 
  }

  return [[guard_pos[0] + y_diff, guard_pos[1] + x_diff], guard_dir];
}

// Traverse each position with new obstructions, search for a duplicated pos/dir pair which indicates a loop
const check_for_infinite_loop = (map: string[][], default_guard_pos: number[]): boolean => {
  let guard_dir = Direction.UP;
  let guard_pos = default_guard_pos;

  const positions_traversed = new Set<string>();
  while (map[guard_pos[0]][guard_pos[1]] !== "0") {
    const pos_and_dir_key = `POS [${guard_pos[0]},${guard_pos[1]}] FACING ${guard_dir}`;
    
    // loop detected if pos/dir pair is already in set
    if (positions_traversed.has(pos_and_dir_key)) return true;
    
    positions_traversed.add(pos_and_dir_key);
    const [next_pos, next_dir] = find_next_pos(map, guard_pos, guard_dir);
    guard_pos = next_pos;
    guard_dir = next_dir;
  }

  return false; // border area reached, no infinite loop.
}