export type Point = {
  x: number;
  y: number;
}

export type Intersection = {
  pos: Point;
  steps_to: number;
}

export enum Alignment {
  VERTICAL,
  HORIZONTAL,
}

export interface LineSegment {
  alignment: Alignment,
  end_points: [Point, Point];
  leadup_length: number;
  segment_length: number;
}

/**
 * Finds the next position from the current position based on the given direction.
 * 
 * @param {Point} current - The current position.
 * @param {string} dir - The direction to move in (e.g., 'U10', 'D5').
 * @returns {Point} The new position after moving in the given direction.
 * @throws {Error} If an invalid direction is passed.
 */
export const find_next_pos_from_direction = (current: Point, dir: string): Point => {
  const direction = dir.slice(0, 1);
  const amount = parseInt(dir.slice(1), 10);
  switch(direction) {
    case 'U': return { x: current.x, y: current.y + amount }
    case 'D': return { x: current.x, y: current.y - amount }
    case 'L': return { x: current.x - amount, y: current.y }
    case 'R': return { x: current.x + amount, y: current.y }
    default:
      throw new Error(`Invalid direction passed: ${direction}`);
  }
}

/**
 * Determines the alignment (vertical or horizontal) between two points.
 * 
 * @param {Point} p1 - The first point.
 * @param {Point} p2 - The second point.
 * @returns {Alignment} The alignment of the line segment connecting the two points.
 * @throws {Error} If the points form a diagonal line.
 */
export const find_alignment = (p1: Point, p2: Point): Alignment => {
  if (p1.x == p2.x) return Alignment.VERTICAL;
  if (p1.y == p2.y) return Alignment.HORIZONTAL;
  throw new Error(`Alignment Diagonal for Points: [${p1.x},${p1.y}] to [${p2.x},${p2.y}]`);
}

/**
 * Calculates the Manhattan distance between two points.
 * 
 * @param {Point} p1 - The first point.
 * @param {Point} p2 - The second point.
 * @returns {number} The Manhattan distance between the two points.
 */
export const get_distance_from = (p1: Point, p2: Point): number => {
  const result: Point = { x: Math.abs(p1.x - p2.x), y: Math.abs(p1.y - p2.y) };
  if (result.x !== 0 && result.y !== 0) throw new Error(`Invalid diagonal connection between points: [${p1.x},${p1.y}] [${p2.x},${p2.y}]`);
  return Math.max(result.x, result.y);
}

/**
 * Generates line segments from a list of direction strings.
 * 
 * @param {string[]} directions - An array of direction strings (e.g., ['U10', 'R5']).
 * @returns {LineSegment[]} An array of line segments generated from the directions.
 */
export const generate_segments_from_directions = (directions: string[]): LineSegment[] => {
  const segments: LineSegment[] = [];
  let current_pos: Point = { x: 0, y: 0 };
  let leadup_length = 0;
  directions.forEach(dir => {
    // setup
    const next_pos = find_next_pos_from_direction(current_pos, dir);
    const alignment = find_alignment(current_pos, next_pos);
    const segment_length = get_distance_from(current_pos, next_pos)

    // add to segments + set up for next item
    segments.push({
      alignment,
      leadup_length,
      segment_length,
      end_points: [current_pos, next_pos],
    })
    leadup_length += segment_length;
    current_pos = next_pos;
  })
  return segments;
}

/**
 * Checks if two line segments intersect and returns the intersection point if they do.
 * 
 * @param {LineSegment} seg1 - The first line segment.
 * @param {LineSegment} seg2 - The second line segment.
 * @returns {Point | undefined} The intersection point if the segments intersect, otherwise undefined.
 */
export const check_for_intersection = (segment_1: LineSegment, segment_2: LineSegment): Point | undefined => {
  // Exit early if the segments are aligned, they can't intersect
  if (segment_1.alignment === segment_2.alignment) return;

  const wire_1_x_min = Math.min(...segment_1.end_points.map(p => p.x));
  const wire_1_x_max = Math.max(...segment_1.end_points.map(p => p.x));
  const wire_1_y_min = Math.min(...segment_1.end_points.map(p => p.y));
  const wire_1_y_max = Math.max(...segment_1.end_points.map(p => p.y));

  const wire_2_x_min = Math.min(...segment_2.end_points.map(p => p.x));
  const wire_2_x_max = Math.max(...segment_2.end_points.map(p => p.x));
  const wire_2_y_min = Math.min(...segment_2.end_points.map(p => p.y));
  const wire_2_y_max = Math.max(...segment_2.end_points.map(p => p.y));

  if (segment_1.alignment === Alignment.HORIZONTAL) {
    const wire_1_y = wire_1_y_min;
    const wire_2_x = wire_2_x_min;

    // No collision if wire_2_x not contained by wire_1 x_min and x_max
    // No collision if wire_1_y not contained by wire_2 y_min and y_max
    if (wire_1_x_min > wire_2_x || wire_1_x_max < wire_2_x) return;
    if (wire_2_y_min > wire_1_y || wire_2_y_max < wire_1_y) return;
    return { x: wire_2_x, y: wire_1_y };
  } else { // VERTICAL
    const wire_1_x = wire_1_x_min;
    const wire_2_y = wire_2_y_min;

    // No collision if wire_2_x not contained by wire_1 x_min and x_max
    // No collision if wire_1_y not contained by wire_2 y_min and y_max
    if (wire_2_x_min > wire_1_x || wire_2_x_max < wire_1_x) return;
    if (wire_1_y_min > wire_2_y || wire_1_y_max < wire_2_y) return;
    return { x: wire_1_x, y: wire_2_y };
  }
}


/**
 * Finds all intersection points between two sets of line segments.
 * 
 * @param {LineSegment[]} segments1 - The first set of line segments.
 * @param {LineSegment[]} segments2 - The second set of line segments.
 * @returns {Point[]} An array of intersection points.
 */
export const find_all_intersections = (wire_1: LineSegment[], wire_2: LineSegment[]): Intersection[] => {
  const intersections: Intersection[] = [];

  for (let i=0; i<wire_1.length; i++) {
    for (let j=0; j<wire_2.length; j++) {
      const [segment_1, segment_2] = [wire_1[i], wire_2[j]];
      const intersection = check_for_intersection(segment_1, segment_2);
      if (intersection) {
        const seg_1_steps = segment_1.leadup_length + get_distance_from(segment_1.end_points[0], intersection);
        const seg_2_steps = segment_2.leadup_length + get_distance_from(segment_2.end_points[0], intersection);
        const steps_to = seg_1_steps + seg_2_steps
        intersections.push({ pos: intersection, steps_to })
      }
    }
  }
  
  return intersections.filter(point => point.pos.x !== 0 || point.pos.y !== 0) // filter out origin [0,0]
}

// 2019, Day 03 Part 1 -- https://adventofcode.com/2019/day/3
export const find_distance_from_port_to_nearest_intersection = (wires: string[]): number => {
  const wire_1_segments = generate_segments_from_directions(wires[0].split(','));
  const wire_2_segments = generate_segments_from_directions(wires[1].split(','));
  return find_all_intersections(wire_1_segments, wire_2_segments)
    .reduce(
      (shortest_known, current_intersection) => {
        const current_dist_to_port = Math.abs(current_intersection.pos.x) + Math.abs(current_intersection.pos.y);
        return shortest_known > current_dist_to_port ? current_dist_to_port : shortest_known;
      },
      Number.MAX_SAFE_INTEGER
    )
}

// 2019, Day 03 Part 2 -- https://adventofcode.com/2019/day/3#part2
export const find_distance_to_intersection_by_combined_steps = (wires: string[]): number => {
  const wire_1_segments = generate_segments_from_directions(wires[0].split(','));
  const wire_2_segments = generate_segments_from_directions(wires[1].split(','));
  return find_all_intersections(wire_1_segments, wire_2_segments)
    .reduce(
      (shortest_known, current_intersection) => {
        const current_dist_to_port = current_intersection.steps_to;
        return shortest_known > current_dist_to_port ? current_dist_to_port : shortest_known;
      },
      Number.MAX_SAFE_INTEGER
    )
}