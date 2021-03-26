const assert = require("assert")

describe("suma2Text - I18N pt-BR", () => {
  it("translate simple field", () => {
    const error = { cantBeNull: true }

    const suma2Text = require("../../src/suma2Text")()
    const traductions = suma2Text.toText(error, "pt-BR")

    assert.deepStrictEqual(traductions, "Não pode estar vazio")
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
    const traductions = suma2Text.errorsToText(errorArray, "pt-BR")

    assert.deepStrictEqual(traductions, {
      value1: ["Não é menor que 0"],
      value2: {
        value4: ["Não é igual a 1"],
        value5: ["Está maior do que esperado", "Está menor do que esperado"],
      },
      value3: ["Não é maior que 100"],
      value6: ["Tipo incorreto, o valor esperado era Texto"],
      value7: {
        value8: ["Tipo incorreto, o valor esperado era Número"],
      },
      value9: {
        value10: [
          "Tipo incorreto, o valor esperado era value2",
        ],
      },
    })
  })
})
