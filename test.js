var assert = chai.assert;

describe("Tests 2017-11-15: ", function() {
  /*map*/
  describe("Check map function: ", function() {
    it("Check", function() {
      query = map([1,2,3,4], doubleUp);
      result = [2,4,6,8];
      assert.deepEqual(query, result);
    });
  });
  describe("Check reject function: ", function() {
    it("Check", function() {
      query = reject([1,2,3,4], moreThanTwo);
      result = [1,2];
      assert.deepEqual(query, result);
    });
    it("Check", function() {
      query = reject([2,3,4,5], divisibleByTwo);
      result = [3,5];
      assert.deepEqual(query, result);
    });
  });
});
