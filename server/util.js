const isArrayOfStrings = (arr) => {
    if (!Array.isArray(arr)) {
        return false;
    }
    let valid = true;
    arr.map((ele) => {
        if (typeof ele !== "string") {
            valid = false;
        }
    });
    return valid;
};

module.exports = { isArrayOfStrings };
