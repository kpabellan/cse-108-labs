import React from 'react';
import { Button } from '@mui/material';

function CalculatorButton({ label, onClick, isOperation, isClicked }) {
  let btnClass = {
    width: '100px',
    height: '60px',
    backgroundColor: isOperation ? (isClicked ? '#548B2F' : '#70AD47') : '#5B9BD5',
    outline: '#7E7576 solid 2px',
    ':hover': {
      backgroundColor: isOperation ? '#5f933c' : '#7fb2e5',
    },
  };

  if (label === 'C') {
    btnClass = {
      ...btnClass,
      backgroundColor: '#ED7D31',
      ':hover': {
        backgroundColor: '#ff771b',
      },
    };
  } else if (label === '=') {
    btnClass = {
      ...btnClass,
      backgroundColor: '#70AD47',
      ':hover': {
        backgroundColor: '#5f933c',
      },
    };
  }

  return (
    <Button variant="contained" onClick={onClick} sx={btnClass}>
      {label}
    </Button>
  );
}

export default CalculatorButton;