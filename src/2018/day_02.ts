// 2018, Day 2 Part 1 -- https://adventofcode.com/2018/day/2
export const find_checksum_for_box_ids = (box_ids: string[]): number => {
  let sets_of_two = 0;
  let sets_of_three = 0;

  box_ids.forEach(box_id => {
    // generate map of all characters and their counts
    const id_map = generate_id_map(box_id);

    // iterate over letters looking for single and doubles
    let [ has_double, has_triple ] = [ 0, 0 ];
    for (const [_char, count] of id_map) {
      if (has_double && has_triple) break;
      if (count === 2) has_double = 1;
      if (count === 3) has_triple = 1;
    }

    sets_of_two += has_double;
    sets_of_three += has_triple;
  })

  return sets_of_two * sets_of_three;
}

// 2018, Day 2 Part 2 -- https://adventofcode.com/2018/day/2#part2
export const find_common_letters_between_correct_box_ids = (box_ids: string[]): string => {
  for (let i=0; i<box_ids.length - 1; i++) {
    for (let j=i+1; j < box_ids.length; j++) {
      const is_off_by_one = off_by_one(box_ids[i], box_ids[j]);
      if (typeof is_off_by_one === 'string') {
        return is_off_by_one
      }
    }
  }

  throw new Error("Solution not found!");
}

// Helper function to determine generate a map of characters and their counts from a string
const generate_id_map = (box_id: string): Map<string, number> => {
  const id_map = new Map<string, number>();
  box_id.split('').forEach(char => {
    if (id_map.has(char)) id_map.set(char, id_map.get(char)! + 1);
    else id_map.set(char, 1);
  })
  return id_map;
}

// Helper function which determines of a 
const off_by_one = (id_1: string, id_2: string): string | boolean => {
  let mismatch_index: undefined | number = undefined;
  const [id_1_arr, id_2_arr] = [id_1.split(''), id_2.split('')];
  for (let i=0; i<id_1_arr.length; i++) {
    if (id_1_arr[i] !== id_2_arr[i]) {
      if (mismatch_index) {
        return false;
      } else {
        mismatch_index = i;
      }
    }
  }
  
  if (!mismatch_index) {
    throw new Error(`No mismatches found for strings [${id_1}] and [${id_2}]`);
  }

  return id_1.slice(0, mismatch_index) + id_1.slice(mismatch_index + 1);
}