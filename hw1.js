const asciiCode = function (str1, str2) {
  arr1 = [];
  arr2 = [];
  for (let i = 0; i < str1.length; i++) arr1.push(str1[i].charCodeAt(0) - 48);
  for (let i = 0; i < str2.length; i++) arr2.push(str2[i].charCodeAt(0) - 48);
  return { arr1, arr2 };
};

String.prototype.plus = function (string) {
  let l1 = this.length - 1;
  let l2 = string.length - 1;

  let carry = 0;
  const result = [];

  const { arr1: n1, arr2: n2 } = asciiCode(this, string);
  while (l1 >= 0 || l2 >= 0 || carry > 0) {
    let sum = 0;
    let number1 = l1 >= 0 ? n1[l1] : 0;
    let number2 = l2 >= 0 ? n2[l2] : 0;
    sum = number1 + number2 + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
    l1--;
    l2--;
  }

  return result.reverse().join("");
};

console.log("1956".plus("2487842"));

String.prototype.minus = function (string) {
  let num1 = this;
  let num2 = string;
  let minus = false;

  if (num1.length < num2.length || (num1.length === num2.length && num1 < num2)) {
    [num1, num2] = [num2, num1];
    minus = true;
  }
  const { arr1: n1, arr2: n2 } = asciiCode(num1, num2);
  let l1 = n1.length - 1;
  let l2 = n2.length - 1;

  const result = [];
  let carry = false;
  while (l1 >= 0 || l2 >= 0) {
    let number1 = l1 >= 0 ? n1[l1] : 0;
    let number2 = l2 >= 0 ? n2[l2] : 0;
    if (carry) {
      number1--;
      carry = false;
    }

    if (number1 < number2) {
      number1 += 10;
      carry = true;
    }
    result.push(number1 - number2);

    l1--;
    l2--;
  }

  while (result.length > 1 && result[result.length - 1] === 0) result.pop();

  return minus ? "-" + result.reverse().join("") : result.reverse().join("");
};

console.log("98765".minus("98"));

const compareStrings = function (str1, str2) {
  const { arr1, arr2 } = asciiCode(str1, str2);
  if (arr1.length !== arr2.length) return arr1.length - arr2.length;
  for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return arr1[i] - arr2[i];
  return 0;
};
String.prototype.divide = function (string) {
  const num1 = this;
  const num2 = string;
  if (num1 === "0") return "0";
  if (num2 === "0") return "infinity";

  const result = [];
  let current = "";
  for (let i = 0; i < num1.length; i++) {
    current += num1[i];
    let count = 0;
    while (compareStrings(current, num2) >= 0) {
      current = current.minus(num2);
      count++;
    }

    result.push(count);
  }
  if (current !== "0") result.push(".");

  let decimalCount = 0;
  const precision = 5;
  while (current !== "0" && decimalCount < precision) {
    current += "0";
    let count = 0;
    while (compareStrings(current, num2) >= 0) {
      current = current.minus(num2);
      count++;
    }
    result.push(count);
    decimalCount++;
  }
  while (result.length > 1 && result[0] === 0 && result[1] !== ".") result.shift();

  return result.join("");
};

console.log("12345678".divide("87654321"));

String.prototype.multiply = function (string) {
  let num1 = this;
  let num2 = string;
  const { arr1: n1, arr2: n2 } = asciiCode(num1, num2);
  const result = new Array(n1.length + n2.length).fill(0);

  for (let i = n1.length - 1; i >= 0; i--) {
    for (let j = n2.length - 1; j >= 0; j--) {
      let prod = n1[i] * n2[j];
      let p1 = i + j;
      let p2 = i + j + 1;
      let sum = prod + result[p2];
      result[p2] = sum % 10;
      result[p1] += Math.floor(sum / 10);
    }
  }
  while (result.length > 1 && result[0] === 0) result.shift();

  return result.join("");
};
console.log("12".multiply("12"));
