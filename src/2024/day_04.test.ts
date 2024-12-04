import { find_xmas_count, count_xmas_in_string, find_x_mas_count } from "./day_04"

describe('day_03', () => {
  describe('unit tests',  () => {
    it('finds XMAS string forwards', () => {
      expect(count_xmas_in_string('AAAAXMASAAAA')).toStrictEqual(1);
      expect(count_xmas_in_string('XMASAAAA')).toStrictEqual(1);
      expect(count_xmas_in_string('AAAAXMAS')).toStrictEqual(1);
      expect(count_xmas_in_string('XMAS')).toStrictEqual(1);
    })

    it('finds XMAS string backwards', () => {
      expect(count_xmas_in_string('AAAASAMXAAAA')).toStrictEqual(1);
      expect(count_xmas_in_string('SAMXAAAA')).toStrictEqual(1);
      expect(count_xmas_in_string('AAAASAMX')).toStrictEqual(1);
      expect(count_xmas_in_string('SAMX')).toStrictEqual(1);
    })

    it('finds overlapping XMAS strings', () => {
      expect(count_xmas_in_string('AAAXMASAMXAAAA')).toStrictEqual(2);
      expect(count_xmas_in_string('AAASAMXMASAAAA')).toStrictEqual(2);
    })

    it('finds all horizontal XMAS strings', () => {
      const matrix = [
        'XMASAMX',
        'SAMXMAS',
        '...XMAS',
        '...SAMX',
        '.......',
      ];
      expect(find_xmas_count(matrix)).toStrictEqual(6);
    })

    it('finds all vertical XMAS strings', () => {
      const matrix = [
        'X.S.X.S.',
        'M.A.M.A.',
        'A.M.A.M.',
        'S.X.S.X.',
        'A.M.....',
        'M.A.....',
        'X.S.....',
      ];
      expect(find_xmas_count(matrix)).toStrictEqual(6);
    })

    it('finds all horizontal up XMAS strings', () => {
      const matrix = [
        '...S..S',
        '..A..A.',
        '.M..M..',
        'X..X..X',
        '..M..M.',
        '.A..A..',
        'S..S...',
      ];
      expect(find_xmas_count(matrix)).toStrictEqual(4);
    })

    it('finds all horizontal down XMAS strings', () => {
      const matrix = [
        'X..X...',
        '.M..M..',
        '..A..A.',
        'S..S..S',
        '.A..A..',
        '..M..M.',
        '...X..X',
      ];
      expect(find_xmas_count(matrix)).toStrictEqual(4);
    })

    it('finds x-mas crossing down', () => {
      const matrix = [
        'M.M',
        '.A.',
        'S.S',
      ];

      expect(find_x_mas_count(matrix)).toStrictEqual(1);
    })
  })
})