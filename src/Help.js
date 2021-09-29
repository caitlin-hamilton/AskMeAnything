import React, { Component } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';

const theme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          backgroundColor: "#800080"
        },
      },
    },
  });
  
  export default function AdminBoard() {
    return (
      <ThemeProvider theme={theme}>
        <Button>font-size: 1rem</Button>
      </ThemeProvider>
    );
  }