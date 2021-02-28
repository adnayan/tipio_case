export const checkQueryType = (query: string) => {
  try {
    if (typeof query == "string" && query.length > 2) {
      const regexpNum: RegExp = new RegExp("^\\d+$");
      const result = regexpNum.exec(query);

      if (!result) {
        return "name";
      }
      return "number";
    }
  } catch (error) {
    console.log(error);
  }
};

export const issetOrEmpty = (variable: any | undefined, fallback: any) => {
  if (typeof variable === "undefined") {
    return fallback;
  }
  return variable.href;
};
