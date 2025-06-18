const calculateFactorial = function (number, accumulator = 1) {
  if (number === 0 || number === 1) return accumulator;
  return calculateFactorial(number - 1, number * accumulator);
};

console.log(calculateFactorial(3));
console.log(calculateFactorial(10));
console.log(calculateFactorial(0));
console.log(calculateFactorial(120));

const power = function (base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
};

console.log(power(2, 4));
console.log(power(14, 0));
