const observeObject = function (obj, func = (prop, action) => console.log(`${action} ${prop}`)) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      func(prop, "get");
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      func(prop, "set");
      return Reflect.set(target, prop, value, receiver);
    },
  });
};

const person = {
  firstName: "John",
  lastName: "Doe",
  _age: 30,
  _email: "john.doe@example.com",

  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  get email() {
    return this._email;
  },
  get age() {
    return this._age;
  },
  set email(newEmail) {
    this._email = newEmail;
  },
  set age(newAge) {
    this._age = newAge;
  },
};

const object = observeObject(person);

console.log(object.name);
console.log((object.age = 13));
console.log(object.age);
