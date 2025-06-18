const calculateDiscountedPrice = function (products, discountPercentage) {
  return products.map((product) => {
    const discountedPrice = product.price - (product.price * discountPercentage) / 100;
    return { ...product, discountedPrice: discountedPrice };
  });
};

const obj = [
  {
    name: "cat",
    price: 194292,
  },
  {
    name: "windows",
    price: 30000000,
  },
  {
    name: "linux",
    price: 0,
  },
];

const calculateTotalPrice = function (products) {
  return products.reduce((total, product) => total + product.price, 0);
};

console.log(calculateDiscountedPrice(obj, 10));
console.log(calculateTotalPrice(obj));
