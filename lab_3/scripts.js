let result = 0;
let operand1 = '';
let operand2 = '';
let operation = '';

let firstOperand = true;

for (let i = 0; i < 10; i++) {
  document.getElementById(i.toString()).onclick = function() {
    if (firstOperand) {
      operand1 += i.toString();
      document.getElementById('displayPanel').innerHTML = operand1;
    } else {
      operand2 += i.toString();
      document.getElementById('displayPanel').innerHTML = operand2;
    }
  };
}

document.getElementById('C').onclick = function() {
  result = 0;
  operand1 = '';
  operand2 = '';
  operation = '';
  firstOperand = true;
  document.getElementById('displayPanel').innerHTML = result;
};

const setOperation = (op) => {
  if (operand1) {
    operation = op;
    firstOperand = false;
    if (operand2) {
      calculate();
      operand1 = result.toString();
      operand2 = '';
    }
  }
};

document.getElementById('+').onclick = () => setOperation('+');
document.getElementById('-').onclick = () => setOperation('-');
document.getElementById('x').onclick = () => setOperation('x');
document.getElementById('/').onclick = () => setOperation('/');

document.getElementById('=').onclick = function() {
  calculate();
  firstOperand = true;
};

function calculate() {
  if (operand1 && operand2 && operation) {
    switch (operation) {
      case '+':
        result = parseInt(operand1) + parseInt(operand2);
        break;
      case '-':
        result = parseInt(operand1) - parseInt(operand2);
        break;
      case 'x':
        result = parseInt(operand1) * parseInt(operand2);
        break;
      case '/':
        if (operand2 !== '0') {
          result = parseInt(operand1) / parseInt(operand2);
        } else {
          alert('Cannot divide by zero');
          return;
        }
        break;
    }
    document.getElementById('displayPanel').innerHTML = result;
    operand1 = result.toString();
    operand2 = '';
    operation = '';
  }
}
