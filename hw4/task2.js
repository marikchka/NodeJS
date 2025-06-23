const product = {};

Object.defineProperties(product, {
  name: {
    value: "Laptop",
    enumerable: true,
    writable: true,
  },
  price: {
    value: 1000,
    writable: false,
    enumerable: false,
  },
  quantity: {
    value: 5,
    writable: false,
    enumerable: false,
  },
});

const getTotalPrice = function (obj) {
  const descriptorPrice = Object.getOwnPropertyDescriptor(obj, "price");
  const descriptorQuantity = Object.getOwnPropertyDescriptor(obj, "quantity");
  return descriptorPrice.value * descriptorQuantity.value;
};

console.log(getTotalPrice(product));

const deleteNonConfigurable = function (obj, prop) {
  if (Object.hasOwn(obj, prop))
    if (!Object.getOwnPropertyDescriptor(obj, prop).configurable)
      throw new Error(`property ${prop} is non-configurable and can not be deleted`);
  delete obj[prop];
};

deleteNonConfigurable(product, "price");
console.log(Object.getOwnPropertyDescriptors(product));
