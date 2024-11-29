import { find_resulting_frequency, find_first_dup_frequency } from './day_01';
import { find_checksum_for_box_ids, find_common_letters_between_correct_box_ids } from './day_02';
import { find_square_inches_of_claimed_fabric, find_claim_with_no_overlap } from './day_03';

export default (day: number, input: string[]) => {
  switch (day) {
    case 1: {
      const resulting_frequency = find_resulting_frequency(input);
      const first_dup_frequency = find_first_dup_frequency(input);
      console.log('Resulting frequency: ' + resulting_frequency);
      console.log('First dup frequency: ' + first_dup_frequency);
      break;
    }

    case 2: {
      const box_checksum = find_checksum_for_box_ids(input);
      const box_id_diff = find_common_letters_between_correct_box_ids(input);
      console.log('Box checksum:   ' + box_checksum);
      console.log('Box IDs diffed: ' + box_id_diff);
      break;
    }

    case 3: {
      const claimed_fabric = find_square_inches_of_claimed_fabric(input);
      const no_overlap_id = find_claim_with_no_overlap(input);
      console.log('Sq Inches of Fabric Claimed 2+ Times: ' + claimed_fabric);
      console.log('ID for Claim No Overlapping Fabric:   ' + no_overlap_id);
      break;
    }
    
    default:
      throw new Error(`Solution for day ${day} not implemented`)
  }
}