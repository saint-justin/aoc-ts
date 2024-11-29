import { find_resulting_frequency, find_first_dup_frequency } from './day_01';
import { find_checksum_for_box_ids } from './day_02';

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
      console.log('Box checksum: ' + box_checksum);
      break;
    }
    
    default:
      throw new Error(`Solution for day ${day} not implemented`)
  }
}