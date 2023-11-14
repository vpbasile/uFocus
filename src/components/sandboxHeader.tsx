import { Flex, Heading, VStack, Link } from "@chakra-ui/react";
import ColorModeButton from "./helpers/colorModeButton";
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
    const foregroundColor = props.foregroundColor;

    return (<Flex id="header" borderBottom={`2px solid ${foregroundColor}`} marginBottom={'xl'}>
        <VStack>
            <Heading flex={3} as={'h1'}><Link href="/">uFocus</Link></Heading>
            <ColorModeButton />
        </VStack>
    </Flex >)
}