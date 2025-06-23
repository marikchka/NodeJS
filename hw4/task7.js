const validateObject = function (obj, schema) {
  const errors = Object.keys(schema)
    .filter(function (key) {
      return !schema[key](obj[key]);
    })
    .map(function (key) {
      return new Error(key + " is invalid.");
    });

  if (errors.length > 0)
    errors.forEach(function (error) {
      console.log(error.message);
    });
  else console.log("valid");
};

const schema = {
  name: function (val) {
    return typeof val === "string" && val.length >= 3;
  },
  age: function (val) {
    return val === undefined || (typeof val === "number" && val >= 14 && val <= 130);
  },
  email: function (val) {
    return typeof val === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  },
};

const person = {
  name: "marik",
  email: "marichka@example.com",
};
const person2 = {
  age: 18,
  email: "kirian@example.com",
};
const person3 = {
  name: "ak",
  age: 18,
  email: "ak",
};

validateObject(person, schema);
validateObject(person2, schema);
validateObject(person3, schema);
