// Helpers for readability
const EMPTY_FILE_ID = -1;
interface File {
  id: number;
  width: number;
}

// 2024, Day 9 Part 1 is lost to the void 😔

// 2024, Day 9 Part 2 -- https://adventofcode.com/2024/day/9#part2
export const files_by_block_checksum = (input: string[]): bigint => {
  const disk_map = input[0].split('').map(s => parseInt(s));

  let snapshot: File[] = [];
  let current_id = 0;

  // Set up the initial disk map
  for (let i = 0; i < disk_map.length; i++) {
    snapshot.push({
      id: i % 2 === 1 ? EMPTY_FILE_ID : current_id,
      width: disk_map[i],
    });

    if (i % 2 === 0) current_id += 1;
  }

  // Iterate through each ID in reverse order, move them left if there is space
  while (current_id > 0) {
    current_id -= 1;
    if (current_id % 100 === 0) console.log(`  Running ID ${current_id}...`);
    const target_index = snapshot.findIndex(file => file.id === current_id);
    const target_file = snapshot[target_index];
    inner: for (let candidate_index=0; candidate_index < target_index; candidate_index++) {
      const candidate_file = snapshot[candidate_index];
      if (candidate_file.id === EMPTY_FILE_ID && candidate_file.width >= target_file.width) {
        if (target_file.width === candidate_file.width) {
          snapshot[candidate_index] = target_file;
          snapshot[target_index] = candidate_file;
          break inner;
        }

        const leftover_space: File = {
          id: EMPTY_FILE_ID,
          width: candidate_file.width - target_file.width,
        };
        
        snapshot.splice(target_index, 1, { id: EMPTY_FILE_ID, width: target_file.width });
        snapshot.splice(candidate_index, 1, target_file, leftover_space);
        break inner;
      }
    }

    snapshot = merge_empty_files(snapshot);
  }

  // calculate checksum
  let checksum: bigint = BigInt(0);
  let memory_address: bigint = BigInt(0);
  for (let i=0; i<snapshot.length; i++) {
    const current = snapshot[i];
    for (let j=0; j<current.width; j++) {
      if (current.id !== EMPTY_FILE_ID) checksum += BigInt(current.id) * BigInt(memory_address);
      memory_address += BigInt(1);
    }
  }

  return checksum;
}

// Helper to merge together any empty files chunks together 
// *Desperately* needs to be optimized (can be done in-place via back/forward stepping ?)
const merge_empty_files = (snapshot: File[]): File[] => {
  const clone = [...snapshot];
  let i=0;
  while (i < snapshot.length - 1) {
    if (clone[i].id === EMPTY_FILE_ID && clone[i+1].id === EMPTY_FILE_ID) {
      snapshot.splice(i, 2, { id: EMPTY_FILE_ID, width: clone[i].width + clone[i+1].width })
      continue;
    }

    i += 1;
  }
  return clone;
}

// Helper which prints out what a snapshot looks like, not used during execution
const stringify_snapshot = (snapshot: File[]) => {
  return snapshot.reduce((acc, file) => {
    let str = acc;
    for (let i=0; i<file.width; i++) {
      str += file.id === -1 ? '.' : file.id.toString();
    }
    return str;
  }, '')
}