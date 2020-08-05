module.exports = function (language = "en-US", languageJSON) {
  const languages = {
    "en-US": require("../i18n/en-US"),
    "pt-BR": require("../i18n/pt-BR"),
  };

  if (!languages[language] && !languageJSON)
    throw new Error(`${language} is not implemented`);

  const languagePackage = languages[language]
    ? JSON.parse(JSON.stringify(languages[language]))
    : { types: [], sumaCodes: [] };

  if (languageJSON) {
    if (typeof languageJSON === "string")
      languageJSON = JSON.parse(languageJSON);

    for (code of languageJSON.sumaCodes) {
      const existingCode = languagePackage.sumaCodes.find(
        (suma) => suma.key === code.key
      );
      if (existingCode) existingCode.translation = code.translation;
      else languagePackage.sumaCodes.push(code);
    }

    for (type of languageJSON.types) {
      const existingType = languagePackage.types.find(
        (packType) => packType.key === type.key
      );
      if (existingType) existingType.translation = type.translation;
      else languagePackage.types.push(type);
    }
  }

  if (!String.prototype.format) {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    };
  }

  function translateErrorObject(errorObject) {
    const key = Object.getOwnPropertyNames(errorObject)[0];
    const errorCode = languagePackage.sumaCodes.find(
      (error) => error.key === key
    );

    if (!errorCode.translation)
      throw new Error(`Not implemented error code: ${key}`);

    if (typeof errorObject[key] === "number")
      return errorCode.translation.format(errorObject[key]);

    if (typeof errorObject[key] === "string") {
      const type = languagePackage.types.find(
        (type) => type.key === errorObject[key]
      );

      if (type) return errorCode.translation.format(type.translation);

      return errorCode.translation.format(errorObject[key]);
    }

    return errorCode.translation;
  }

  function translateEntityField(entityErrors) {
    if (!Array.isArray(entityErrors)) {
      return translateEntity(entityErrors);
    }

    return entityErrors.map((error) => {
      return translateErrorObject(error);
    });
  }

  function translateEntity(error) {
    const errorEntries = Object.entries(error);
    const entity = {};
    errorEntries.forEach(([key, value]) => {
      entity[key] = translateEntityField(value);
    });

    return entity;
  }

  return { translateEntity, translate: translateErrorObject };
};
