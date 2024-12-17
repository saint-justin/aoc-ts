interface Vector2D {
  x: number; 
  y: number;
}

// 2024, Day 10 Part 1 -- https://adventofcode.com/2024/day/10
export const sum_property_values = (input: string[]): number => {
  const property_map: string[][] = input.map(row => row.split(''));
  property_map.toReversed().forEach(row => console.log(row.join('')));

  let property_value_sum = 0;
  const explored_plots = new Set<string>();

  for (let x = 0; x < property_map[0].length; x++) {
    for (let y = 0; y < property_map.length; y++) {
      // Escape early if position is padding or if position is explored
      const current_pos: Vector2D = { x, y };
      const current_key: string = `${x},${y}`;
      if (property_map[x][y] === '.') continue;
      if (explored_plots.has(current_key)) continue;

      // Explore all positions in plot
      const positions_in_plot = explore_plot(current_pos, property_map);
      const area = positions_in_plot.size;

      // Calculate value of the perimeter
      let perimeter = 0;
      for (const pos_in_plot of positions_in_plot) {
        const [x_pos, y_pos] = pos_in_plot.split(',').map(s => parseInt(s))
        const current_value = property_map[x_pos][y_pos];
        const adjacent_matching_plots = get_adjacent_positions({x: x_pos, y: y_pos})
          .filter(plot => property_map[plot.x][plot.y] === current_value)
          .length;
        perimeter += 4 - adjacent_matching_plots;
      }

      // Add value to area property sum
      console.log(`  Region of ${property_map[x][y]} has price ${area} * ${perimeter} = ${area * perimeter}`);
      property_value_sum += area * perimeter;
      positions_in_plot.forEach(pos => explored_plots.add(pos));
    }
  }

  return property_value_sum;
}

// Explore a plot starting from a given position, return all positions of that plot
const explore_plot = (start_pos: Vector2D, property_map: string[][]): Set<string> => {
  const explored: string[] = [];
  const to_explore: string[] = [`${start_pos.x},${start_pos.y}`];

  while (to_explore.length > 0) {
    const [x, y] = to_explore.pop().split(',').map(n => parseInt(n));
    const current_val = property_map[x][y];
    const valid_adjacents = get_adjacent_positions({x,y})
      .filter(possible => property_map[possible.x][possible.y] === current_val)
      .map(possible => `${possible.x},${possible.y}`)
      .filter(possible => !explored.includes(possible));

    to_explore.push(...valid_adjacents);
    explored.push(`${x},${y}`);
  }

  return new Set<string>(explored);  
}

// Get adjacent positions as a Vector2D[]
const get_adjacent_positions = (pos: Vector2D): Vector2D[] => {
  return [
    { x: pos.x + 1, y: pos.y },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x, y: pos.y - 1 },
  ];
}