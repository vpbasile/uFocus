import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import SandboxFooter from './sandboxFooter'
import SandboxHeader from './sandboxHeader'
import { myRouteDef } from '../typeRoute'

export default function Layout(props: { routesList: myRouteDef[] }) {
    const routesList = props.routesList;
    return (<>
        <SandboxHeader routesList={routesList}/>
        <Box id='mainBody' p={9}>
            {/* This is where the children will be rendered */}
            <Outlet />
        </Box>
        <SandboxFooter />
    </>)
}