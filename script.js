// keep track of first operand, operator and second operand
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// function to update display
function updateDisplay() {
    const display = document.querySelector('.display');
    display.value = calculator.displayValue;
}
updateDisplay();


// handler for number entries
// will pass the button custom value (1, 2, 3, 4, etc.) from the key press to inputDigit function
// creates variables for the 2 properties from calculator object
// first if statements covers 2nd operand instead of appending to 1st operand by checking waitingForSecondOperand value
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if(waitingForSecondOperand === true ) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else if(displayValue === '0') {
        calculator.displayValue = digit;
    } else {
        calculator.displayValue = displayValue + digit;
    }
}

function inputPlusMinus() {
    const { displayValue } = calculator;
    const inputValue = parseFloat(displayValue);
    if (inputValue > 0) {
        calculator.displayValue = calculator.displayValue * -1;
        calculator.displayValue = calculator.displayValue.toString();
    } else if (displayValue.includes('-')) {
        calculator.displayValue = calculator.displayValue.substring(1);
    }
}

function inputPercent() {
    const { displayValue } = calculator;
    const inputValue = parseFloat(displayValue);
        calculator.displayValue = (inputValue / 100);
}


// Handle key presses, listening on container filters down to children (aka Event Delegation)
const keys = document.querySelector('.container');
keys.addEventListener('click', (e) => {
    const target = e.target;
    const value = target.value;
    
    // exit function if clicked outside of a button
    if(!target.matches('button')) {
        return;
    }
    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        case 'plus-minus':
            inputPlusMinus();
            break;
        case 'percent':
            inputPercent();
            break;
        default:
            // check if the key is an integer
            if(Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    console.log(target);
    updateDisplay();
});

// Function to handle decimals. If it doesn't include dot, append to displayValue in calculator object.
function inputDecimal(dot) {
    if(calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// Function to handle operators
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    // condition where there is an operator and waitingForSecondOperand is both true
    // change operator property to what was selected
    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    // is firstOperand null and is the inputValue is not a NaN value (not a number) meaning it is a number
    if(firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if(operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        // sets result of calculate to first operand for next calculation.
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}



// When a user hit an operator after entering a second operand
function calculate(firstOperand, secondOperand, operator) {
    if(operator === '+') {
        return add(firstOperand, secondOperand);
    } else if (operator === '-') {
        return subtract(firstOperand, secondOperand);
    } else if (operator === '*') {
        return multiply(firstOperand, secondOperand);
    } else if (operator === '/') {
        return divide(firstOperand, secondOperand);
    }
    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null,
    calculator.waitingForSecondOperand = false,
    calculator.operator = null,
    console.log(calculator)
}