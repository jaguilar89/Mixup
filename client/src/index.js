import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#de6251'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  }
})

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
          <App />
          </ThemeProvider>
        </UserContextProvider>
      </LocalizationProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
