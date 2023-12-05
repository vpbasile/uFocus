// TaskTable.tsx

import { Tr, Td, Tbody, Table, useColorModeValue } from "@chakra-ui/react";
import { status, task, category } from "./task";
import { Dispatch } from "react";
import { Action } from "./todoReducer";
import TaskTableRow from "./TaskTableRow";

export default function TaskTable(props: { category:category; relevantTasks: task[], dispatch: Dispatch<Action> }) {
    // ---------------------------------------------
    // <><> Cache props
    // ---------------------------------------------
    const relevantTasks = props.relevantTasks;
    const dispatch = props.dispatch;

    // ---------------------------------------------
    // <><> Style
    // ---------------------------------------------
    const fgColor = useColorModeValue('black', 'white')

    function taskStyle(statusKey: status) {
        switch (statusKey) {

            // GPT, I should define these colors in the theme to make things more readable and to separate concerns.
            case 'waiting': return { color: 'blue.500' };
            case 'complete': return { color: 'green.500' };
            default: return { color: fgColor };
        }
    }

    // ---------------------------------------------
    // <><> Main Return
    // ---------------------------------------------
    return <Table w={'full'}><Tbody>
        {relevantTasks ? relevantTasks.map((thisTask, taskRank) => {
            return <TaskTableRow key={`${props.category}_${thisTask.id}`} task={thisTask} taskRank={taskRank} taskStyle={taskStyle(thisTask.status)}
                isFirst={taskRank === 0} isLast={taskRank === relevantTasks.length - 1} dispatch={dispatch} />
        }) : <Tr key={'row_emptySection'}><Td>Empty</Td></Tr>}
    </Tbody></Table>
}