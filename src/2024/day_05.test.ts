import { check_rule, sort_pages_to_produce, sum_middle_pages, sum_misordered_middle_pages, validate_page } from "./day_05";

describe('day_5', () => {
  describe('helper functions', () => {
    describe('check_rule', () => {
      it('validates rule n1 comes before rule n2 in pages', () => {
        // given
        const rule = [47,53];
        const pages = [75,47,61,53,29]
  
        // when/then
        expect(check_rule(rule, pages)).toStrictEqual(true);
      });
  
      it('skips rules where both rule numbers dont exist in pages', () => {
        // given
        const rule = [1,2];
        const pages = [5,6,7,8,9]
  
        // when/then
        expect(check_rule(rule, pages)).toStrictEqual(true);
      })
  
      it('skips rules where rule n1 doesnt exist in pages', () => {
        // given
        const rule = [1,5];
        const pages = [5,6,7,8,9];
  
        // when/then
        expect(check_rule(rule, pages)).toStrictEqual(true);
      })
  
      it('skips rules where rule n1 doesnt exist in pages', () => {
        // given
        const rule = [5,1];
        const pages = [5,6,7,8,9];
  
        // when/then
        expect(check_rule(rule, pages)).toStrictEqual(true);
      })
  
      it('fails rules where n1 doesnt come before n2', () => {
          // given
          const rule = [6,5];
          const pages = [5,6,7,8,9];
    
          // when/then
          expect(check_rule(rule, pages)).toStrictEqual(false);
      })
    })

    describe('validate_page', () => {
      it('returns false when at least one rule is invalid', () => {
        // given
        const rules = [[6,5]];
        const pages = [5,6,7,8,9];
  
        // when/then
        expect(validate_page(rules, pages)).toStrictEqual(false);
      })

      it('returns false when results are mixed valid and invalid', () => {
        // given
        const rules = [[5,6], [6,5]];
        const pages = [5,6,7,8,9];
  
        // when/then
        expect(validate_page(rules, pages)).toStrictEqual(false);
      })

      it('returns true when at least all rules are valid', () => {
        // given
        const rules = [[5,6], [6,7], [5,7], [5,9]];
        const pages = [5,6,7,8,9];
  
        // when/then
        expect(validate_page(rules, pages)).toStrictEqual(true);
      })
    })

    describe('sort_pages_to_produce', () => {
      it('can inserts items first in item lists', () => {
        // given
        const input = [1,2,3];
        const rules = [`2|1`]

        // when/then
        expect(sort_pages_to_produce(rules, input)).toStrictEqual([2,1,3]);
      })

      it('can insert items between two other items', () => {
        // given
        const input = [1,2,3];
        const rules = [`1|3`, `3|2`]

        // when/then
        expect(sort_pages_to_produce(rules, input)).toStrictEqual([1,3,2]);
      })
    })
  });

  describe('end to end', () => {
    it('sum_middle_pages works on test input', () => {
      const full_test_input = [
        '47|53',
        '97|13',
        '97|61',
        '97|47',
        '75|29',
        '61|13',
        '75|53',
        '29|13',
        '97|29',
        '53|29',
        '61|53',
        '97|53',
        '61|29',
        '47|13',
        '75|47',
        '97|75',
        '47|61',
        '75|61',
        '47|29',
        '75|13',
        '53|13',
        '',
        '75,47,61,53,29',
        '97,61,53,29,13',
        '75,29,13',
        '75,97,47,61,53',
        '61,13,29',
        '97,13,75,29,47',
      ];

      expect(sum_middle_pages(full_test_input)).toStrictEqual(143);
    })

    it('sum_middle_pages works on test input', () => {
      const full_test_input = [
        '47|53',
        '97|13',
        '97|61',
        '97|47',
        '75|29',
        '61|13',
        '75|53',
        '29|13',
        '97|29',
        '53|29',
        '61|53',
        '97|53',
        '61|29',
        '47|13',
        '75|47',
        '97|75',
        '47|61',
        '75|61',
        '47|29',
        '75|13',
        '53|13',
        '',
        '75,47,61,53,29',
        '97,61,53,29,13',
        '75,29,13',
        '75,97,47,61,53',
        '61,13,29',
        '97,13,75,29,47',
      ];

      expect(sum_misordered_middle_pages(full_test_input)).toStrictEqual(123);
    })
  })
})