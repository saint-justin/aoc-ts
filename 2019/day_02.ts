import { run, add, multiply, Instruction, ComputerState } from './shared/Computer';

// Valid instructions for Day 2
const instruction_set = new Map<number, Instruction>([
  [1, add],
  [2, multiply],
])

// 2019, Day 1 Part 1 -- https://adventofcode.com/2019/day/1
export const calculateValueAtZero = (input: string[]) => {
  const setup_1202: Instruction = ({ instr_ptr, memory }: ComputerState) => {
    const mem_clone = [...memory];
    mem_clone[1] = 12;
    mem_clone[2] = 2;
    return {
      instr_ptr, 
      memory: mem_clone,
    }
  }

  const output: ComputerState = run(input, [setup_1202], instruction_set);
  return output.memory[0];
}

// 2019, Day 1 Part 2 -- https://adventofcode.com/2019/day/2
export const findInputPair = (input: string[]) => {
  const generate_setup_for_pair = (noun: number, verb: number): Instruction => {
    return ({ instr_ptr, memory }: ComputerState) => {
      const mem_clone = [...memory];
      mem_clone[1] = noun;
      mem_clone[2] = verb;
      return {
        instr_ptr,
        memory: mem_clone,
      }
    }
  }

  const expected_output = 19690720;
  for (let noun=0; noun<=99; noun++) {
    for (let verb=0; verb<99; verb++) {
      let setup = generate_setup_for_pair(noun, verb);
      const actual_output: ComputerState = run(input, [setup], instruction_set);
      if (actual_output.memory[0] === expected_output)  {
        console.log(`  Noun: ${noun}\n  Verb: ${verb}`);
        return 100 * noun + verb;
      }
    }
  }

  throw new Error(`Out of Options, Value Pair Not Found`);
}