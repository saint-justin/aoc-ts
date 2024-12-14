// Helper type
type Vector2D = [number, number];

// 2024, Day 10 Part 1 -- https://adventofcode.com/2024/day/10
export const sum_trailhead_scores = (input: string[]): number => {
  const trail_map = input.map(row => row.split('').map(s => s === '.' ? -1 : parseInt(s)));
  return get_all_trailheads(trail_map)
    .map(trailhead => calculate_trailhead_score(trail_map, trailhead, true))
    .reduce((acc, trailhead_score) => trailhead_score + acc, 0);
}

// 2024, Day 10 Part 2 -- https://adventofcode.com/2024/day/10#part2
export const sum_trailhead_ratings = (input: string[]): number => {
  const trail_map = input.map(row => row.split('').map(s => s === '.' ? -1 : parseInt(s)));
  return get_all_trailheads(trail_map)
    .map(trailhead => calculate_trailhead_score(trail_map, trailhead, false))
    .reduce((acc, trailhead_score) => trailhead_score + acc, 0);
}

// Get a Vector2D[] with positions of all 0's
const get_all_trailheads = (trail_map: number[][]): Vector2D[] => {
  const trailheads: Vector2D[] = [];
  for (let i = 0; i < trail_map.length; i++) {
    for (let j=0; j < trail_map[0].length; j++) {
      if (trail_map[i][j] === 0) trailheads.push([i, j]);
    }
  }
  return trailheads;
}

// DFS to find how many elevations of height 9 are accessible
const calculate_trailhead_score = (
  trail_map: number[][], 
  start_pos: Vector2D, 
  calculating_score: boolean
): number => {
  const keys_explored: string[] = [];
  const keys_to_explore: string[] = [start_pos.join(',')];

  while (keys_to_explore.length > 0) {
    const current_pos = keys_to_explore.pop().split(',').map(n => parseInt(n)) as Vector2D;
    const current_val = trail_map[current_pos[0]][current_pos[1]];
    
    // Check all adjacents
    const valid_next_steps = [
      [current_pos[0] + 1, current_pos[1]] as Vector2D,
      [current_pos[0] - 1, current_pos[1]] as Vector2D,
      [current_pos[0], current_pos[1] + 1] as Vector2D,
      [current_pos[0], current_pos[1] - 1] as Vector2D,
    ].filter(pos => trail_map[pos[0]][pos[1]] === current_val + 1) // check step height
      .map(pos => pos.join(','))                                    // convert to a key
      .filter(pos => {                                              // check explored if needed
        // if we're calculating score, exclude explored
        if (calculating_score) return !keys_explored.includes(pos)

        // if calculating trail rating, include all
        return true;
      });

    keys_explored.push(current_pos.join(','));
    keys_to_explore.push(...valid_next_steps);
  }

  return keys_explored
    .map(key => key.split(',').map(n => parseInt(n)) as Vector2D)
    .filter(pos => trail_map[pos[0]][pos[1]] === 9).length;
}