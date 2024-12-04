// 2024, Day 4 Part 1 -- https://adventofcode.com/2024/day/4
export const find_xmas_count = (word_search: string[]): number => {
  // create a 2d array and a rotated 2d array
  const crossword_matrix: string[][] = word_search.map(row => row.split(''));
  const crossword_matrix_rotated = crossword_matrix[0]
    .map((_, index) => crossword_matrix.map(row => row[index]).reverse());

  // Gather all strings to check then count up instances of XMAS or SAMX across them
  return [
    ...crossword_matrix.map(row => row.join('')),
    ...crossword_matrix_rotated.map(row => row.join('')),
    ...get_all_diagonals(crossword_matrix),
    ...get_all_diagonals(crossword_matrix_rotated)
  ].reduce((acc, str_to_check) => acc + count_xmas_in_string(str_to_check), 0);
}

// Traverse a 2d matrix diagonally, get diagonal segment as an array
const get_all_diagonals = (search_matrix: string[][]): string[] => {
  const diagonals: string[] = [];
  const height = search_matrix.length;
  const width = search_matrix[0].length;

  // diagonally traverse 2d matrix building each string to explore
  for (let k = 0; k <= width + height - 2; k++) {
    let diagonal_string = '';
    for (let j = 0; j <= k; j++) {
      let i = k - j;
      if (i < height && j < width ) diagonal_string += search_matrix[i][j];
    }
    diagonals.push(diagonal_string);
  }
  return diagonals;
}

// Searchs for all instances substring XMAS (forward or reversed) including overlaps
export const count_xmas_in_string = (row: string): number => {
  let count = 0;
  for (let i = 0; i < row.length - 3; i++) {
    if (row.slice(i, i+4) === 'XMAS') count += 1;
    if (row.slice(i, i+4) === 'SAMX') count += 1;
  }
  return count;
}

// Advent of Code Day 4 Part 2
export const find_x_mas_count = (word_search: string[]): number => {
  let found_xmas_count = 0;
  const search_matrix = word_search.map(s => s.split(''));
  const height = search_matrix.length;
  const width = search_matrix[0].length;

  console.log(`Height: ${height}`);
  console.log(`Width: ${width}`);

  // run a 3x3 sliding window along all possible orientations of X shaped MAS
  for (let i = 0; i < height - 2; i++) {
    for (let j = 0; j < width - 2; j++) {
      if (search_matrix[i+1][j+1] === 'A') {
        const x_to_check = [
          search_matrix[i+0].slice(j, j+3),
          search_matrix[i+1].slice(j, j+3),
          search_matrix[i+2].slice(j, j+3),
        ];
        if (check_for_mas(x_to_check)) {
          found_xmas_count += 1;
        }
      }
    }
  }

  return found_xmas_count;
}

const check_for_mas = (window: string[][]): boolean => {
  // console.log(`Checking window:`);
  // window.forEach(row => console.log(row))
  let [down_vertical, up_vertical] = [false, false];
  if (window[0][0] === 'M' && window[2][2] === 'S') down_vertical = true;
  if (window[0][0] === 'S' && window[2][2] === 'M') down_vertical = true;
  if (window[2][0] === 'M' && window[0][2] === 'S') up_vertical = true;
  if (window[2][0] === 'S' && window[0][2] === 'M') up_vertical = true;
  return down_vertical && up_vertical;
}
