const assert = require("assert");
describe("kola", () => {
  it("should return null when is passed not implemented language", () => {
    const languagePackage = require("../src/languagePackage")("ts-ME");

    assert.deepEqual(languagePackage, null);
  });

  it("should return pt-BR", () => {
    const languagePackage = require("../src/languagePackage")("pt-BR");

    assert.deepEqual(languagePackage, require("../i18n/pt-BR"));
  });

  it("should return en-US", () => {
    const languagePackage = require("../src/languagePackage")("en-US");

    assert.deepEqual(languagePackage, require("../i18n/en-US"));
  });
});
