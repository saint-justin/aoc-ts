export type Layer = string[];

/** Helper to find the amount of layers in a given image */
export const get_layer_count = (all_layers: string, height: number, width: number): number => {
  const chars_per_layer = height * width;
  return all_layers.length / chars_per_layer;
}

/** Splits an input into a series of layers */
export const split_into_layers = (input: string, height: number, width: number, layer_count: number) => {
  const layers: Layer[] = [];

  for (let layer_start = 0; layer_start < input.length; layer_start += height * width) {
    const new_layer: Layer = [];
    for (let row_in_layer = 0; row_in_layer < height; row_in_layer += 1) {
      const slice_start_index = layer_start + (row_in_layer * width);
      const row_slice = input.slice(slice_start_index, slice_start_index + width);
      new_layer.push(row_slice);
    }
    layers.push(new_layer);
  }
  
  return layers;
}

/** Finds layer with the fewest digits which are zero (0) */
export type FewestZeroes = [layer: Layer, count: number];
export const get_layer_with_fewest_zeros = (layers: Layer[]): Layer => {
  let fewest_zeroes: FewestZeroes = [[], Number.MAX_SAFE_INTEGER];
  layers.forEach((layer) => {
    const zero_count = (layer.join('').match(new RegExp("0", "g")) || []).length;
    if (zero_count === undefined) throw new Error("Regex broken")
    if (zero_count < fewest_zeroes[1]) {
      fewest_zeroes = [layer, zero_count];
    }
  });

  return fewest_zeroes[0];
}

/** Finds product of the count of characters '1' and '2'  */
export const find_ones_and_twos = (height: number, width: number, input: string) => {
  const layer_count = get_layer_count(input, height, width);
  const layers = split_into_layers(input, height, width, layer_count);
  const fewest_zeros_layer = get_layer_with_fewest_zeros(layers);

  const ones_count = (fewest_zeros_layer.join('').match(new RegExp("1", "g")) || []).length;
  const twos_count = (fewest_zeros_layer.join('').match(new RegExp("2", "g")) || []).length;
 
  return ones_count * twos_count;
}

/** Advent of Code Day 8, Part 1 */
export const find_ones_and_twos_product = (input: string[]): number => {
  const height = 6;
  const width = 25;
  return find_ones_and_twos(height, width, input[0])
}