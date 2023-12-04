import { ArrowUpIcon, ArrowDownIcon, CheckIcon, HamburgerIcon, TimeIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Tr, Td, ButtonGroup, Button, SystemStyleObject, Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { task } from "./task";
import { Action } from "./todoSlice";
import { Dispatch } from "react";

export default function TaskTableRow(props: { task: task, taskRank: number, taskStyle: SystemStyleObject, isFirst: boolean, isLast: boolean, dispatch: Dispatch<Action> }) {
    const task = props.task;
    const { category, status, id } = task

    const taskRank = props.taskRank;
    const taskStyle = props.taskStyle;
    const buttonStyle = { ...taskStyle }
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
            case 'complete': return <Button variant={'ghost'} leftIcon={<CheckIcon />} onClick={updateStatus} sx={buttonStyle} size={'xs'} />; break;
            case 'waiting': return <Button variant={'ghost'} leftIcon={<TimeIcon />} onClick={updateStatus} sx={buttonStyle} size={'xs'} />; break;
            default: return <Button variant={'ghost'} leftIcon={<HamburgerIcon />} onClick={updateStatus} sx={buttonStyle} size={'xs'} />; break;
        }
    }

    return <>
        <Tr key={`${category}_${id}`} sx={buttonStyle}>
            <Td id={'task_' + id} className="taskButtons" w={'min-content'}>
                <ButtonGroup size='sm'>
                    <Button variant={'ghost'} leftIcon={<ArrowUpIcon />} onClick={rankUp} isDisabled={props.isFirst} sx={buttonStyle} size={'xs'} />
                    <Button variant={'ghost'} leftIcon={<ArrowDownIcon />} onClick={rankDn} isDisabled={props.isLast} sx={buttonStyle} size={'xs'} />
                </ButtonGroup>
            </Td>
            <Td rowSpan={2}>
                <Editable defaultValue={task.displayText}>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Td>
        </Tr>
        <Tr>
            <Td>
                <ButtonGroup size='sm'>
                    <Button variant={'ghost'} leftIcon={<SmallAddIcon />} sx={taskStyle} size={'xs'} />
                    {whichButton()}
                </ButtonGroup>
            </Td>
        </Tr>
    </>
}