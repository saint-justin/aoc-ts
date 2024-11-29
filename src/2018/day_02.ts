// 2018, Day 2 Part 1 -- https://adventofcode.com/2018/day/2
export const find_checksum_for_box_ids = (box_ids: string[]): number => {
  let sets_of_two = 0;
  let sets_of_three = 0;

  box_ids.forEach(box_id => {
    const id_map = new Map<string, number>();
    let [ has_double, has_triple ] = [ 0, 0 ];
    box_id.split('').forEach(char => {
      if (id_map.has(char)) id_map.set(char, id_map.get(char)! + 1);
      else id_map.set(char, 1);
    })

    for (const [_char, count] of id_map) {
      if (count === 2) has_double = 1;
      if (count === 3) has_triple = 1;
    }

    sets_of_two += has_double;
    sets_of_three += has_triple;
  })

  return sets_of_two * sets_of_three;
}
