const displayText = document.querySelector('.display-text');
const buttonsContainer = document.querySelector('.buttons-container');
const divByZeroMessage = `STOP DIVIDING BY ZERO YOU KNOW THAT'S NOT RIGHT`;
let calculated = [];

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
    return (secondNumber === 0) ? divByZeroMessage : firstNumber / secondNumber;
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
  switch(buttonId) {
    case 'clear': 
      calculated = [];
      break;
    case 'equals':
      handleEquals(buttonId);
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      handleOperator(buttonId);
      break;
    case 'decimal':
      return;
      break;
    default:
      handleOperand(buttonId);
  }
  updateDisplay();
}
  

function handleOperand(buttonId) {
  switch(calculated.length) {
    case 0:
      calculated.push(buttonId);
      break;
    case 1:
      calculated[0] = calculated[0] + buttonId;
      break;
    case 2:
      if (calculated[0] === 'equals') {
        calculated = [buttonId];
      } else {
        calculated.push(buttonId);
      }
      break;
    case 3:
      calculated[2] = calculated[2] + buttonId;
      break;
  }
}

function handleOperator(buttonId) {
  switch(calculated.length) {
    case 0:
      return;
      break;
    case 1:
      calculated.push(buttonId);
      break;
    case 2:
      if (calculated[0] === 'equals') {
        calculated.shift();
        calculated.push(buttonId);
      } else {
        calculated.pop();
        calculated.push(buttonId);
      }
      break;
    case 3:
      handleEquals();
      break;
  }
}

function handleEquals(buttonId) {
  switch(calculated.length) {
    case 0:
    case 1:
    case 2:
      return;
      break;
    case 3:
      let result = operate(calculated[1], +calculated[0], +calculated[2]);
      if (result === divByZeroMessage) {
        calculated = [result];
      } else {
        calculated = [buttonId, result];
      }
      break;
  }
}

function operate(operator, firstNumber, secondNumber) {
  return operations[operator](firstNumber, secondNumber);
}

function updateDisplay() {
  let textToDisplay = (calculated.length === 0) ? '0' : calculated.join('');
  textToDisplay = textToDisplay.replace(/add/, ' + ');
  textToDisplay = textToDisplay.replace(/subtract/, ' - ');
  textToDisplay = textToDisplay.replace(/multiply/, ' * ');
  textToDisplay = textToDisplay.replace(/divide/, ' / ');
  textToDisplay = textToDisplay.replace(/equals/, ' = ');
  displayText.textContent = textToDisplay;
  if (calculated.length === 1 && calculated[0] === divByZeroMessage) {
    calculated = [];
  }
}
