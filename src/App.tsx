import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import SandboxHeader from './components/sandboxHeader'
import SandboxFooter from './components/sandboxFooter'

function App() {
  const foreGroundColor = useColorModeValue('black', 'white')

  return (
    <>
      <SandboxHeader foregroundColor={foreGroundColor} routes={[]} />
      <Box id='mainBody'>
        <Heading as={'h1'}>ZZZ Blank Project</Heading>
        <Text>To find everything that needs to be renamed, search for 'zzz'</Text>
      </Box>
      <SandboxFooter foregroundColor={foreGroundColor} />
    </>
  )
}

export default App
