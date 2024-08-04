export interface ComputerState {
  memory: number[];
  instr_ptr: number;
}

export type Instruction = (state: ComputerState) => ComputerState;

/**
 * Runs the add opcode functionality, adds numbers from memory at positions 
 * instr_ptr+1 and instr_ptr+2 and saves the sum into instr_ptr+3 then 
 * increments instr_ptr by 4. 
 * 
 * @param ComputerState Current state of the computer function 
 * @returns State of the function after running the add command
 */
export const add: Instruction = ({ memory, instr_ptr }: ComputerState): ComputerState => {
  const [addend_addr1, addend_addr2, sum_addr] = memory.slice(instr_ptr + 1, instr_ptr + 4);
  const mem_clone = [...memory];
  mem_clone[sum_addr] = mem_clone[addend_addr1] + mem_clone[addend_addr2];
  return { 
    memory: mem_clone, 
    instr_ptr: instr_ptr + 4
  };
}

/**
 * Runs the multiply opcode functionality, multiplies numbers from memory at positions 
 * instr_ptr+1 and instr_ptr+2 and saves the product into instr_ptr+3 then 
 * increments instr_ptr by 4. 
 * 
 * @param ComputerState Current state of the computer function 
 * @returns State of the function after running the add command
 */
export const multiply: Instruction = ({ memory, instr_ptr }: ComputerState): ComputerState => {
  const [factor_addr_1, factor_addr_2, product_addr] = memory.slice(instr_ptr + 1, instr_ptr + 4);
  const mem_clone = [...memory];
  mem_clone[product_addr] = mem_clone[factor_addr_1] * mem_clone[factor_addr_2];
  return {
    memory: mem_clone,
    instr_ptr: instr_ptr + 4
  };
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
    instr_ptr: 0
  };
  const printState = () => {
    // Uncomment for verbose debug logs
    // console.log("  Updated State:");
    // console.log("  " + state);
  }
  printState()

  // Prerun Instructions
  if (prerun.length > 0) {
    console.log(`  Running ${prerun.length} prerun instructions...`)
    state = prerun.reduce((updated_state, instruction) => instruction(updated_state), state);
    console.log("  Prerun instructions completed.");
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
      console.log("  HALT command recieved");
      return state;
    }

    // Validate next opcode to call
    const opcode = memory[instr_ptr];
    if (!instruction_set.has(opcode)) {
      const valid_opcodes = [99, ...Array.from(instruction_set.keys())];
      throw new Error(`Invalid opcode recieved: ${opcode} vs opcodes recognized: [${valid_opcodes}]`)
    }

    // Run instruction and cointinue loop
    console.log(`  running instruction with opcode: ${memory[instr_ptr]}`)
    state = instruction_set.get(opcode)!(state);
  }
}

