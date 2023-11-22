import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Tr, Td, ButtonGroup, Button, SystemStyleObject } from "@chakra-ui/react";
import StatusButton from "./StatusButton";
import { task } from "./task";
import { Action } from "./todoSlice";
import { Dispatch } from "react";

export default function DisplayTask(props: { task: task, taskRank: number, taskStyle: SystemStyleObject, isFirst: boolean, isLast: boolean, dispatch: Dispatch<Action> }) {
    const task = props.task;
    const taskRank = props.taskRank;
    const taskID = task.id;
    const taskStyle = props.taskStyle;
    const dispatch = props.dispatch;

    const rankUp = () => { dispatch({ type: 'RANK_UP', payload: { category: task.category, rank: taskRank } }); }
    const rankDn = () => { dispatch({ type: 'RANK_DN', payload: { category: task.category, rank: taskRank } }); }


    return <Tr key={taskID} sx={taskStyle}>
        <Td p={2} borderBottom={'1px solid gray'}>
            <ButtonGroup size='sm' isAttached>
                <Button leftIcon={<ArrowUpIcon />} onClick={rankUp} isDisabled={props.isFirst} sx={taskStyle} />
                <Button leftIcon={<ArrowDownIcon />} onClick={rankDn} isDisabled={props.isLast} sx={taskStyle} />
                <StatusButton thisTask={task} taskRank={taskRank} dispatch={dispatch} sx={taskStyle} />
            </ButtonGroup>
        </Td>
        <Td>{taskRank + ". " + task.displayText}</Td>
    </Tr>
}