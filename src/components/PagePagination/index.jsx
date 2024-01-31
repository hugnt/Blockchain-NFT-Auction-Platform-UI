import React from 'react'
import Pagination from "@mui/material/Pagination";
import { lime, purple } from "@mui/material/colors";

import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider  } from "@mui/material/styles";
import './PagePagination.css'

const theme = createTheme({
    palette: {
      white: {
        main: '#FFF',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    }
  });
export default function PagePagination() {
  return (
    <div id="pagePagination">
      <ThemeProvider theme={theme}>
                <Pagination
                  count={10}
                  size="large"
                  variant="outlined"
                  shape="rounded"
                  color="white"
                />
              </ThemeProvider>
    </div>
    
  )
}
