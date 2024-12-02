import { find_similarity_score_between_lists, find_total_distance_between_lists } from "./day_01";
import { count_safe_reports, count_safe_reports_with_dampening } from "./day_02";

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

    default: 
      throw new Error(`Solution for day ${day} not implemented`)
  }
}