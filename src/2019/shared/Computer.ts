import { Instruction } from "./Instructions";

export interface ComputerState {
  memory: number[];
  instr_ptr: number;
  param_mode: number;
}


/**
 * Run your customized intcode computer by passing in the setup params, any prerun instructions,
 * and the instruction set (opcode/instruction pairs)
 * @param input 
 * @param prerun 
 * @param instruction_set 
 */
export const run = (input: string[], prerun: Instruction[], instruction_set: Map<number, Instruction>) => {
  // Initial State Setup
  let state: ComputerState = {
    memory: input[0].split(',').map(s => parseInt(s)),
    instr_ptr: 0,
    param_mode: 0,
  };

  const printState = () => {
    // Uncomment for verbose debug logs
    // console.log("  Updated State:");
    // console.log("  " + state);
  }
  printState()

  // Prerun Instructions
  if (prerun.length > 0) {
    state = prerun.reduce((modified_state, instruction) => ({ ...modified_state, ...instruction(modified_state) }), state);
    printState();
  }

  // Run the intcode machine based on the instructions passed in
  while (true) {
    const { instr_ptr, memory } = state;

    // Validate instr_ptr is pointing to a valid location
    if (instr_ptr < 0 || instr_ptr >= memory.length) {
      printState();
      throw new Error(`Invalid instr_ptr State: Pointer at ${instr_ptr}, mem size is ${memory.length}`);
    }

    // Return state if halt is next opcode
    if (memory[instr_ptr] === 99) {
      printState();
      return state;
    }

    // Validate next opcode to call
    const opcode = memory[instr_ptr];
    if (!instruction_set.has(opcode)) {
      const valid_opcodes = [99, ...Array.from(instruction_set.keys())];
      throw new Error(`Invalid opcode recieved: ${opcode} vs opcodes recognized: [${valid_opcodes}]`)
    }

    // Run instruction and cointinue loop
    const instruction = instruction_set.get(opcode);
    if (!instruction) {
      throw new Error(`Invalid instruction for opcode: ${opcode}`); 
    }
    state = { ...state, ...instruction(state)};
  }
}
