import asyncWrapper from "../utils/AsyncWrapper.js";
import { Success } from "../utils/ServerResponses.js";

export const getLanguages = asyncWrapper(async (req, res) => {
  const langs = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
      isDefault: true,
    },
    {
      code: "ar",
      name: "Arabic",
      nativeName: "العربية",
    },
  ];
  Success(res, 200, langs);
});
