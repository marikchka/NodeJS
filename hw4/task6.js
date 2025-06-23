const deepCloneObject = function (obj) {
  const seen = new WeakMap();

  function cloneHelper(value) {
    if (value === null || typeof value !== "object") return value;

    if (value instanceof Date) return new Date(value);

    if (value instanceof RegExp) return new RegExp(value);

    if (value instanceof Map) {
      const result = new Map();
      seen.set(value, result);
      for (const [key, val] of value) result.set(cloneHelper(key), cloneHelper(val));

      return result;
    }

    if (value instanceof Set) {
      const result = new Set();
      seen.set(value, result);
      for (const val of value) result.add(cloneHelper(val));

      return result;
    }

    if (seen.has(value)) return seen.get(value);

    if (Array.isArray(value)) {
      const result = [];
      seen.set(value, result);
      for (let i = 0; i < value.length; i++) result[i] = cloneHelper(value[i]);

      return result;
    }

    const result = {};
    seen.set(value, result);
    for (const key of Object.keys(value)) result[key] = cloneHelper(value[key]);

    return result;
  }

  return cloneHelper(obj);
};

const obj = { name: "marik" };
obj.self = obj;

const obj2 = {
  user: obj,
  list: [1, 2, { nested: true }],
  date: new Date(),
};

const clone = deepCloneObject(obj2);

console.log(clone);
console.log(clone.user === obj2.user);
console.log(clone.user.self === clone.user);
