const assert = require("assert");

describe("kola - I18N en-US", () => {
  it("translate simple field", () => {
    const error = { cantBeNull: true };

    const kola = require("../../src/kola")();
    const traductions = kola.toText(error, "en-US");

    assert.deepStrictEqual(traductions, "Cant be null");
  });

  it("translate simple values ´true´ or `false` codes", () => {
    const errorArray = {
      value1: [{ cantBeNull: true }],
      value2: [{ cantBeEmpty: true }],
      value4: [{ isTooShort: true }],
      value5: [{ isTooLong: true }],
    };

    const kola = require("../../src/kola")();
    const traductions = kola.errorsToText(errorArray, "en-US");

    assert.deepStrictEqual(traductions, {
      value1: ["Cant be null"],
      value2: ["Cant be empty"],
      value4: ["Is too short"],
      value5: ["Is too long"],
    });
  });

  it("translate simple values with type definitions", () => {
    const errorArray = {
      value2: [{ cantBeEmpty: true }],
      value3: [{ wrongType: "String" }],
      value4: [{ notEqualTo: 1 }],
      value5: [{ notGreaterThan: 100 }],
      value6: [{ wrongType: "Number" }],
      value7: [{ wrongType: "value2" }],
    };

    const kola = require("../../src/kola")();
    const traductions = kola.errorsToText(errorArray, "en-US");

    assert.deepStrictEqual(traductions, {
      value2: ["Cant be empty"],
      value3: ["Wrong type, the correct type is String"],
      value4: ["Not equal to 1"],
      value5: ["Not greater than 100"],
      value6: ["Wrong type, the correct type is Number"],
      value7: ["Wrong type, the correct type is value2"],
    });
  });

  it("translate multiple validation clouses", () => {
    const errorArray = {
      value1: [{ cantBeNull: true }, { cantBeEmpty: true }],
      value2: [{ cantBeEmpty: true }, { isTooLong: true }],
      value3: [{ wrongType: "String" }, { cantBeNull: true }],
      value4: [{ isTooShort: true }, { wrongType: "Number" }],
      value5: [{ isTooLong: true }, { isTooShort: true }],
    };

    const kola = require("../../src/kola")();
    const traductions = kola.errorsToText(errorArray, "en-US");

    assert.deepStrictEqual(traductions, {
      value1: ["Cant be null", "Cant be empty"],
      value2: ["Cant be empty", "Is too long"],
      value3: ["Wrong type, the correct type is String", "Cant be null"],
      value4: ["Is too short", "Wrong type, the correct type is Number"],
      value5: ["Is too long", "Is too short"],
    });
  });

  it("translate simple values with parameters and codes", () => {
    const errorArray = {
      value1: [{ notLessThan: 0 }],
      value2: [{ notEqualTo: 1 }],
      value3: [{ notGreaterThan: 100 }],
    };

    const kola = require("../../src/kola")();
    const traductions = kola.errorsToText(errorArray, "en-US");

    assert.deepStrictEqual(traductions, {
      value1: ["Not less than 0"],
      value2: ["Not equal to 1"],
      value3: ["Not greater than 100"],
    });
  });

  it("translate entity with entity and simple values with parameters and codes", () => {
    const errorArray = {
      value1: [{ notLessThan: 0 }],
      value2: {
        value4: [{ notEqualTo: 1 }],
        value5: [{ isTooLong: true }, { isTooShort: true }],
      },
      value3: [{ notGreaterThan: 100 }],
      value6: [{ wrongType: "String" }],
      value7: { value8: [{ wrongType: "Number" }] },
      value9: { value10: [{ wrongType: "value2" }] },
    };

    const kola = require("../../src/kola")();
    const traductions = kola.errorsToText(errorArray, "en-US");

    assert.deepStrictEqual(traductions, {
      value1: ["Not less than 0"],
      value2: {
        value4: ["Not equal to 1"],
        value5: ["Is too long", "Is too short"],
      },
      value3: ["Not greater than 100"],
      value6: ["Wrong type, the correct type is String"],
      value7: {
        value8: ["Wrong type, the correct type is Number"],
      },
      value9: {
        value10: ["Wrong type, the correct type is value2"],
      },
    });
  });
});
