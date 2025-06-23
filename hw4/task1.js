const person = {
  updateInfo: function (newInfo) {
    Object.defineProperties(this, {
      firstName: {
        value: newInfo.firstName,
        writable: false,
        enumerable: true,
        configurable: true,
      },
      lastName: {
        value: newInfo.lastName,
        writable: false,
        enumerable: true,
        configurable: true,
      },
      age: {
        value: newInfo.age,
        writable: false,
        enumerable: true,
        configurable: true,
      },
      email: {
        value: newInfo.email,
        writable: false,
        enumerable: true,
        configurable: true,
      },
    });
  },
};

Object.defineProperties(person, {
  firstName: {
    value: "John",
    writable: false,
    enumerable: true,
    configurable: true,
  },
  lastName: {
    value: "Doe",
    writable: false,
    enumerable: true,
    configurable: true,
  },
  age: {
    value: 30,
    writable: false,
    enumerable: true,
    configurable: true,
  },
  email: {
    value: "john.doe@example.com",
    writable: false,
    enumerable: true,
    configurable: true,
  },
});

console.log(person);

const person2 = {
  firstName: "Mari",
  lastName: "K",
  age: 19,
  email: "marik@example.com",
};

person.updateInfo(person2);

console.log(person);

Object.defineProperty(person, "address", {
  value: {},
  enumerable: false,
  configurable: false,
});

console.log(Object.getOwnPropertyDescriptors(person));
