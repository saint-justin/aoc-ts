import { ComputerState } from "./Computer";

export type Instruction = (state: ComputerState) => Partial<ComputerState>;

/**
 * Runs the add opcode functionality, adds numbers from memory at positions 
 * instr_ptr+1 and instr_ptr+2 and saves the sum into instr_ptr+3 then 
 * increments instr_ptr by 4. 
 * 
 * @param ComputerState Current state of the computer function 
 * @returns State of the function after running the add command
 */
export const add: Instruction = ({ memory, instr_ptr,  }: ComputerState) => {
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
export const multiply: Instruction = ({ memory, instr_ptr }: ComputerState) => {
  const [factor_addr_1, factor_addr_2, product_addr] = memory.slice(instr_ptr + 1, instr_ptr + 4);
  const mem_clone = [...memory];
  mem_clone[product_addr] = mem_clone[factor_addr_1] * mem_clone[factor_addr_2];
  return {
    memory: mem_clone,
    instr_ptr: instr_ptr + 4,
  };
}

/**
 * Takes in a single integer as input and saves it to the position given by its only parameter.
 * e.g. an input param [3,50] indicates the store_value instruction will store a given
 * input at the value of 50;
 * 
 * @param ComputerState Current state of the computer function 
 * @returns State of the function after running the add command
 */
export const store_value: Instruction = ({ memory, instr_ptr}: ComputerState) => {
  throw new Error();
}

/**
 * Outputs the value of the only parameter.
 * 
 * @param ComputerState Current state of the computer function 
 * @returns State of the function after running the add command
 */
export const output_value: Instruction = ({ memory, instr_ptr}: ComputerState) => {
  throw new Error();
}