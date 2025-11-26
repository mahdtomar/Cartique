export const getLocalizedField = (
  field: string,
  language: string,
  fallbackLanguage: string = "en"
) => {
  if (typeof field === "string") return field;
  if (field && typeof field === "object") {
    return (
      field[language] || field[fallbackLanguage] || Object.values(field)[0]
    );
  }
  return "";
};
