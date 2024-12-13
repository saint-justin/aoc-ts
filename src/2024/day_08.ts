type Vector2D = [number, number];

// 2024, Day 8 Part 1 -- https://adventofcode.com/2024/day/8
export const count_antinodes_in_bounds = (input: string[]): number => {
  const node_map = input.map(row => row.split(''));
  const map_dimensions: Vector2D = [node_map[0].length, node_map.length];

  return get_node_position_sets(node_map)
    .map(position_set => get_antinode_positions(position_set))    // get all positions
    .flat()                                                       // flatten V2D[][] => V2D[]
    .filter(node => position_not_oob(node, map_dimensions))       // validate positions not OOB
    .map(node => `${node[0]},${node[1]}`)                         // make keys for unique check
    .filter((node, index, arr) => arr.indexOf(node) === index)    // check unique
    .length;
};

// 2024, Day 8 Part 2 -- https://adventofcode.com/2024/day/8#part2
export const count_repeating_antinodes_in_bounds = (input: string[]): number => {
  const node_map = input.map(row => row.split(''));
  const map_dimensions: Vector2D = [node_map[0].length, node_map.length];

  return get_node_position_sets(node_map)
    .map(position_set => get_repeating_antinode_positions(position_set, map_dimensions))
    .flat()                                                       // flatten Vec2D[][] => Vec2D[]
    .map(node => `${node[0]},${node[1]}`)                         // make keys for unique check
    .filter((node, index, arr) => arr.indexOf(node) === index)    // check unique
    .length;
};

// Get a map of all base notes within the map
const get_node_position_sets = (node_map: string[][]): Vector2D[][] => {
  const nodes = new Map<string, Vector2D[]>();
  for (let i=0; i<node_map.length; i++) {
    for (let j=0; j<node_map.length; j++) {
      let current = node_map[i][j];
      if (current === '.') continue;
      nodes.set(
        current,
        nodes.has(current) 
          ? [...nodes.get(current), [i, j]] 
          : [[i, j]]
      )
    }
  }
  return Array.from(nodes.values());
};

// Helper vector math abstractions
const add = (p1: Vector2D, p2: Vector2D): Vector2D => [p1[0] + p2[0], p1[1] + p2[1]];
const subtract = (p1: Vector2D, p2: Vector2D): Vector2D => [p1[0] - p2[0], p1[1] - p2[1]];

// Get a list of all base antinodes
const get_antinode_positions = (positions: Vector2D[]) => {
  const antinode_positions = new Set<Vector2D>
  for (let i = 0; i < positions.length - 1; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const n1 = positions[i];
      const n2 = positions[j];
      antinode_positions.add(add(n1, subtract(n1, n2)));
      antinode_positions.add(add(n2, subtract(n2, n1)));
    }
  }
  return Array.from(antinode_positions);
};

// Get a list of all repeating antinode positions
const get_repeating_antinode_positions = (positions: Vector2D[], map_dimensions: Vector2D) => {
  const antinode_positions = new Set<Vector2D>
  for (let i = 0; i < positions.length - 1; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const n1 = positions[i];
      const n2 = positions[j];
      [
        ...repeat_to_map_edge(n1, subtract(n1, n2), map_dimensions),
        ...repeat_to_map_edge(n2, subtract(n2, n1), map_dimensions),
      ].forEach(pos => antinode_positions.add(pos));
    }
  }
  return Array.from(antinode_positions);
};

// Get a list of all valid repeat positions based on a start pos, 2d step length, and map dimensions 
const repeat_to_map_edge = (start_pos: Vector2D, step: Vector2D, map_dimensions: Vector2D) => {
  const positions: Vector2D[] = [];
  let current: Vector2D = [...start_pos];
  while (position_not_oob(current, map_dimensions)) {
    positions.push(current);
    current = add(current, step);
  }
  return positions;
};

// Checks if a given position is/is not out of bounds
const position_not_oob = (pos: Vector2D, map_dimensions: Vector2D) => (
  pos[0] >= 0 && pos[0] < map_dimensions[0] && pos[1] >= 0 && pos[1] < map_dimensions[1]
);