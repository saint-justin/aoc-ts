import { find_fuel_requirements, find_recursive_fuel_requirements } from "./day_01";
import { calculate_value_at_zero, find_input_pair } from "./day_02";
import { find_distance_from_port_to_nearest_intersection, find_distance_to_intersection_by_combined_steps } from "./day_03";
import { count_valid_passwords, count_valid_passwords_strict } from "./day_04";
import { find_direct_and_indirect_orbits } from "./day_06";

export default (day: number, input: string[]) => {
  switch (day) {
    case 1: {
      const fuel_requirements = find_fuel_requirements(input);
      const recursive_fuel_requirements = find_recursive_fuel_requirements(input);
      console.log('Fuel Requirements:       ' + fuel_requirements);
      console.log('Recursive Fuel Required: ' + recursive_fuel_requirements);
      break;
    }

    case 2: {
      const value_at_zero = calculate_value_at_zero(input);
      const input_pair = find_input_pair(input);
      console.log('Value at position 0: ' + value_at_zero);
      console.log('Program Pair Output: ' + input_pair);
      break;
    }

    case 3: {
      console.log(input);
      const nearest_crossed_wires = find_distance_from_port_to_nearest_intersection(input);
      const fewest_combined_steps = find_distance_to_intersection_by_combined_steps(input);
      console.log('Distance to Nearest Crossed Wires: ' + nearest_crossed_wires);
      console.log('Distance by Fewest Combined Steps: ' + fewest_combined_steps);
      break;
    }

    case 4: {
      const valid_password_count = count_valid_passwords(input);
      const valid_password_coun_strict = count_valid_passwords_strict(input);
      console.log('Total Valid Passwords in Range: ' + valid_password_count);
      console.log('Total Valid Passwords in Range Strict: ' + valid_password_coun_strict);
      break;
    }

    case 6: {
      const orbits = find_direct_and_indirect_orbits(input);
      console.log('Total Orbits: ' + orbits);
      break;
    }
    
    default:
      throw new Error(`Solution for day ${day} not implemented`)
  }
}