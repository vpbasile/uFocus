import { Button, ButtonGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ColorModeButton from '../helpers/colorModeButton';
import { myRouteDef } from '../typeRoute';
export default function Nav(props: { routesList: myRouteDef[] }) {

    const routesList = props.routesList

    return (<ButtonGroup isAttached p={5}>
        {routesList.map((route) => {
            return <Button>
                <Link to={route.path}>{route.displayTitle}</Link>
            </Button>
        })}
        <ColorModeButton />
    </ButtonGroup >)
}