const operations = {
  add: function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  },
  subtract: function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  },
  multiply: function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  },
  divide: function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  }
};

function operate(operator, firstNumber, secondNumber) {
  return operations[operator](firstNumber, secondNumber);
}