module.exports = function (language) {
  switch (language) {
    case "en-US":
      return require("../i18n/en-US");
    case "pt-BR":
      return require("../i18n/pt-BR");
    default:
      return null;
  }
};
