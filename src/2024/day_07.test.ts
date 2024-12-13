import { evaluates_to_target, find_base_calibration_result, generate_test_operands } from "./day_07"

describe('day_07', () => {
  describe('helpers', () => {
    describe('generate_test_operands', () => {
      it ('should return base case for count 1', () => {
        // given
        const count = 1;
        const expected_return = [
          ['+'],
          ['*']
        ];
        
        // when/then
        expect(generate_test_operands(count)).toStrictEqual(expected_return);
      })

      it ('should return expanded base case for count 2', () => {
        // given
        const count = 2;
        const expected_return = [
          ['+', '+'],
          ['*', '+'],
          ['+', '*'],
          ['*', '*'],
        ];
        
        // when/then
        expect(generate_test_operands(count)).toStrictEqual(expected_return);
      })

      it ('should return expanded 2 count for count 3', () => {
        // given
        const count = 3;
        const expected_return = [
          ['+', '+', '+'],
          ['*', '+', '+'],
          ['+', '*', '+'],
          ['*', '*', '+'],
          ['+', '+', '*'],
          ['*', '+', '*'],
          ['+', '*', '*'],
          ['*', '*', '*'],
        ];
        
        // when/then
        expect(generate_test_operands(count)).toStrictEqual(expected_return);
      })
    })

    describe('can_evaluate_to_target', () => {
      it('escapes early if min is more than target', () => {
        // given
        const target = 1;
        const values = [10, 20, 30];

        // when/then
        expect(evaluates_to_target(target, values)).toStrictEqual(false);
      })

      it('escapes early if max is less than target', () => {
        // given
        const target = 1_000_000_000;
        const values = [1, 2, 3];

        // when/then
        expect(evaluates_to_target(target, values)).toStrictEqual(false);
      })

      it('returns false if no combonations work', () => {
        // given
        const target = 83;
        const values = [17, 5];

        // when/then
        expect(evaluates_to_target(target, values)).toStrictEqual(false);
      })

      it('returns true if some combonation works', () => {
        // given
        const target = 292;
        const values = [11, 6, 16, 20];

        // when/then
        expect(evaluates_to_target(target, values)).toStrictEqual(true);
      })
    })
  })

  describe('end-to-end', () => {
    describe('part_1', () => {
      const equations = [
        '190: 10 19',
        '3267: 81 40 27',
        '83: 17 5',
        '156: 15 6',
        '7290: 6 8 6 15',
        '161011: 16 10 13',
        '192: 17 8 14',
        '21037: 9 7 18 13',
        '292: 11 6 16 20',
      ];

      expect(find_base_calibration_result(equations)).toStrictEqual(3749);
    })
  })
})