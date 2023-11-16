import { Box, useColorModeValue } from '@chakra-ui/react'
import SandboxHeader from './components/sandboxHeader'
import SandboxFooter from './components/sandboxFooter'
// import TaskDisplay from './components/TaskDisplay'
import GPTTasks from './components/GPTTasks'

function App() {
  const foreGroundColor = useColorModeValue('black', 'white')

  return (
    <>
      <SandboxHeader foregroundColor={foreGroundColor} routes={[]} />
      <Box id='mainBody'>
        {/* <Heading as={'h1'}>uFocus</Heading> */}
        <GPTTasks />
        {/* <TaskDisplay /> */}
      </Box>
      <SandboxFooter foregroundColor={foreGroundColor} />
    </>
  )
}

export default App
