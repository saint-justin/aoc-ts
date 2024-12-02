import { count_safe_reports } from "./day_02"

describe('day_03', () => {
  describe('unit tests',  () => {
    it('Counts normally descending reactor levels', () => {
      expect(count_safe_reports(['7 6 4 2 1'])).toStrictEqual(1);
      expect(count_safe_reports(['7 4 3 2 1'])).toStrictEqual(1);
    })

    it('Does not count unsafely descending reactor levels', () => {
      expect(count_safe_reports(['7 3 2 1'])).toStrictEqual(0);
    })
  })
})