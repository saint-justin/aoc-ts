/**
 * Sorts the children of each node in the given array of orbits and returns a map of nodes to their sorted children.
 *
 * @param {string[]} orbits - An array of strings representing direct orbits in the format "A)B" where B orbits A.
 * @returns {Map<string, string[]>} A map where the key is a node and the value is an array of its sorted children nodes.
 *
 * @example
 * const orbits = ['COM)B', 'B)C', 'COM)D', 'D)E'];
 * const sortedOrbitMap = sort_children(orbits);
 * console.log(sortedOrbitMap.get('B')); 
 * // The output map will look like:
 * // ["COM", ["B", "D"]],
 * // ["B", ["C"]],
 * // ["D", ["E"]]
 */
export const sort_children = (input: string[]): Map<string, string[]> => {
  const orbit_map = new Map<string, string[]>();
  for (const orbit of input) {
    const [parent, child] = orbit.split(')');
    if (orbit_map.has(parent)) {
      orbit_map.set(parent, [...orbit_map.get(parent)!, child])
    } else {
      orbit_map.set(parent, [child]);
    }
  }
  return orbit_map;
}

type OrbitDepth = [string, number];

/**
 * Calculates the total number of direct and indirect orbits in a given map of orbits
 * representing by a series of strings.
 *
 * @param {string[]} input - The prompt input.
 * @returns {number} The total number of direct and indirect orbits.
 */
export const find_direct_and_indirect_orbits = (input: string[]): number => {
  const orbit_map = sort_children(input);

  let total = 0;
  const to_explore: OrbitDepth[] = [["COM", 0]];
  let current: OrbitDepth | undefined = to_explore.pop();

  while (current != undefined) {
    const [orbit_name, depth] = current;
    console.log(`Checking for orbit ${orbit_name}`)
    if (!orbit_map.has(orbit_name)) {
      console.log('Leaf node found, skipping')
      total += depth;
      current = to_explore.pop();
      continue;
    }

    for (const child_name of orbit_map.get(orbit_name)!) {
      to_explore.push([child_name, depth + 1]);
    }

    total += depth;
    current = to_explore.pop();
  }
  return total;
}