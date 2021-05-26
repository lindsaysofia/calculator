const displayText = document.querySelector('.display-text');
const buttonsContainer = document.querySelector('.buttons-container');
const divByZeroMessage = `STOP DIVIDING BY ZERO YOU KNOW THAT'S NOT RIGHT`;
const errorMessage = 'ERROR';
let calculated = [];

// Object with our four operation functions
const operations = {
  add: function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  },
  minus: function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  },
  multiply: function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  },
  slash: function (firstNumber, secondNumber) {
    return (secondNumber === 0) ? divByZeroMessage : firstNumber / secondNumber;
  }
};

// Object with all of our buttons so that we can loop over them and add them to the DOM
const buttons = [
  {id: 'Digit7', display: 7}, {id: 'Digit8', display: 8}, {id: 'Digit9', display: 9}, {id: 'Slash', display: '/'},
  {id: 'Digit4', display: 4}, {id: 'Digit5', display: 5}, {id: 'Digit6', display: 6}, {id: 'Multiply', display: '*'},
  {id: 'Digit1', display: 1}, {id: 'Digit2', display: 2}, {id: 'Digit3', display: 3}, {id: 'Minus', display: '-'},
  {id: 'Digit0', display: 0}, {id: 'Period', display: '.'}, {id: 'Equal', display: '='}, {id: 'Add', display: '+'},
  {id: 'Delete', display: 'CLEAR'}
];

// Event Listeners
buttons.forEach(button => {
  let newButtonElement = document.createElement('button');
  newButtonElement.id = button.id;
  newButtonElement.textContent = button.display;
  newButtonElement.addEventListener('click', handleClick);
  buttonsContainer.appendChild(newButtonElement);
});

window.addEventListener('keyup', handleKeyUp);


// Functions

function operate(operator, firstNumber, secondNumber) {
  return operations[operator](firstNumber, secondNumber);
}

function handleCalculatorInput(input) {
  input = input.toLowerCase();
  switch(input.toLowerCase()) {
    case 'delete': 
      calculated = [];
      break;
    case 'equal':
      handleEquals(input);
      break;
    case 'add':
    case 'minus':
    case 'multiply':
    case 'slash':
      handleOperator(input);
      break;
    case 'period':
      handleDecimal(input);
      break;
    case 'digit0':
    case 'digit1':
    case 'digit2':
    case 'digit3':
    case 'digit4':
    case 'digit5':
    case 'digit6':
    case 'digit7':
    case 'digit8':
    case 'digit9':
      handleOperand(input[input.length - 1]);
      break;
    default:
      break;
  }
  updateDisplay();
}

function handleClick(e) {
  // make sure last element focused is no longer focused;
  document.activeElement.blur();
  handleCalculatorInput(e.target.id);  
}

function handleKeyUp(e) {
  // make sure last element focused is no longer focused
  document.activeElement.blur();
  let key = e.code;
  if (e.shiftKey && e.code === 'Equal') {
    key = 'Add';
  } else if (e.shiftKey && e.code === 'Digit8') {
    key = 'Multiply';
  }
  if (document.getElementById(key)) {
    document.getElementById(key).focus();
  }
  handleCalculatorInput(key);
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
      } else if (buttonId === 'equal') {
        calculated = [buttonId, result.toFixed(1)];
      } else {
        calculated = [result.toFixed(1), buttonId];
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
      if (calculated[0] === 'equal') {
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
      if (calculated[0] === 'equal') {
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
      if (calculated[0] === 'equal') {
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

function updateDisplay() {
  let textToDisplay = (calculated.length === 0) ? '0' : calculated.join('');
  textToDisplay = textToDisplay.replace(/add/, ' + ');
  textToDisplay = textToDisplay.replace(/minus/, ' - ');
  textToDisplay = textToDisplay.replace(/multiply/, ' * ');
  textToDisplay = textToDisplay.replace(/slash/, ' / ');
  textToDisplay = textToDisplay.replace(/equal/, ' = ');
  displayText.textContent = textToDisplay;
  if (calculated.length === 1 && (calculated[0] === divByZeroMessage || calculated[0] === errorMessage)) {
    calculated = [];
  }
}
