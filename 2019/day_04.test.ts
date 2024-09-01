import { contains_adjacent_double, contains_adjacent_exact_double, count_valid_passwords, has_six_digits, never_decreases } from "./day_04"

describe("day_04", () => {
  describe("helpers", () => {
    describe("is_six_digit_number", () => {
      it.each([
        [1, false],
        [12, false],
        [123, false],
        [1234, false],
        [12345, false],
        [123456, true],
        [562346, true],
        [987654, true],
        [1234567, false],
      ])("Correctly validates whether %i is a six digit number", (n, expected) => {
        const actual = has_six_digits(n);
        expect(actual).toStrictEqual(expected);
      })
    })

    // at least two adjacent digits match
    describe("contains_adjacent_double", () => {
      it.each([
        [1, false],
        [10, false],
        [123456, false],
        [11, true],
        [112, true],
        [121, false],
        [211, true],
        [123455, true],
        [123456, false]
      ])("Correctly validates that %i has two adjacent digits", (n, expected) => {
        const actual = contains_adjacent_double(n);
        expect(actual).toStrictEqual(expected);
      })
    })

    // exactly two adjacent digits match
    describe("contains_adjacent_exact_double", () => {
      it.each([
        [111111, false],
        [123444, false],
        [122444, true],
        [124444, false],
        [222244, true],
      ])("Correctly validates that %i has two adjacent digits", (n, expected) => {
        const actual = contains_adjacent_exact_double(n);
        expect(actual).toStrictEqual(expected);
      })
    })

    // digits never decrease L->R
    describe("never_decreases", () => {
      it.each([
        [123456, true],
        [111111, true],
        [111123, true],
        [135679, true],
        [223450, false],
        [987654, false],
      ])("Correctly validates that %i's digits never decrease", (n, expected) => {
        const actual = never_decreases(n);
        expect(actual).toStrictEqual(expected);
      })
    })
  })

  describe("end-to-end", () => {
    it.each([
      [["111111-111111"], 1],
      [["111111-111112"], 2],
      [["223450-223450"], 0],
    ])("Counts valid items in range %s", (input, expected_count) => {
      const actual = count_valid_passwords(input);
      expect(actual).toStrictEqual(expected_count);
    });
  })
})