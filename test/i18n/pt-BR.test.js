const assert = require("assert");

describe("kola - I18N pt-BR", () => {
  it("translate simple field", () => {
    const error = { cantBeNull: true };

    const translator = require("../../src/kola")("pt-BR");
    const traductions = translator.translate(error);

    assert.deepStrictEqual(traductions, "Não pode estar vazio");
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

    const translator = require("../../src/kola")("pt-BR");
    const traductions = translator.translateErrors(errorArray);

    assert.deepStrictEqual(traductions, {
      value1: ["Não pode ser menor do que 0"],
      value2: {
        value4: ["Não pode ser igual a 1"],
        value5: ["Está maior do que esperado", "Está menor do que esperado"],
      },
      value3: ["Não deve ser maior que 100"],
      value6: ["Foi definido um tipo incorreto, o valor esperado era Texto"],
      value7: {
        value8: ["Foi definido um tipo incorreto, o valor esperado era Número"],
      },
      value9: {
        value10: [
          "Foi definido um tipo incorreto, o valor esperado era value2",
        ],
      },
    });
  });
});
