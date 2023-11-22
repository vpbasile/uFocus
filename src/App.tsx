import { Box, useColorModeValue } from '@chakra-ui/react'
import SandboxHeader from './components/sandboxHeader'
import SandboxFooter from './components/sandboxFooter'
import GroupedCategory from './components/GPTTasks/GroupedCategory'

function App() {
  const foreGroundColor = useColorModeValue('black', 'white')

  return (
    <>
      <SandboxHeader foregroundColor={foreGroundColor} routes={[]} />
      <Box id='mainBody'>
        <GroupedCategory />
      </Box>
      <SandboxFooter foregroundColor={foreGroundColor} />
    </>
  )
}

export default App
