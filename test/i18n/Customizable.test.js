const assert = require("assert")

describe("Customizable language", () => {
  it("translate simple field", () => {
    const error = { cantBeNull: true }

    const translator = require("../../src/kola")({
      languages: [
        {
          name: "ts-ME",
          definitions: {
            types: [],
            codes: [{ key: "cantBeNull", translation: "testing" }],
          },
        },
      ],
    })
    const traductions = translator.toText(error, "ts-ME")

    assert.deepStrictEqual(traductions, "testing")
  })

  it("translate simple values ´true´ or `false` codes", () => {
    const errorArray = {
      value1: [{ cantBeNull: true }],
      value2: [{ cantBeEmpty: true }],
      value4: [{ isTooShort: true }],
      value5: [{ isTooLong: true }],
    }

    const kola = require("../../src/kola")({
      useDefault: "en-US",
      languages: [
        {
          name: "ts-ME",
          definitions: {
            types: [],
            codes: [
              { key: "cantBeNull", translation: "testing" },
              { key: "cantBeEmpty", translation: "testing2" },
              { key: "isTooShort", translation: "testing3" },
              { key: "isTooLong", translation: "testing4" },
            ],
          },
        },
      ],
    })
    const traductions = kola.errorsToText(errorArray, "ts-ME")

    assert.deepStrictEqual(traductions, {
      value1: ["testing"],
      value2: ["testing2"],
      value4: ["testing3"],
      value5: ["testing4"],
    })
  })

  it("translate simple values with type definitions with a least one custom code traduction", () => {
    const errorArray = {
      value2: [{ cantBeEmpty: true }],
      value3: [{ wrongType: "String" }],
      value4: [{ notEqualTo: 1 }],
      value5: [{ notGreaterThan: 100 }],
      value6: [{ wrongType: "Number" }],
      value7: [{ wrongType: "value2" }],
    }

    const kola = require("../../src/kola")({
      useDefault: "en-US",
      languages: [
        {
          name: "en-US",
          definitions: {
            types: [
              { key: "Number", translation: "Digit" },
              { key: "String", translation: "Char Array" },
            ],
            codes: [
              { key: "cantBeEmpty", translation: "Wont should be empty" },
              { key: "wrongType", translation: "The value correct is {0}" },
              { key: "notEqualTo", translation: "should not be equal to {0}" },
              {
                key: "notGreaterThan",
                translation: "should not be greater than {0}",
              },
            ],
          },
        },
      ],
    })
    const traductions = kola.errorsToText(errorArray)

    assert.deepStrictEqual(traductions, {
      value2: ["Wont should be empty"],
      value3: ["The value correct is Char Array"],
      value4: ["should not be equal to 1"],
      value5: ["should not be greater than 100"],
      value6: ["The value correct is Digit"],
      value7: ["The value correct is value2"],
    })
  })

  it("should throw exception when its a error code not implemented in custom language", () => {
    const errorArray = {
      value1: [{ cantBeNull: true }, { cantBeEmpty: true }],
      value2: [{ cantBeEmpty: true }, { isTooLong: true }],
      value3: [{ wrongType: "String" }, { cantBeNull: true }],
      value4: [{ isTooShort: true }, { wrongType: "Number" }],
      value5: [{ isTooLong: true }, { isTooShort: true }],
    }

    const translator = require("../../src/kola")({
      useDefault: "en-US",
      languages: [
        {
          name: "ts-ME",
          definitions: {
            types: [],
            codes: [],
          },
        },
      ],
    })

    assert.throws(() => {
      translator.errorsToText(errorArray, "ts-ME")
    })
  })

  it("translate multiple validation clauses", () => {
    const errorArray = {
      value1: [{ cantBeNull: true }, { cantBeEmpty: true }],
      value2: [{ cantBeEmpty: true }, { isTooLong: true }],
      value3: [{ wrongType: "String" }, { cantBeNull: true }],
      value4: [{ isTooShort: true }, { wrongType: "Number" }],
      value5: [{ isTooLong: true }, { isTooShort: true }],
    }

    const kola = require("../../src/kola")({
      useDefault: "ts-ME",
      languages: [
        {
          name: "ts-ME",
          definitions: {
            types: [
              { key: "Number", translation: "Digit" },
              { key: "String", translation: "Char Array" },
            ],
            codes: [
              { key: "cantBeNull", translation: "Wont should be null" },
              { key: "cantBeEmpty", translation: "Wont should be empty" },
              { key: "wrongType", translation: "The value correct is {0}" },
              { key: "notEqualTo", translation: "should not be equal to {0}" },
              { key: "isTooShort", translation: "wont should be too short" },
              { key: "isTooLong", translation: "wont should be too long" },
              {
                key: "notGreaterThan",
                translation: "should not be greater than {0}",
              },
            ],
          },
        },
      ],
    })
    const traductions = kola.errorsToText(errorArray)

    assert.deepStrictEqual(traductions, {
      value1: ["Wont should be null", "Wont should be empty"],
      value2: ["Wont should be empty", "wont should be too long"],
      value3: ["The value correct is Char Array", "Wont should be null"],
      value4: ["wont should be too short", "The value correct is Digit"],
      value5: ["wont should be too long", "wont should be too short"],
    })
  })

  it("translate simple values with parameters and codes", () => {
    const errorArray = {
      value1: [{ notLessThan: 0 }],
      value2: [{ notEqualTo: 1 }],
      value3: [{ notGreaterThan: 100 }],
    }

    const kola = require("../../src/kola")({
      useDefault: "ts-ME",
      languages: [
        {
          name: "ts-ME",
          definitions: {
            types: [],
            codes: [
              {
                key: "notLessThan",
                translation: "wont should be less than {0}",
              },
              { key: "notEqualTo", translation: "wont should be equal to {0}" },
              {
                key: "notGreaterThan",
                translation: "should not be greater than {0}",
              },
            ],
          },
        },
      ],
    })
    const traductions = kola.errorsToText(errorArray)

    assert.deepStrictEqual(traductions, {
      value1: ["wont should be less than 0"],
      value2: ["wont should be equal to 1"],
      value3: ["should not be greater than 100"],
    })
  })

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
    }

    const kola = require("../../src/kola")({
      useDefault: "ts-ME",
      languages: [
        {
          name: "ts-ME",
          definitions: {
            types: [
              { key: "Number", translation: "Digit" },
              { key: "String", translation: "Char Array" },
              { key: "value2", translation: "Value like 2" },
            ],
            codes: [
              { key: "wrongType", translation: "The value correct is {0}" },
              { key: "isTooShort", translation: "wont should be too short" },
              { key: "isTooLong", translation: "wont should be too long" },
              {
                key: "notLessThan",
                translation: "wont should be less than {0}",
              },
              { key: "notEqualTo", translation: "wont should be equal to {0}" },
              {
                key: "notGreaterThan",
                translation: "should not be greater than {0}",
              },
            ],
          },
        },
      ],
    })
    const traductions = kola.errorsToText(errorArray)

    assert.deepStrictEqual(traductions, {
      value1: ["wont should be less than 0"],
      value2: {
        value4: ["wont should be equal to 1"],
        value5: ["wont should be too long", "wont should be too short"],
      },
      value3: ["should not be greater than 100"],
      value6: ["The value correct is Char Array"],
      value7: {
        value8: ["The value correct is Digit"],
      },
      value9: {
        value10: ["The value correct is Value like 2"],
      },
    })
  })
})
