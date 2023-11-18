import { CheckIcon, TimeIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { task } from "./task";

export default function StatusButton(props: { thisTask: task }) {
    switch (props.thisTask.status) {
        case 'complete': return <Button leftIcon={<CheckIcon />} />; break;
        case 'waiting': return <Button leftIcon={<TimeIcon />} />; break;
        default: return <Button leftIcon={<HamburgerIcon />} />; break;
    }
}