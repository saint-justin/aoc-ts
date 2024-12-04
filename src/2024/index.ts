import { find_similarity_score_between_lists, find_total_distance_between_lists } from "./day_01";
import { count_safe_reports, count_safe_reports_with_dampening } from "./day_02";
import { find_enabled_mul_sum, find_mul_sum } from "./day_03";
import { find_x_mas_count, find_xmas_count } from "./day_04";

export default (day: number, input: string[]) => {
  switch (day) {
    case 1: {
      const list_distance = find_total_distance_between_lists(input);
      const similarity_score = find_similarity_score_between_lists(input);
      console.log('Distance between lists: ' + list_distance);
      console.log('List similarity score:  ' + similarity_score);
      break;
    }

    case 2: {
      const total_safe_reports = count_safe_reports(input);
      const safe_reports_with_dampening = count_safe_reports_with_dampening(input);
      console.log('Total Safe Reports: ' + total_safe_reports);
      console.log('Total Safe Reports w/ Dampening: ' + safe_reports_with_dampening);
      break;
    }

    case 3: {
      const sum_of_products = find_mul_sum(input);
      const sum_of_enabled_products = find_enabled_mul_sum(input);
      console.log('Sum of Products:         ' + sum_of_products);
      console.log('Sum of Enabled Products: ' + sum_of_enabled_products);
      break;
    }

    case 4: {
      const all_xmas_findings = find_xmas_count(input);
      const all_x_mas_findings = find_x_mas_count(input);
      console.log('All XMAS Count in Word Search:  ' + all_xmas_findings);
      console.log('All X-MAS Count in Word Search: ' + all_x_mas_findings);
      break;
    }

    default: 
      throw new Error(`Solution for day ${day} not implemented`)
  }
}