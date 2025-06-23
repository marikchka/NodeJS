function createImmutableObject(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (typeof value === "object" && value !== null) createImmutableObject(value);

    Object.defineProperty(obj, key, {
      value: value,
      writable: false,
      configurable: false,
      enumerable: true,
    });
  }
  return obj;
}

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
};
const person2 = {
  firstName: "M",
  lastName: "K",
  details: {
    age: 30,
    emails: ["mk@example.com", "km@example.com"],
  },
};
const obj = createImmutableObject(person);
const obj2 = createImmutableObject(person2);
console.log(obj);
console.log(obj2);
