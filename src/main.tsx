import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import starfleetTheme from './theming/themeStarfleet.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={starfleetTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
