const lazyMap = function (arr, mapFunc) {
  let i = 0;

  return {
    next() {
      if (i < arr.length) {
        const value = mapFunc(arr[i]);
        i++;
        return { value, done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};

const arr = [1, 2, 3, 4, 5];
const addTwo = (num) => num + 2;

const lazyAddTwo = lazyMap(arr, addTwo);

for (let i = 0; i < arr.length; i++) console.log(lazyAddTwo.next().value);

const fibonacciGenerator = function (f1 = 0, f2 = 1) {
  return {
    next() {
      const f3 = f1 + f2;
      [f1, f2] = [f2, f3];
      return f3;
    },
  };
};

const fibonacciNumber = fibonacciGenerator();
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
console.log(fibonacciNumber.next());
