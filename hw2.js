const AdvancedDataTransformer = (() => {
  const isObject = (val) => typeof val === "object" && val !== null && !Array.isArray(val);
  const isInt = (val) => Number(val) % 1 === 0;

  function addValues(a, b) {
    if (typeof a === "number" && typeof b === "number") return a + b;

    if (typeof a === "string" || typeof b === "string") {
      if (typeof a === "string") {
        if ([...a].some((el) => !/^[0-9]$/.test(String(el))))
          throw new TypeError(`all characters in string must be digits`);
      }
      if (typeof b === "string") {
        if ([...b].some((el) => !/^[0-9]$/.test(String(el))))
          throw new TypeError(`all characters in string must be digits`);
      }
      return Number(a) + Number(b);
    }
    if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b];
    if (isObject(a) && isObject(b)) return { ...a, ...b };
    if (typeof a === "bigint" || typeof b === "bigint") return BigInt(a) + BigInt(b);
    throw new TypeError(`addition of type ${typeof a} and ${typeof b} is not possible`);
  }
  function stringifyValue(a) {
    if (isObject(a) || Array.isArray(a)) return JSON.stringify(a);
    if (typeof a === "boolean") return a === true ? "true" : "false";
    if (typeof a === "number" || typeof a === "bigint" || typeof a === "symbol")
      return a.toString();
    if (typeof a === "string") return a;
  }
  function invertBoolean(a) {
    if (typeof a === "boolean") return a === true ? false : true;
    throw new TypeError(`invertion of type ${typeof a} is not possible: must be boolean`);
  }
  function convertToNumber(a) {
    if (typeof a === "string") {
      if ([...a].some((el) => !/^[0-9]$/.test(String(el))))
        throw new TypeError(`all characters in string must be digits`);
      return isInt(a) ? parseInt(a) : parseFloat(a);
    }
    if (typeof a === "number") return a;
    if (Array.isArray(a)) {
      if (a.some((el) => !/^[0-9]$/.test(String(el))))
        throw new TypeError(`convert array wich contains strings to number is not possible`);
      return Number(a.join(""));
    }
    if (typeof a === "bigint") return Number(a);
    throw new TypeError(`convert ${typeof a} to number is not possible`);
  }
  function coerceToType(a, a_type) {
    switch (a_type) {
      case "number":
        return convertToNumber(a);

      case "string":
        return stringifyValue(a);

      case "boolean":
        if (convertToNumber(a) === 1) return true;
        if (convertToNumber(a) === 0) return false;
        if (a === true || a === false) return a;
        throw new TypeError(`convert ${typeof a} to boolean is not possible`);

      case "array":
        if (!isObject(a)) {
          const result = [];
          // returns array of separated charachters
          if (typeof a === "string") {
            for (let i = 0; i < a.length; i++) result.push(a[i]);
            return result;
          }

          // returns array of separated digits
          if (typeof a === "number") {
            while (a > 0) {
              result.unshift(a % 10);
              a = Math.floor(a / 10);
            }
            return result;
          }
          if (Array.isArray(a)) return a;
          //throw new TypeError(`convert ${typeof a} to array is not possible`);
        }
        if (isObject(a)) return Object.values(a); // returns array of objects values
        throw new TypeError(`convert ${typeof a} to array is not possible`);

      case "bigint":
        if (typeof a === "number") return BigInt(a);
        if (Array.isArray(a)) return BigInt(convertToNumber(a));
        throw new TypeError(`convert ${typeof a} to BigInt is not possible`);
      default:
        throw new TypeError(`convert ${typeof a} to ${a_type} is not possible`);
    }
  }
  return { addValues, stringifyValue, invertBoolean, convertToNumber, coerceToType };
})();

console.log(AdvancedDataTransformer.addValues(34, 2));
console.log(AdvancedDataTransformer.addValues(34, "12"));
console.log(AdvancedDataTransformer.addValues(34n, 2));
console.log(AdvancedDataTransformer.addValues("34", "2"));
//console.log(AdvancedDataTransformer.addValues("str", "ing?"));
console.log(AdvancedDataTransformer.addValues([1, 2], [3, 4]));
console.log(AdvancedDataTransformer.addValues({ a: 1 }, { b: 2 }));
//console.log(AdvancedDataTransformer.addValues(Symbol(2), 2));

console.log(AdvancedDataTransformer.stringifyValue(Symbol("2")));
console.log(AdvancedDataTransformer.invertBoolean(true));
console.log(AdvancedDataTransformer.convertToNumber("4"));
console.log(AdvancedDataTransformer.coerceToType(1234, "array"));
console.log(AdvancedDataTransformer.coerceToType("1234", "array"));
console.log(AdvancedDataTransformer.coerceToType([1, 2, 3, 4], "bigint"));
console.log(AdvancedDataTransformer.coerceToType(34, "bigint"));
console.log(AdvancedDataTransformer.convertToNumber(["1", 2, 4]));
console.log(AdvancedDataTransformer.convertToNumber(10n));
console.log(AdvancedDataTransformer.stringifyValue(10n));
console.log(AdvancedDataTransformer.stringifyValue([1, 35, 3]));

module.exports = AdvancedDataTransformer;
