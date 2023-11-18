import { CheckIcon, HamburgerIcon, ArrowUpIcon, ArrowDownIcon, TimeIcon } from "@chakra-ui/icons";
import { Button, Tr, Td, ButtonGroup } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { task } from "./task";

export default function TaskContents(props: { tasks: task[], rankUp: unknown, rankDown: unknown }) {
    const tasks = props.tasks;
    const rankUp = props.rankUp;
    const rankDown = props.rankDown;

    return <></>;

}