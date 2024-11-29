const claim_pattern = /(\d+) @ (\d+),(\d+): (\d+)x(\d+)/

// 2018, Day 3 Part 1 -- https://adventofcode.com/2018/day/3
export const find_square_inches_of_claimed_fabric = (claims: string[]): number => {
  const claimed_spaces = new Map<string, number>();
  for(const claim of claims) {
    const [_full_match, _claim_id, from_left, from_top, width, height] = claim
      .match(claim_pattern)!
      .map(part => parseInt(part, 10));

    for(let i=0; i<width; i++) {
      for( let j=0; j<height; j++) {
        const x_pos = from_left + i;
        const y_pos = from_top + j;
        const space_key = `${x_pos}_${y_pos}`;
        if (!claimed_spaces.has(space_key)) {
          claimed_spaces.set(space_key, 1);
        } else {
          claimed_spaces.set(space_key, claimed_spaces.get(space_key)! + 1);
        }
      }
    }
  }

  return Array.from(claimed_spaces.values()).filter(value => value >= 2).length;
}

// 2018, Day 3 Part 2 -- https://adventofcode.com/2018/day/3#part2
interface Bounds {
  claim_id: string;
  x_min: number;
  x_max: number;
  y_min: number;
  y_max: number;
}

export const find_claim_with_no_overlap = (claims: string[]): string => {
  const all_claims: Bounds[] = claims.map(claim => {
    const [_full_match_1, claim_id] = claim.match(claim_pattern)!;
    const [_full_match_2, _claim_id, from_left_a, from_top_a, width_a, height_a] = claim
      .match(claim_pattern)!
      .map(part => parseInt(part, 10));
  
    return {
      claim_id,
      x_min: from_left_a,
      x_max: from_left_a + width_a,
      y_min: from_top_a,
      y_max: from_top_a + height_a,
    };
  })

  for (let i=0; i<all_claims.length; i++) {
    if (!check_for_collision_against_all_claims(all_claims[i], all_claims)) {
      return all_claims[i].claim_id;
    }
  }
  throw new Error("Not yet implemented");
}

// Checks whether a claim has collisions with any other claim
const check_for_collision_against_all_claims = (base_claim: Bounds, all_claims: Bounds[]): boolean => {
  for (let i=0; i<all_claims.length; i++) {
    // skip self comparisons
    if (all_claims[i] === base_claim) {
      continue;
    }

    // compare two claims for collisions
    if (check_claims_for_collision(base_claim, all_claims[i])) {
      return true;
    }
  }

  return false;
}

// Simple AABB collision check for axis-aligned objects
const check_claims_for_collision = (bounds_a: Bounds, bounds_b: Bounds): boolean => {
  const a_above_b = bounds_a.y_min > bounds_b.y_max;
  const a_below_b = bounds_a.y_max < bounds_b.y_min;
  const a_left_of_b = bounds_a.x_min > bounds_b.x_max; 
  const a_right_of_b = bounds_a.x_max < bounds_b.x_min;
  
  return !(a_above_b || a_below_b || a_left_of_b || a_right_of_b);
}