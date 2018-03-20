const { Utils } = require("../module/midiplayer");

describe("#Utils", function() {
  describe("#byteToHex()", function() {
    it("should return hex value from byte.", function() {
      expect("7f").toEqual(Utils.byteToHex(127));
    });
  });

  describe("#bytesToHex()", function() {
    it("should return hex value from array of bytes.", function() {
      expect("7f3a").toEqual(Utils.bytesToHex([127, 58]));
    });
  });

  describe("#hexToNumber()", function() {
    it("should return base 10 value from hex string.", function() {
      expect(254).toEqual(Utils.hexToNumber("fe"));
    });
  });

  describe("#bytesToNumber()", function() {
    it("should return base 10 value from array of bytes.", function() {
      expect(Utils.bytesToNumber([14, 22, 3])).toEqual(923139);
    });
  });

  describe("#bytesToLetters()", function() {
    it("should return string from array of bytes.", function() {
      expect(Utils.bytesToLetters([77, 116, 104, 100])).toEqual("Mthd");
    });
  });

  describe("#decToBinary()", function() {
    it("should return binary value from decimal.", function() {
      expect(Utils.decToBinary(22)).toEqual("10110");
    });
  });

  describe("#readVarInt()", function() {
    it("should return binary value from decimal.", function() {
      expect(Utils.readVarInt([128, 42])).toEqual(42);
    });
  });
  describe("#atob()", function() {
    it("should use window.atob when available", function() {
      if (!("window" in global)) return;
      window.atob = jest.fn();
      Utils.atob("test");
      expect(window.atob.mock.calls.length).toEqual(1);
    });

    it("should return binary value from string. even if window.atob doesn't exist", function() {
      if ("window" in global) {
        window.atob = undefined;
      }
      expect(Utils.atob("test")).toEqual("µë-");
    });
  });
});
