const isArrayOfStrings = (arr) =>
    Array.isArray(arr) && arr.every((ele) => typeof ele === "string");

module.exports = { isArrayOfStrings };
