// 2024, Day 5 Part 1 -- https://adventofcode.com/2024/day/5
export const sum_middle_pages = (input: string[]): number => {
  const [rules, pages_to_produce] = parse_rules_and_pages(input);
  return pages_to_produce.filter(page => validate_page(rules, page))
    .map(valid_pages => valid_pages[Math.floor(valid_pages.length/2)])
    .reduce((acc, n) => n + acc);
}

// 2024, Day 5 Part 2 -- https://adventofcode.com/2024/day/5#part2
export const sum_misordered_middle_pages = (input: string[]): number => {
  const [rules, pages_to_produce_in_update] = parse_rules_and_pages(input);
  const rule_as_str = rules.map(([l, r]) => `${l}|${r}`);

  return pages_to_produce_in_update.filter(page => !validate_page(rules, page))
    .map(pages_to_produce => sort_pages_to_produce(rule_as_str, pages_to_produce))
    .map(valid_pages => valid_pages[Math.floor(valid_pages.length/2)])
    .reduce((acc, n) => n + acc);
}

// Parse out all the rules and pages from the initial input
const parse_rules_and_pages = (printer_rules: string[]): [number[][], number[][]] => {
  const rules: number[][] = [];
  const pages_per_update: number[][] = [];
  let printing_rules = true;
  for (const line of printer_rules) {
    if (line === '') {
      printing_rules = false;
      continue;
    };

    if (printing_rules) rules.push(line.split('|').map(page => parseInt(page)));
    else pages_per_update.push(line.split(',').map(page => parseInt(page)));
  }
  return [rules, pages_per_update]
}

// Checks whether a given rule is upheld for an arr of pages
export const check_rule = (rules: number[], pages: number[]): boolean => {
  const [before, after]: number[] = rules.map(n => pages.indexOf(n));
  if ([before, after].includes(-1)) return true; // one of the numbers doesn't exist in pages, no need to check
  return before < after; // return check
}

// checks if every rule in an array is upheld for an arr of pages
export const validate_page = (rules: number[][], pages: number[]): boolean => {
  return rules.every(rule => check_rule(rule, pages))
}

// sorts any array of pages according to a set of rules
export const sort_pages_to_produce = (rules: string[], pages: number[]): number[] => {
  return pages.toSorted(
    (a: number, b: number ): number => {
      if (rules.includes(`${a}|${b}`)) return -1; // shift up
      if (rules.includes(`${b}|${a}`)) return 1;  // shift back
      return 0;                                   // position ok
    }
  );
}