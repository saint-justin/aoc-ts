import { 
  ComputerState, 
  run, 
} from "./Computer";
import { Instruction } from "./Instructions";

describe("run function", () => {
  test("Internal state memory parses input correctly", () => {
    // given
    const input = ["99,0,1,2,3,4,5,6,7,8,9,10"];
    const expected_state: ComputerState = {
      memory: [99, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      instr_ptr: 0,
      param_mode: 0,
    }

    // when
    const actual_state = run(input, [], new Map());

    // then
    expect(actual_state).toStrictEqual(expected_state);
  });

  describe("Validating prerun behavior", () => {
    test("Validating one prerun function correctly modifies memory", () => {
      // given
      const default_input = ["99,0,0,0,0"];
      const prerun_instr: Instruction = ({ instr_ptr, memory }: ComputerState) => {
        const mem_clone = [...memory];
        mem_clone[1] = 1;
        mem_clone[2] = 2;
        return {
          instr_ptr,
          memory: mem_clone,
        }
      }
      const expected_state: ComputerState = {
        memory: [ 99, 1, 2, 0, 0 ],
        instr_ptr: 0,
        param_mode: 0,
      }

      // when
      const actual_state = run(default_input, [prerun_instr], new Map());

      // then
      expect(actual_state).toStrictEqual(expected_state);
    })

    test("Validating multiple prerun functions correctly modify memory", () => {
      // given
      const default_input = ["99,0,0,0,0"];
      const prerun_1: Instruction = (state: ComputerState) => {
        const mem_clone = [...state.memory];
        mem_clone[1] = 1;
        return {
          ...state, 
          memory: mem_clone,
        }
      }
      const prerun_2: Instruction = (state: ComputerState) => {
        const mem_clone = [...state.memory];
        mem_clone[2] = 2;
        return {
          ...state,
          memory: mem_clone,
        }
      }
      const expected_state: ComputerState = {
        memory: [99, 1, 2, 0, 0],
        instr_ptr: 0,
        param_mode: 0,
      }

      // when
      const actual_state = run(default_input, [prerun_1, prerun_2], new Map());

      // then
      expect(actual_state).toStrictEqual(expected_state);
    })
  })

  describe("Validating opcode behavior", () => {
    test("Halt instruction escapes program, returning state", () => {
      // given
      const default_input = ["99,0,0,0,0"];
      const default_state: ComputerState = {
        memory: [99, 0, 0, 0, 0],
        instr_ptr: 0,
        param_mode: 0,
      }
      

      // when
      const actual_state = run(default_input, [], new Map());

      // then
      expect(actual_state).toStrictEqual(default_state);
    });

    test("Invalid opcode throws error", () => {
      // given
      const invalid_memory = ["1,0,0,0,0"];

      // when
      const throw_err = () => run(invalid_memory, [], new Map());

      // then
      expect(throw_err).toThrow(Error);
      expect(throw_err).toThrow("Invalid opcode recieved: 1 vs opcodes recognized: [99]")
    });
  });

  describe("Validating instr_ptr throws when invalid", () => {
    test("Negative instr_ptr throws error", () => {
      // given
      const input = ["1,0,0,0,0"];
      const invalid_instr_ptr = -1;
      const broken_instruction: Instruction = (state: ComputerState) => {
        return {
          memory: state.memory,
          instr_ptr: invalid_instr_ptr,
        }
      }

      // when
      const throw_err = () => run(input, [], new Map<number, Instruction>([
        [1, broken_instruction]
      ]))

      // then
      expect(throw_err).toThrow(Error);
      expect(throw_err).toThrow(`Invalid instr_ptr State: Pointer at ${invalid_instr_ptr}, mem size is 5`);
    });

    test("Overflow instr_ptr throws error", () => {
      // given
      const input = ["1,0,0,0,0"];
      const invalid_instr_ptr = 100;
      const broken_instruction: Instruction = (state: ComputerState) => {
        return {
          memory: state.memory,
          instr_ptr: invalid_instr_ptr,
        }
      }

      // when
      const throw_err = () => run(input, [], new Map<number, Instruction>([
        [1, broken_instruction]
      ]))

      // then
      expect(throw_err).toThrow(Error);
      expect(throw_err).toThrow(`Invalid instr_ptr State: Pointer at ${invalid_instr_ptr}, mem size is 5`);
    });
  })
})



