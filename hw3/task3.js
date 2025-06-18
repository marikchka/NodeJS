const createCounter = function () {
  let counter = 0;
  return function () {
    ++counter;
    return counter;
  };
};

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());

const counter2 = createCounter();
console.log(counter2());
console.log(counter2());
console.log(counter2());

const repeatFunction = function (func, number) {
  return function () {
    if (number >= 0) for (let i = 0; i < number; i++) func();
    else {
      const intervalId = setInterval(func, 0);
      return () => clearInterval(intervalId);
    }
  };
};

const meow = () => console.log("meow");
const kitty = repeatFunction(meow, 7);
kitty();
console.log("infinity starts");
const loudKitty = repeatFunction(meow, -5);
const stop = loudKitty();
setTimeout(stop, 2000);
