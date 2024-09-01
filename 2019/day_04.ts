/**
 * Checks if a given number has exactly six digits.
 * 
 * @param {number} num - The number to check.
 * @returns {boolean} result.
 */
export const has_six_digits = (n: number): boolean => {
  return n.toString().length === 6
}

/**
 * Checks if a given number contains at least one pair of adjacent digits that are the same.
 * 
 * @param {number} num - The number to check.
 * @returns {boolean} result
 */
export const contains_adjacent_double = (n: number): boolean => {
  const n_as_chars = n.toString().split('');
  for(let i=0; i<n_as_chars.length - 1; i++) {
    if(n_as_chars[i] === n_as_chars[i+1]) return true;
  }
  return false;
}

/**
 * Checks if a given number contains at least one pair of adjacent digits that are the same 
 * and not part of a larger group of matching digits.
 * 
 * @param {number} num - The number to check.
 * @returns {boolean} result.
 */
export const contains_adjacent_exact_double = (n: number): boolean => {
  const n_as_chars = n.toString().split('');
  let match_count = 1;
  for (let i = 0; i < n_as_chars.length - 1; i++) {
    if (n_as_chars[i] === n_as_chars[i + 1]) match_count += 1;
    else {
      if (match_count === 2) return true;
      else match_count = 1;
    }
  }

  return match_count === 2;
}

/**
 * Checks if the digits in a given number never decrease from left to right.
 * 
 * @param {number} num - The number to check.
 * @returns {boolean} True if the digits never decrease, false otherwise.
 */
export const never_decreases = (n: number): boolean => {
  let min = 0;
  for (const num of n.toString().split('').map(n => parseInt(n))) {
    if (num < min) return false;
    else if (num === min) continue;
    else min = num;
  }
  return true;
}

/**
 * Counts the number of valid passwords within a given range that meet 
 * specific criteria.
 * 
 * @param {string[]} input - Input in the form of "RANGE_START-RANGE_END".
 * @returns {number} The count of valid passwords.
 */
export const count_valid_passwords = (input: string[]): number => {
  let total_valid_passwords = 0;
  const [range_min, range_max] = input[0].split('-').map(s => parseInt(s));
  for (let i=range_min; i<= range_max; i++) {
    if (has_six_digits(i) && contains_adjacent_double(i) && never_decreases(i)) {
      total_valid_passwords += 1;
    }
  }
  return total_valid_passwords;
}

/**
 * Counts the number of valid passwords within a given range that meet 
 * stricter criteria.
 * 
 * @param {string[]} input - Input in the form of "RANGE_START-RANGE_END".
 * @returns {number} The count of valid passwords.
 */
export const count_valid_passwords_strict = (input: string[]): number => {
  let total_valid_passwords = 0;
  const [range_min, range_max] = input[0].split('-').map(s => parseInt(s));
  for (let i = range_min; i <= range_max; i++) {
    if (has_six_digits(i) && contains_adjacent_exact_double(i) && never_decreases(i)) {
      total_valid_passwords += 1;
    }
  }
  return total_valid_passwords;
}