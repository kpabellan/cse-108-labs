let result = 0;
let operand1 = '';
let operand2 = '';
let operation = '';
let lastOperation = '';
let lastOperand = '';
const operationList = ['+', '-', 'x', '/'];
let firstOperand = true;

const initializeButtons = () => {
  for (let i = 0; i < 10; i++) {
    document.getElementById(i.toString()).addEventListener('click', () => {
      appendNumber(i.toString());
    });
  }

  document.getElementById('.').addEventListener('click', () => {
    appendDecimal();
  });

  document.getElementById('C').addEventListener('click', () => clearAll());

  operationList.forEach(op => {
    document.getElementById(op).addEventListener('click', () => {
      setActiveOperation(op);
      setOperation(op);
    });
  });

  document.getElementById('=').addEventListener('click', () => {
    if (!operand2 && lastOperand) {
      operand2 = lastOperand;
      calculate(true);
    } else {
      calculate();
    }
    firstOperand = true;
  });
};

const appendNumber = (num) => {
  setActiveOperation('');
  if (firstOperand) {
    operand1 += num;
  } else {
    operand2 += num;
  }
  document.getElementById('displayPanel').textContent = firstOperand ? operand1 : operand2;
};

const appendDecimal = () => {
  if (firstOperand && !operand1.includes('.')) {
    operand1 += '.';
    if (operand1 === '.') operand1 = '0.';
  } else if (!firstOperand && !operand2.includes('.')) {
    operand2 += '.';
    if (operand2 === '.') operand2 = '0.';
  }
  document.getElementById('displayPanel').textContent = firstOperand ? operand1 : operand2;
};

const clearAll = () => {
  result = 0;
  operand1 = '';
  operand2 = '';
  operation = '';
  lastOperation = '';
  lastOperand = '';
  firstOperand = true;
  setActiveOperation('');
  document.getElementById('displayPanel').textContent = '0';
};

const setOperation = (op) => {
  if (operand1) {
    if (operand2) {
      calculate();
    }
    operation = op;
    lastOperation = op;
    firstOperand = false;
  }
};

const setActiveOperation = (op) => {
  operationList.forEach(operation => {
    document.getElementById(operation).style.backgroundColor = operation === op ? '#548B2F' : '#70AD47';
  });
};

const calculate = (usingLastOperand = false) => {
  if (operand1 && (operand2 || usingLastOperand) && operation) {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2 || lastOperand);

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case 'x':
        result = num1 * num2;
        break;
      case '/':
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          alert('Cannot divide by zero');
          return;
        }
        break;
    }

    if (!usingLastOperand) {
      lastOperand = operand2;
    }

    document.getElementById('displayPanel').textContent = result.toString();
    operand1 = result.toString();
    operand2 = '';
  }
};

initializeButtons();