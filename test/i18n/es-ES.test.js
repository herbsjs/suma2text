const assert = require("assert")

describe("suma2Text - I18N es-ES", () => {
  it("translate simple field", () => {
    const error = { cantBeNull: true }

    const suma2Text = require("../../src/suma2Text")()
    const traductions = suma2Text.toText(error, "es-ES")

    assert.deepStrictEqual(traductions, "No puede ser null")
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

    const suma2Text = require("../../src/suma2Text")()
    const traductions = suma2Text.errorsToText(errorArray, "es-ES")

    assert.deepStrictEqual(traductions, {
      value1: ["No menor que 0"],
      value2: {
        value4: ["No igual a 1"],
        value5: ["Demasiado largo", "Demasiado corto"],
      },
      value3: ["No mayor que 100"],
      value6: ["Tipo incorrecto, el tipo correcto es Texto"],
      value7: {
        value8: ["Tipo incorrecto, el tipo correcto es Número"],
      },
      value9: {
        value10: [
          "Tipo incorrecto, el tipo correcto es value2",
        ],
      },
    })
  })
})
