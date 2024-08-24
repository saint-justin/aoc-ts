import { findFuelRequirements, findRecursiveFuel } from "./day_01";
import { calculateValueAtZero, findInputPair } from "./day_02";

export default (day: number, input: string[]) => {
  switch (day) {
    case 1:
      const fuelRequirements = findFuelRequirements(input);
      const recursiveFuelRequired = findRecursiveFuel(input);
      console.log('Fuel Requirements:       ' + fuelRequirements);
      console.log('Recursive Fuel Required: ' + recursiveFuelRequired);
      break;

    case 2:
      const valueAtPositionZero = calculateValueAtZero(input);
      const pairOutput = findInputPair(input);
      console.log('Value at position 0: ' + valueAtPositionZero);
      console.log('Program Pair Output: ' + pairOutput);
      break;

    default:
      throw new Error(`Solution for day ${day} not implemented`)
  }
}