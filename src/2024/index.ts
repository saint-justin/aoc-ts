import { find_similarity_score_between_lists, find_total_distance_between_lists } from "./day_01";
import { count_safe_reports, count_safe_reports_with_dampening } from "./day_02";
import { find_enabled_mul_sum, find_mul_sum } from "./day_03";
import { find_x_mas_count, find_xmas_count } from "./day_04";
import { sum_middle_pages, sum_misordered_middle_pages } from "./day_05";
import { count_looping_obstructions, count_spaces_traversed } from "./day_06";
import { find_base_calibration_result, find_expanded_calibration_result } from "./day_07";
import { count_antinodes_in_bounds, count_repeating_antinodes_in_bounds } from "./day_08";
import { files_by_block_checksum } from "./day_09";
import { sum_trailhead_ratings, sum_trailhead_scores } from "./day_10";
import { count_stones_after_25_blinks } from "./day_11";

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

    case 5: {
      const middle_page_sum = sum_middle_pages(input);
      const misordered_middle_page_sum = sum_misordered_middle_pages(input)
      console.log('Sum of sorted middle pages:     ' + middle_page_sum);
      console.log('Sum of misordered middle pages: ' + misordered_middle_page_sum);
      break;
    }


    case 6: {
      const spaces_traversed = count_spaces_traversed(input);
      const locations_for_loops = count_looping_obstructions(input)
      console.log('Unique Spaces Traversed:                  ' + spaces_traversed);
      console.log('Locations where Obstructions Cause Loops: ' + locations_for_loops);
      break;
    }

    case 7: {
      const base_calibration_result = find_base_calibration_result(input);
      const expanded_calibration_result = find_expanded_calibration_result(input);
      console.log('Base Calibration Result:     ' + base_calibration_result);
      console.log('Expanded Calibration Result: ' + expanded_calibration_result);
      break;
    }

    case 8: {
      const antinodes_in_bounds = count_antinodes_in_bounds(input);
      const repeating_antinodes_in_bounds = count_repeating_antinodes_in_bounds(input);
      console.log('Antinodes within Bounds: ' + antinodes_in_bounds);
      console.log('Repeating antinodes within Bounds: ' + repeating_antinodes_in_bounds);
      break;
    }

    case 9: {
      // Day 9 Part 1 is lost to the void, not sure where it went. 
      // I did an in-place sort + swapping shenanigans.
      const by_block_checksum = files_by_block_checksum(input);
      console.log('Checksum when moving full files: ' + by_block_checksum);
      break;
    }

    case 10: {
      const trailhead_score_sum = sum_trailhead_scores(input);
      const trailhead_rating_sum = sum_trailhead_ratings(input)
      console.log('Trailhead Score Sum: ' + trailhead_score_sum);
      console.log('Trailhead Rating Sum: ' + trailhead_rating_sum);
      break;
    }

    case 11: {
      const stones_after_25_blinks = count_stones_after_25_blinks(input);
      console.log('Stones after 25 Blinks: ' + stones_after_25_blinks);
      break;
    }

    default: 
      throw new Error(`Solution for day ${day} not implemented`)
  }
}