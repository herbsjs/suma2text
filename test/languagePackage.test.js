const assert = require("assert");

describe("LanguagePackage", () => {
  it("should return an object", () => {
    const languagePackage = require("../src/languagePackage");

    assert.ok(typeof languagePackage === "object");
  });

  it("should return null when is passed not implemented language", () => {
    const languagePackage = require("../src/languagePackage");

    const customContext = languagePackage["ts-ME"];

    assert.equal(customContext, null);
  });

  it("should return pt-BR", () => {
    const languagePackage = require("../src/languagePackage");

    const customContext = languagePackage["en-US"];

    assert.deepEqual(customContext, require("../i18n/en-US"));
  });

  it("should return en-US", () => {
    const languagePackage = require("../src/languagePackage");

    const customContext = languagePackage["pt-BR"];

    assert.deepEqual(customContext, require("../i18n/pt-BR"));
  });
});
