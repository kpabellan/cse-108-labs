import React, { useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import CalculatorDisplay from './components/CalculatorDisplay';
import CalculatorButton from './components/CalculatorButton';

function App() {
  const [display, setDisplay] = useState('0');
  const [operand1, setOperand1] = useState(null);
  const [operand2, setOperand2] = useState(null);
  const [operation, setOperation] = useState(null);
  const [lastOperation, setLastOperation] = useState(null);
  const [isOperationClicked, setIsOperationClicked] = useState(false);

  const handleNumberClick = (number) => {
    if (isOperationClicked || display === '0') {
      setDisplay(number);
      setIsOperationClicked(false);
    } else {
      setDisplay((prev) => prev + number);
    }
  
    if (operation === null) {
      setOperand1((prev) => (prev === null ? number : display + number));
    } else {
      setOperand2((prev) => (prev === null ? number : display + number));
    }
  };
  
  const handleOperationClick = (op) => {
    setIsOperationClicked(true);

    if (op === 'C') {
      setDisplay('0');
      setOperand1(null);
      setOperand2(null);
      setOperation(null);
      setIsOperationClicked(false);
    } else if (op === '=') {
      if (operand1 !== null && operand2 !== null) {
        const result = calculate(operand1, operand2, operation);
        setDisplay(result.toString());
        setOperand1(result);
        setOperand2(null);
        setOperation(null);
        setLastOperation({operand: operand2, operation});
      } else if (lastOperation) {
        const result = calculate(display, lastOperation.operand, lastOperation.operation);
        setDisplay(result.toString());
        setOperand1(result);
      }
    } else {
      if (operand1 !== null && operand2 !== null) {
        const result = calculate(operand1, operand2, operation);
        setDisplay(result.toString());
        setOperand1(result);
        setOperand2(null);
      }
      setOperation(op);
    }
  };

  const calculate = (num1, num2, operation) => {
    let result;
    switch (operation) {
      case '+':
        result = parseFloat(num1) + parseFloat(num2);
        break;
      case '-':
        result = parseFloat(num1) - parseFloat(num2);
        break;
      case 'x':
        result = parseFloat(num1) * parseFloat(num2);
        break;
      case '/':
        result = parseFloat(num2) !== 0 ? parseFloat(num1) / parseFloat(num2) : 'Error';
        break;
      default:
        return 0;
    }
    return Number(result.toFixed(10));
  };

  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      if (operation === null) {
        setOperand1(display + '.');
      } else {
        setOperand2(display + '.');
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ marginTop: 5, padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', outline: '#000000 solid 2px' }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '15px' }}>
          <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CalculatorDisplay variant="h5" component="div">
              {display}
            </CalculatorDisplay>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CalculatorButton label="C" onClick={() => handleOperationClick('C')} />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {['7', '8', '9', '/', '4', '5', '6', 'x', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
            <Grid item xs={3} key={key} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CalculatorButton
                label={key}
                onClick={() => {
                  if (!isNaN(key)) {
                    handleNumberClick(key);
                  } else if (key === '.') {
                    handleDecimalClick();
                  } else {
                    handleOperationClick(key);
                  }
                }}
                isOperation={['+', '-', 'x', '/', '=', 'C'].includes(key)}
                isClicked={isOperationClicked && operation === key}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
