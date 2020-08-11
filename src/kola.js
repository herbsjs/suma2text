module.exports = function (
  { useDefault, languages } = { useDefault: "en-US" }
) {
  const textPackage = JSON.parse(JSON.stringify(require("./languagePackage")));

  if (languages) {
    languages.map(({ name, definitions }) => {
      process.emitWarning(
        `${name}: ${
          textPackage[name]
            ? "will be custumized"
            : "it's not implemented, why do you wont make a pull request?"
        }`
      );

      const newLanguage = textPackage[name]
        ? JSON.parse(JSON.stringify(textPackage[name]))
        : { types: [], codes: [] };

      for (code of definitions.codes) {
        const existingCode = newLanguage.codes.find(
          (suma) => suma.key === code.key
        );
        if (existingCode) existingCode.translation = code.translation;
        else newLanguage.codes.push(code);
      }

      for (type of definitions.types) {
        const existingType = newLanguage.types.find(
          (newTypes) => newTypes.key === type.key
        );
        if (existingType) existingType.translation = type.translation;
        else newLanguage.types.push(type);
      }

      textPackage[name] = newLanguage;
    });
  }

  function isExistingContext(languageName) {
    return !!textPackage[languageName];
  }

  function toText(errorObject, language = useDefault) {
    if (!isExistingContext(language))
      throw new Error(`${language} is not implemented`);

    const languageContext = textPackage[language];

    const key = Object.getOwnPropertyNames(errorObject)[0];
    const errorCode = languageContext.codes.find((error) => error.key === key);

    if (!errorCode) throw new Error(`Not implemented error code: ${key}`);

    if (!String.prototype.format) {
      String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
          return typeof args[number] != "undefined" ? args[number] : match;
        });
      };
    }

    if (typeof errorObject[key] === "number")
      return errorCode.translation.format(errorObject[key]);

    if (typeof errorObject[key] === "string") {
      const type = languageContext.types.find(
        (type) => type.key === errorObject[key]
      );

      if (type) return errorCode.translation.format(type.translation);

      return errorCode.translation.format(errorObject[key]);
    }

    return errorCode.translation;
  }

  function errorsToText(errors, language = useDefault) {
    if (!isExistingContext(language))
      throw new Error(`${language} is not implemented`);

    const entity = {};
    Object.entries(errors).forEach(([key, value]) => {
      if (Array.isArray(value))
        entity[key] = value.map((error) => {
          return toText(error, language);
        });
      else entity[key] = errorsToText(value, language);
    });

    return entity;
  }

  return { errorsToText, toText };
};
