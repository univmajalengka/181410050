exports.generateRandomNumberString = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  };
  