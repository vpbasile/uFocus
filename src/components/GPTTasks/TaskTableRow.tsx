import { ArrowUpIcon, ArrowDownIcon, CheckIcon, HamburgerIcon, TimeIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Tr, Td, ButtonGroup, Button, SystemStyleObject, Editable, EditableInput, EditablePreview, Table, Tbody, Stack, useColorModeValue, Box } from "@chakra-ui/react";
import { task } from "./task";
import { Action } from "./todoReducer";
import { Dispatch } from "react";

export default function TaskTableRow(props: { task: task, taskRank: number, taskStyle: SystemStyleObject, isFirst: boolean, isLast: boolean, dispatch: Dispatch<Action>, parentRank?: number }) {
    const task = props.task;
    const { category, status, id, subTasks } = task

    const taskRank = props.taskRank;
    const taskStyle = props.taskStyle;
    const buttonStyle = { ...taskStyle }
    const parentRank = props.parentRank;
    const dispatch = props.dispatch;


    let rankUp: () => void, rankDn: () => void, updateStatus: () => void, isSubTask: boolean
    if (!parentRank) {
        // If parentRank has no value, then this is a top-level task
        // Need to standardize my language around parent and child tasks
        isSubTask = false;
        // ---------------------------------------------
        // <><> Update functions for top-level tasks
        // ---------------------------------------------
        rankUp = () => { dispatch({ type: 'RANK_UP', payload: { category, taskRank } }); }
        rankDn = () => { dispatch({ type: 'RANK_DN', payload: { category, taskRank } }); }
        updateStatus = () => { dispatch({ type: 'UPDATE_STATUS', payload: { category, taskRank } }); }

    } else {
        // If parentRank has a value, then this is a subTask
        isSubTask = true;
        // ---------------------------------------------
        // <><> Update funtions for subTasks
        // ---------------------------------------------
        rankUp = () => { dispatch({ type: 'RANK_UP_SUB', payload: { category, taskRank: parentRank, subTaskRank: taskRank }, }); };
        rankDn = () => { dispatch({ type: 'RANK_DN_SUB', payload: { category, taskRank: parentRank, subTaskRank: taskRank }, }); };
        updateStatus = () => { dispatch({ type: 'UPDATE_STATUS_SUB', payload: { category, taskRank: parentRank, subTaskRank: taskRank }, }); };
    }

    let newSub: () => void = () => { }
    if (!isSubTask) {
        // ---------------------------------------------
        // <><> Subtask creation
        // ---------------------------------------------
        if (subTasks) {
            newSub = () => { dispatch({ type: 'ADD_TASK_SUB', payload: { category: category, taskRank: taskRank, subTaskRank: subTasks.length } }) }
        }
    }

    // ---------------------------------------------
    // <><> Stuff for the status buttons
    // ---------------------------------------------
    const statusButton = () => {
        switch (status) {
            case 'complete': return <Button variant={'ghost'} leftIcon={<CheckIcon />} onClick={updateStatus} sx={buttonStyle} size={'xs'} />; break;
            case 'waiting': return <Button variant={'ghost'} leftIcon={<TimeIcon />} onClick={updateStatus} sx={buttonStyle} size={'xs'} />; break;
            default: return <Button variant={'ghost'} leftIcon={<HamburgerIcon />} onClick={updateStatus} sx={buttonStyle} size={'xs'} />; break;
        }
    }


    const taskID = 'task_' + id;
    const backdropColor = useColorModeValue('whiteAlpha.400', 'blackAlpha.400');
    return <>
        {/* GPT: I would like to make each category as an accordion where the accordionbutton has the task with its buttons and the box has the list of subtasks  */}
        <Tr key={`${category}_${id}`} sx={taskStyle} bgColor={backdropColor}>
            <Td id={taskID} className="taskButtons">
                <Box display={{ base:"contents", sm: "flex" }}>
                    <ButtonGroup size='sm'>
                        <Button variant={'ghost'} leftIcon={<ArrowUpIcon />} onClick={rankUp} isDisabled={props.isFirst} sx={buttonStyle} size={'xs'} />
                        <Button variant={'ghost'} leftIcon={<ArrowDownIcon />} onClick={rankDn} isDisabled={props.isLast} sx={buttonStyle} size={'xs'} />
                        {/* If parentRank has a value, then this is a subTask */}
                        {!isSubTask && <Button variant={'ghost'} leftIcon={<SmallAddIcon />} onClick={newSub} sx={taskStyle} size={'xs'} />}
                        {statusButton()}
                    </ButtonGroup>
                    <Stack>
                        <Editable defaultValue={task.displayText}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                        {/* If there are subtasks, display them */}
                        {subTasks && subTasks.length > 0 && (
                            <Table id={taskID + "_subtasks"}><Tbody>
                                {/* Render sub-tasks */}
                                {subTasks.map((subTask, index) => (
                                    <TaskTableRow key={`${category}_${subTask.id}`} task={subTask} taskRank={index} isFirst={index === 0} isLast={index === subTasks.length - 1} dispatch={dispatch} taskStyle={taskStyle} parentRank={taskRank} />
                                ))}
                            </Tbody></Table>)}
                    </Stack>
                </Box>
            </Td>
        </Tr>
    </>
}