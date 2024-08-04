import { run, add, multiply, Instruction, ComputerState } from './shared/Computer';

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

    const instructions_set = new Map<number, Instruction>([
        [1, add],
        [2, multiply],
    ])

    const output = run(input, [setup_1202], instructions_set);
    return output.memory[0];
}
