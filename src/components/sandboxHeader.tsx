import { Flex, Heading, VStack, Link, Button, Menu, MenuItem, MenuButton, MenuList } from "@chakra-ui/react";
import ColorModeButton from "./helpers/colorModeButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
// import { useState } from "react";

export type routeType = {
    path: string;
    element: JSX.Element;
    displayName: string;
    font?: string;
    uid: number;
    tags?: string;
}

export default function Header(props: { foregroundColor: string, routes: routeType[] }) {
    const routes = props.routes;
    const foregroundColor = props.foregroundColor;

    // Stuff for toggling the menu
    // const [isOpen, setIsOpen] = useState(false)
    // const toggle = () => setIsOpen(!isOpen)

    // function MenuToggle({ toggle, isOpen }: { toggle: () => void, isOpen: boolean }) {
    //     return (<Box display={{ base: "block", md: "none" }} onClick={toggle}>
    //         {isOpen ? <CloseIcon /> : <MenuIcon />}
    //     </Box>);
    // }

    let keyGen = 0;

    return (<Flex id="header" borderBottom={`2px solid ${foregroundColor}`} marginBottom={'xl'}>
        <VStack>
            <Heading flex={3} as={'h1'}><Link href="/">ZZZ Blank Project</Link></Heading>
            <ColorModeButton />
            {<Menu>
                <MenuButton as={Button} colorScheme='green' leftIcon={<ChevronLeftIcon />} rightIcon={<ChevronRightIcon />}>
                    Choose a module
                </MenuButton>
                <MenuList>
                    {routes.map(eachRoute => {
                        const path = eachRoute.path;
                        return <MenuItem key={keyGen++}><Link href={path}>{eachRoute.displayName}</Link></MenuItem>;
                    })}
                    <MenuItem>First Menu Item</MenuItem>
                    <MenuItem>Second Menu Item</MenuItem>
                    {/* <MenuDivider />
    <MenuGroup title='Help'>
        <MenuItem>Docs</MenuItem>
        <MenuItem>FAQ</MenuItem>
    </MenuGroup> */}
                </MenuList>
            </Menu>}
        </VStack>
    </Flex >)
}