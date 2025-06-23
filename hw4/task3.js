const bankAccount = {
  _balance: 1000,
  get formattedBalance() {
    return `$${this._balance}`;
  },
  get balance() {
    return this._balance;
  },
  set balance(val) {
    this._balance = val;
  },
  transfer: function (current, target, amount) {
    if (amount > current.balance) return "not enough money(";
    current.balance = current.balance - amount;
    target.balance = target.balance + amount;
  },
};

console.log("balance:", bankAccount.formattedBalance);
bankAccount.balance = 3000;
console.log("changed balance:", bankAccount.formattedBalance);

const bankAccount2 = {
  _balance: 4000,
  get formattedBalance() {
    return `$${this._balance}`;
  },
  get balance() {
    return this._balance;
  },
  set balance(val) {
    this._balance = val;
  },
};

bankAccount.transfer(bankAccount, bankAccount2, 1000);
console.log("remain 1:", bankAccount.formattedBalance);
console.log("remain 2:", bankAccount2.formattedBalance);
