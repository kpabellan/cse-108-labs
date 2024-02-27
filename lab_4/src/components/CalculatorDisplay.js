import { Typography, styled } from '@mui/material';

const CalculatorDisplay = styled(Typography)(() => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 10px',
  backgroundColor: '#ffffff',
  outline: '#000000 solid 2px',
  borderRadius: '5px',
  height: '60px',
}));

export default CalculatorDisplay;