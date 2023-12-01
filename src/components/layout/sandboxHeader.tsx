import { Flex, Heading, Image, Spacer } from "@chakra-ui/react";
import Nav from "./Nav";
import { myRouteDef } from "../typeRoute";
// import { useState } from "react";

export default function Header(props: { routesList: myRouteDef[] }) {
    return (<Flex id="header" borderBottom={`2px`} marginBottom={'xl'} w={'full'}>
        <Flex p={5}>
            <Image src="/microscope-blue.svg" h={10} p={1} />
            <Heading color={'blue.500'} flex={3} as={'h1'} p={'xl'} textShadow={2}><>uFocus</></Heading>
        </Flex>
        <Spacer />
        <Nav routesList={props.routesList} />
    </Flex >)
}