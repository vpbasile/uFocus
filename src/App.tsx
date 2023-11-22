import { Box, useColorModeValue } from '@chakra-ui/react'
import SandboxHeader from './components/helpers/sandboxHeader'
import SandboxFooter from './components/helpers/sandboxFooter'
import GroupedCategory from './components/GPTTasks/GroupedCategory'
import { Provider } from 'react-redux'
import { store } from './components/GPTTasks/todoSlice'

function App() {
  const foreGroundColor = useColorModeValue('black', 'white')

  return (
    <>
      <SandboxHeader foregroundColor={foreGroundColor} routes={[]} />
      <Box id='mainBody'>
        <Provider store={store}>
          <GroupedCategory />
        </Provider>
      </Box>
      <SandboxFooter foregroundColor={foreGroundColor} />
    </>
  )
}

export default App
