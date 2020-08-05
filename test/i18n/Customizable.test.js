const assert = require("assert");

describe("Customizable language", () => {
  it("translate simple field", () => {
    const error = { cantBeNull: true };

    const translator = require("../../src/kola")("ts-ME", {
      types: [],
      sumaCodes: [{ key: "cantBeNull", translation: "testing" }],
    });
    const traductions = translator.translate(error);

    assert.deepStrictEqual(traductions, "testing");
  });

  it("translate simple values ´true´ or `false` codes", () => {
    const errorArray = {
      value1: [{ cantBeNull: true }],
      value2: [{ cantBeEmpty: true }],
      value4: [{ isTooShort: true }],
      value5: [{ isTooLong: true }],
    };

    const translator = require("../../src/kola")("ts-ME", {
      types: [],
      sumaCodes: [
        { key: "cantBeNull", translation: "testing" },
        { key: "cantBeEmpty", translation: "testing2" },
        { key: "isTooShort", translation: "testing3" },
        { key: "isTooLong", translation: "testing4" },
      ],
    });
    const traductions = translator.translateErrors(errorArray);

    assert.deepStrictEqual(traductions, {
      value1: ["testing"],
      value2: ["testing2"],
      value4: ["testing3"],
      value5: ["testing4"],
    });
  });

  it("translate simple values with type definitions with a least one custom code traduction", () => {
    const errorArray = {
      value2: [{ cantBeEmpty: true }],
      value3: [{ wrongType: "String" }],
      value4: [{ notEqualTo: 1 }],
      value5: [{ notGreaterThan: 100 }],
      value6: [{ wrongType: "Number" }],
      value7: [{ wrongType: "value2" }],
    };

    const translator = require("../../src/kola")("en-US", {
      types: [
        { key: "Number", translation: "Digit" },
        { key: "String", translation: "Char Array" },
      ],
      sumaCodes: [
        { key: "cantBeEmpty", translation: "Wont should be empty" },
        { key: "wrongType", translation: "The value correct is {0}" },
        { key: "notEqualTo", translation: "should not be equal to {0}" },
        {
          key: "notGreaterThan",
          translation: "should not be greater than {0}",
        },
      ],
    });
    const traductions = translator.translateErrors(errorArray);

    assert.deepStrictEqual(traductions, {
      value2: ["Wont should be empty"],
      value3: ["The value correct is Char Array"],
      value4: ["should not be equal to 1"],
      value5: ["should not be greater than 100"],
      value6: ["The value correct is Digit"],
      value7: ["The value correct is value2"],
    });
  });

  it("translate multiple validation clauses", () => {
    const errorArray = {
      value1: [{ cantBeNull: true }, { cantBeEmpty: true }],
      value2: [{ cantBeEmpty: true }, { isTooLong: true }],
      value3: [{ wrongType: "String" }, { cantBeNull: true }],
      value4: [{ isTooShort: true }, { wrongType: "Number" }],
      value5: [{ isTooLong: true }, { isTooShort: true }],
    };

    const translator = require("../../src/kola")();
    const traductions = translator.translateErrors(errorArray);

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

    const translator = require("../../src/kola")();
    const traductions = translator.translateErrors(errorArray);

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

    const translator = require("../../src/kola")();
    const traductions = translator.translateErrors(errorArray);

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
