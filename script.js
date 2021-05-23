const displayText = document.querySelector('.display-text');
const buttonsContainer = document.querySelector('.buttons-container');
let displayValue;

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

const buttons = [
  {id: 7, display: 7}, {id: 8, display: 8}, {id: 9, display: 9}, {id: 'divide', display: '/'},
  {id: 4, display: 4}, {id: 5, display: 5}, {id: 6, display: 6}, {id: 'multiply', display: '*'},
  {id: 1, display: 1}, {id: 2, display: 2}, {id: 3, display: 3}, {id: 'subtract', display: '-'},
  {id: 0, display: 0}, {id: 'decimal', display: '.'}, {id: 'equals', display: '='}, {id: 'add', display: '+'},
  {id: 'clear', display: 'CLEAR'}
];

buttons.forEach(button => {
  let newButtonElement = document.createElement('button');
  newButtonElement.id = button.id;
  newButtonElement.textContent = button.display;
  newButtonElement.addEventListener('click', handleClick);
  buttonsContainer.appendChild(newButtonElement);
});

function handleClick(e) {
  let buttonId = e.target.id;
  let buttonDisplay = e.target.textContent;
  displayText.textContent = buttonDisplay;
}

function operate(operator, firstNumber, secondNumber) {
  return operations[operator](firstNumber, secondNumber);
}