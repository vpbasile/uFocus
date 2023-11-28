import { Flex, Heading, Link } from "@chakra-ui/react";
import Nav from "./Nav";
import { myRouteDef } from "../typeRoute";
// import { useState } from "react";

export default function Header(props: { routesList: myRouteDef[] }) {
    return (<Flex id="header"
        borderBottom={`2px`}
        marginBottom={'xl'}>
        <Flex p={5}>
            <Heading flex={3} as={'h1'} p={'xl'}><Link href="/">uFocus</Link></Heading>
            <Nav routesList={props.routesList} />
        </Flex>
    </Flex >)
}