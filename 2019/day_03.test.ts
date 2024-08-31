import { 
  Alignment, 
  Intersection, 
  LineSegment, 
  Point,
  find_alignment, 
  find_distance_from_port_to_nearest_intersection, 
  find_all_intersections, 
  find_next_pos_from_direction, 
  generate_segments_from_directions,
  get_distance_from,
  find_distance_to_intersection_by_combined_steps
} from "./day_03"

describe("day_03", () => {
  describe("helpers", () => {
    describe("find_next_pos_from_direction", () => {
      it.each([
        ['U1', { x: 0, y: 1  }],
        ['D1', { x: 0, y: -1 }],
        ['L1', { x: -1, y: 0 }],
        ['R1', { x:  1, y: 0 }],
      ])("Handles basic input '%s' correctly", (dir, expected_output) => {
        // given
        const current = { x: 0, y: 0 };
        
        // when
        const actual_output = find_next_pos_from_direction(current, dir);
        
        // then
        expect(actual_output).toStrictEqual(expected_output)
      })

      it("throws an error on invalid direction type", () => {
        // given
        const current = { x: 0, y: 0 };
        const dir = 'Z1';

        // when
        const throw_err = () => find_next_pos_from_direction(current, dir);

        // then
        expect(throw_err).toThrow(Error);
        expect(throw_err).toThrow(`Invalid direction passed: Z`)
      })
    })

    describe("find_alignment", () => {
      it("Finds vertical alignments correctly", () => {
        // given
        const p1 = { x: 0, y: 0 };
        const p2 = { x: 0, y: 1 };
        const expected_alignment = Alignment.VERTICAL;

        // when
        const actual_output = find_alignment(p1, p2);

        // then
        expect(actual_output).toStrictEqual(expected_alignment);
      })

      it("Finds horizontal alignments correctly", () => {
        // given
        const p1 = { x: 0, y: 0 };
        const p2 = { x: 1, y: 0 };
        const expected_alignment = Alignment.HORIZONTAL;

        // when
        const actual_output = find_alignment(p1, p2);

        // then
        expect(actual_output).toStrictEqual(expected_alignment);
      })

      it("Throws on diagonals", () => {
        // given
        const p1 = { x: 0, y: 1 };
        const p2 = { x: 1, y: 0 };
        const expected_alignment = Alignment.HORIZONTAL;

        // when
        const throw_err = () => find_alignment(p1, p2);

        // then
        expect(throw_err).toThrow(Error);
        expect(throw_err).toThrow('Alignment Diagonal for Points: [0,1] to [1,0]')
      })
    })

    describe("get_distance_from", () => {
      it.each([
        ['horizontal_right_1', { x: 0, y: 0 }, { x: 1, y: 0 }, 1],
        ['horizontal_left_4', { x: 4, y: 0 }, { x: 0, y: 0 }, 4],
        ['vertical_up_2', { x: 0, y: 0 }, { x: 0, y: 2 }, 2],
        ['horizontal_left_3', { x: 0, y: 3 }, { x: 0, y: 0 }, 3],
      ])("succeeds for test '%s'", (_testname, p1, p2, expected_distance) => {
        const actual_output = get_distance_from(p1, p2);
        expect(actual_output).toStrictEqual(expected_distance)
      }) 

      it("throws on a diagonal line", () => {
        // given
        const p1 = { x: 0, y: 1 };
        const p2 = { x: 1, y: 0 };

        // when
        const throw_err = () => get_distance_from(p1, p2);

        // then
        expect(throw_err).toThrow(Error);
        expect(throw_err).toThrow('Invalid diagonal connection between points: [0,1] [1,0]')
      })
    })

    describe("generate_segments_from_directions", () => {
      it("generates segments from simple directions", () => {
        // given
        const directions = ["U1","R2","D1","L2"];
        const expected_segments: LineSegment[] = [
          { leadup_length: 0, segment_length: 1, alignment: Alignment.VERTICAL, end_points:   [{ x: 0, y: 0 }, { x: 0, y: 1 }]},
          { leadup_length: 1, segment_length: 2, alignment: Alignment.HORIZONTAL, end_points: [{ x: 0, y: 1 }, { x: 2, y: 1 }]},
          { leadup_length: 3, segment_length: 1, alignment: Alignment.VERTICAL, end_points:   [{ x: 2, y: 1 }, { x: 2, y: 0 }]},
          { leadup_length: 4, segment_length: 2, alignment: Alignment.HORIZONTAL, end_points: [{ x: 2, y: 0 }, { x: 0, y: 0 }]}
        ]

        // when
        const actual_segments = generate_segments_from_directions(directions);

        // then
        expect(actual_segments.length).toStrictEqual(4);
        expect(actual_segments).toStrictEqual(expected_segments);
      })
    })

    describe("find_intersections", () => {
      it("Returns empty arr when line segments are both horizontal", () => {
        // given
        const segment_1: LineSegment = {
          alignment: Alignment.HORIZONTAL,
          end_points: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
          leadup_length: 0,
          segment_length: 0,
        }
        const segment_2: LineSegment = {
          alignment: Alignment.HORIZONTAL,
          end_points: [{ x: 0, y: 1 }, { x: 1, y: 1 }],
          leadup_length: 0,
          segment_length: 0,
        }
        const expected_result = [];

        // when
        const actual_result = find_all_intersections([segment_1], [segment_2]);

        // then
        expect(actual_result).toStrictEqual(expected_result);
      })

      it("Returns empty arr when line segments are both vertical", () => {
        // given
        const segment_1: LineSegment = {
          alignment: Alignment.VERTICAL,
          end_points: [{ x: 0, y: 0 }, { x: 0, y: 1 }],
          leadup_length: 0,
          segment_length: 0,
        }
        const segment_2: LineSegment = {
          alignment: Alignment.VERTICAL,
          end_points: [{ x: 1, y: 0 }, { x: 1, y: 1 }],
          leadup_length: 0,
          segment_length: 0,
        }
        const expected_result = [];

        // when
        const actual_result = find_all_intersections([segment_1], [segment_2]);

        // then
        expect(actual_result).toStrictEqual(expected_result);
      })

      it("Returns intersection point when first segment is horizontal", () => {
        // given
        const segment_1: LineSegment = {
          alignment: Alignment.HORIZONTAL,
          end_points: [{ x: 1, y: 0 }, { x: 2, y: 0 }],
          leadup_length: 0,
          segment_length: 0,
        }
        const segment_2: LineSegment = {
          alignment: Alignment.VERTICAL,
          end_points: [{ x: 1, y: 0 }, { x: 1, y: 1 }],
          leadup_length: 0,
          segment_length: 0,
        }
        const expected_result: Intersection[] = [{ pos: {x: 1, y: 0}, steps_to: 0 }];

        // when
        const actual_result = find_all_intersections([segment_1], [segment_2]);

        // then
        expect(actual_result).toStrictEqual(expected_result);
      })

      it("Returns intersection point when first segment is vertical", () => {
        // given
        const segment_1: LineSegment = {
          alignment: Alignment.VERTICAL,
          end_points: [{ x: 1, y: 0 }, { x: 1, y: 1 }],
          leadup_length: 0,
          segment_length: 0,
        }
        const segment_2: LineSegment = {
          alignment: Alignment.HORIZONTAL,
          end_points: [{ x: 1, y: 0 }, { x: 2, y: 0 }],
          leadup_length: 0,
          segment_length: 0,
        }
        const expected_result: Intersection[] = [{ pos: { x: 1, y: 0 }, steps_to: 0 }];

        // when
        const actual_result = find_all_intersections([segment_1], [segment_2]);

        // then
        expect(actual_result).toStrictEqual(expected_result);
      })

      it("Returns the correct amount of intersections with longer wires", () => {
        // given
        const wire_1 = generate_segments_from_directions('R8,U5,L5,D3'.split(','));
        const wire_2 = generate_segments_from_directions('U7,R6,D4,L4'.split(','));
        const expected_result: Intersection[] = [
          { pos: {x: 6, y: 5}, steps_to: 30 },
          { pos: {x: 3, y: 3}, steps_to: 40 },
        ]

        // when
        const actual_result = find_all_intersections(wire_1, wire_2);

        // then
        expect(actual_result.length).toStrictEqual(2);
        expect(actual_result).toStrictEqual(expected_result)
      })
    })
  })

  describe("part 1 end-to-end", () => {
    it.each([
      ['small_test_1', ['R8,U5,L5,D3', 'U7,R6,D4,L4'], 6],
      ['large_test_1', ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'], 159],
      ['large_test_2', ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'], 135],
    ])("succeeds for test '%s'", (_name, input, expected_output) => {
      const actual_output = find_distance_from_port_to_nearest_intersection(input);
      expect(actual_output).toStrictEqual(expected_output);
    })
  })

  describe("part 2 end-to-end", () => {
    it.each([
      ['small_test_1', ['R8,U5,L5,D3', 'U7,R6,D4,L4'], 30],
      ['large_test_1', ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'], 610],
      ['large_test_2', ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'], 410],
    ])("succeeds for test '%s'", (_name, input, expected_output) => {
      const actual_output = find_distance_to_intersection_by_combined_steps(input);
      expect(actual_output).toStrictEqual(expected_output);
    })
  })
})