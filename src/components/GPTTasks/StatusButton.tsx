// StatusButton.tsx

import { CheckIcon, TimeIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, SystemStyleObject } from "@chakra-ui/react";
import { task } from "./task";
import { Dispatch } from "react";
import { Action } from "./todoSlice";

export default function StatusButton(props: { thisTask: task, taskRank: number, dispatch: Dispatch<Action>, sx: SystemStyleObject }) {
    const dispatch = props.dispatch;
    const thisTask = props.thisTask;
    const sx = props.sx;
    const thisCategory = thisTask.category;
    const taskRank = props.taskRank;
    const updateStatus = () => { dispatch({ type: 'UPDATE_STATUS', payload: { category: thisCategory, rank: taskRank } }); }
    switch (thisTask.status) {
        case 'complete': return <Button leftIcon={<CheckIcon />} onClick={updateStatus} sx={sx} />; break;
        case 'waiting': return <Button leftIcon={<TimeIcon />} onClick={updateStatus} sx={sx} />; break;
        default: return <Button leftIcon={<HamburgerIcon />} onClick={updateStatus} sx={sx} />; break;
    }
}