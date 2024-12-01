import { find_similarity_score_between_lists, find_total_distance_between_lists } from "./day_01";

export default (day: number, input: string[]) => {
  switch (day) {
    case 1: {
      const list_distance = find_total_distance_between_lists(input);
      const similarity_score = find_similarity_score_between_lists(input);
      console.log('Distance between lists: ' + list_distance);
      console.log('List similarity score:  ' + similarity_score);
      break;
    }

    default: 
      throw new Error(`Solution for day ${day} not implemented`)
  }
}