import { ComputerState } from "./Computer";
import { add, multiply } from "./Instructions";

describe('"add" instruction', () => {
  test('Addition works targetting the same index', () => {
    // given
    const base_state: ComputerState = {
      memory: [1, 4, 4, 3, 5],
      instr_ptr: 0,
      param_mode: 0,
    };
    const expected_result: Partial<ComputerState> = {
      memory: [1, 4, 4, 10, 5],
      instr_ptr: 4,
    }

    // when
    const actual_result = add(base_state);

    // then
    expect(actual_result).toStrictEqual(expected_result);
  });

  test('Addition works targetting different indices', () => {
    // given
    const base_state: ComputerState = {
      memory: [1, 2, 4, 3, 5],
      instr_ptr: 0,
      param_mode: 0,
    };
    const expectedResult: Partial<ComputerState> = {
      memory: [1, 2, 4, 9, 5],
      instr_ptr: 4,
    }

    // when
    const actualResult = add(base_state);

    // then
    expect(actualResult).toStrictEqual(expectedResult);
  });
});

describe('"multiply" instruction', () => {
  test('Multiplication works targetting the same index', () => {
    // given
    const base_state: ComputerState = {
      memory: [1, 4, 4, 3, 5],
      instr_ptr: 0,
      param_mode: 0,
    };
    const expected_result: Partial<ComputerState> = {
      memory: [1, 4, 4, 25, 5],
      instr_ptr: 4,
    };

    // when
    const actual_result = multiply(base_state);

    // then
    expect(actual_result).toStrictEqual(expected_result);
  });

  test('Multiplication works targetting different indices', () => {
    // given
    const base_state: ComputerState = {
      memory: [1, 2, 4, 3, 5],
      instr_ptr: 0,
      param_mode: 0,
    };
    const expectedResult: Partial<ComputerState> = {
      memory: [1, 2, 4, 20, 5],
      instr_ptr: 4,
    }

    // when
    const actualResult = multiply(base_state);
    
    // then
    expect(actualResult).toStrictEqual(expectedResult);
  });
});
