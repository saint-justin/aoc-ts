import { find_ones_and_twos, find_ones_and_twos_product, get_layer_count, get_layer_with_fewest_zeros, Layer, split_into_layers } from "./day_08";

describe('day_08', () => {
  describe('helpers', () => {
    test('get_layer_count', () => {
      // given
      const all_layers = '123456789012';
      const width = 3;
      const height = 2;

      const expected_output = 2;

      // when
      const actual_output = get_layer_count(all_layers, height, width);
      
      // then
      expect(actual_output).toStrictEqual(expected_output);
    });

    test('split_into_layers', () => {
      // given
      const all_layers = '123456789012';
      const width = 3;
      const height = 2;
      const layer_count = 2;

      const expected_layers: Layer[] = [
        [
          '123',
          '456'
        ], 
        [
          '789',
          '012'
        ]
      ]

      // when
      const actual_layers = split_into_layers(all_layers, height, width, layer_count);

      // then
      expect(actual_layers).toStrictEqual(expected_layers);
    })

    describe('get_index_of_layer_with_fewest_zeros', () => {
      test('zero hits', () => {
        // given
        const layer1 = [
          '123',
          '456'
        ];

        const layer2 = [
          '789',
          '012'
        ];

        const layers: Layer[] = [layer1, layer2];

        // when
        const fewest_zeroes_layer = get_layer_with_fewest_zeros(layers);

        // then
        expect(fewest_zeroes_layer).toStrictEqual(layer1);
      })

      test('two  zeroes', () => {
        // given
        const layer1 = [
          '100',
          '450'
        ];

        const layer2 = [
          '780',
          '012'
        ];

        const layers: Layer[] = [layer1, layer2];

        // when
        const fewest_zeroes_layer = get_layer_with_fewest_zeros(layers);

        // then
        expect(fewest_zeroes_layer).toStrictEqual(layer2);
      })
    })
  })

  test('find_zeroes_and_ones', () => {
    // given
    const input = '111222789012';
    const expected_output = 9;

    // when
    const actual_output = find_ones_and_twos(3, 2, input);

    // then
    expect(expected_output).toStrictEqual(actual_output);
  })
})