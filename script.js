const displayText = document.querySelector('.display-text');
const buttonsContainer = document.querySelector('.buttons-container');
const divByZeroMessage = `STOP DIVIDING BY ZERO YOU KNOW THAT'S NOT RIGHT`;
const errorMessage = 'ERROR';
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
      handleDecimal(buttonId);
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
      // if there is a decimal, but there is already a number after it
      if (calculated[0].includes('.') && (calculated[0][calculated[0].length - 1] !== '.')) {
        return;
      } 
      // if there is a decimal, but no number after it yet or any other case
      else {
        calculated[0] = calculated[0] + buttonId;
      }
      break;
    case 2:
      if (calculated[0] === 'equals') {
        calculated = [buttonId];
      } else {
        calculated.push(buttonId);
      }
      break;
    case 3:
      // if there is a decimal, but there is already a number after it
      if (calculated[2].includes('.') && (calculated[2][calculated[2].length - 1] !== '.')) {
        return;
      } 
      // if there is a decimal, but no number after it yet or any other case
      else {
        calculated[2] = calculated[2] + buttonId;
      }
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
      handleEquals(buttonId);
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
      if (result !== 0 && !result) {
        calculated = [errorMessage];
        return;
      } else if (result === divByZeroMessage) {
        calculated = [result];
      } else if (buttonId === 'equals') {
        calculated = [buttonId, result.toFixed(1)];
      } else {
        calculated = [result.toFixed(1), buttonId];
      }
      break;
  }
}

function handleDecimal(buttonId) {
  switch(calculated.length) {
    case 0:
      calculated.push('.');
      break;
    case 1:
      if (calculated[0].includes('.')) {
        return;
      } else {
        calculated[0] = calculated[0] + '.';
      }
      break;
    case 2:
      if (calculated[0] === 'equals') {
        calculated = ['.'];
      } else {
        calculated.push('.');
      }
      break;
    case 3:
      if (calculated[2].includes('.')) {
        return;
      } else {
        calculated[2] = calculated[2] + '.';
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
  if (calculated.length === 1 && (calculated[0] === divByZeroMessage || calculated[0] === errorMessage)) {
    calculated = [];
  }
}
