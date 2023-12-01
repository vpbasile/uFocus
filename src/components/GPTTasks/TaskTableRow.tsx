import { ArrowUpIcon, ArrowDownIcon, CheckIcon, HamburgerIcon, TimeIcon } from "@chakra-ui/icons";
import { Tr, Td, ButtonGroup, Button, SystemStyleObject } from "@chakra-ui/react";
import { task } from "./task";
import { Action } from "./todoSlice";
import { Dispatch } from "react";

export default function TaskTableRow(props: { task: task, taskRank: number, taskStyle: SystemStyleObject, isFirst: boolean, isLast: boolean, dispatch: Dispatch<Action> }) {
    const task = props.task;
    const { category, status, id } = task

    const taskRank = props.taskRank;
    const taskStyle = props.taskStyle;
    const dispatch = props.dispatch;
    // ---------------------------------------------
    // <><> Ranking functions
    // ---------------------------------------------
    const rankUp = () => { dispatch({ type: 'RANK_UP', payload: { category: category, rank: taskRank } }); }
    const rankDn = () => { dispatch({ type: 'RANK_DN', payload: { category: category, rank: taskRank } }); }

    // ---------------------------------------------
    // <><> Stuff for the status button
    // ---------------------------------------------
    const updateStatus = () => { dispatch({ type: 'UPDATE_STATUS', payload: { category: category, rank: taskRank } }); }
    const whichButton = () => {
        switch (status) {
            case 'complete': return <Button leftIcon={<CheckIcon />} onClick={updateStatus} sx={taskStyle} size={'xs'} />; break;
            case 'waiting': return <Button leftIcon={<TimeIcon />} onClick={updateStatus} sx={taskStyle} size={'xs'} />; break;
            default: return <Button leftIcon={<HamburgerIcon />} onClick={updateStatus} sx={taskStyle} size={'xs'} />; break;
        }
    }

    return <Tr key={`${category}_${id}`} sx={taskStyle} size={'xs'}>
        <Td size={'xs'} id={'task_' + id} className="taskButtons">
            <ButtonGroup size='sm' isAttached>
                <Button leftIcon={<ArrowUpIcon />} onClick={rankUp} isDisabled={props.isFirst} sx={taskStyle} size={'xs'} />
                <Button leftIcon={<ArrowDownIcon />} onClick={rankDn} isDisabled={props.isLast} sx={taskStyle} size={'xs'} />
                {whichButton()}
            </ButtonGroup>
        </Td>
        <Td  size={'xs'}>{taskRank + ". " + task.displayText}</Td>
    </Tr>
}