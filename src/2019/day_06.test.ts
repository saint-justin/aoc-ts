import { find_direct_and_indirect_orbits, sort_children } from "./day_06";

describe("day_06", () => {
  describe("helpers", () => {
    describe("sort_children", () => {
      test("returns sorted children successfully", () => {
        const input = ["COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L"]
        const expected_output = new Map([
          ["COM", ["B"]],
          ["B", ["C", "G"]],
          ["C", ["D"]],
          ["D", ["E", "I"]],
          ["E", ["F", "J"]],
          ["G", ["H"]],
          ["J", ["K"]],
          ["K", ["L"]],
        ])

        const actual_output = sort_children(input);
        expect(actual_output).toStrictEqual(expected_output);
      });
    });
  });

  describe("find_direct_and_indirect_orbits", () => {
    test("end-to-end", () => {
      const input = ["COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L"]
      const expected_output = 42; 

      const actual_output = find_direct_and_indirect_orbits(input);

      expect(actual_output).toStrictEqual(expected_output);
    })
  })
});