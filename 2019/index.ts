import { findFuelRequirements, findRecursiveFuel } from "./day_01";

export default (day: number, input: string[]) => {
  switch (day) {
    case 1:
      const fuelRequirements = findFuelRequirements(input);
      const recursiveFuelRequired = findRecursiveFuel(input);
      console.log('Fuel Requirements:       ' + fuelRequirements);
      console.log('Recursive Fuel Required: ' + recursiveFuelRequired);
  }
}