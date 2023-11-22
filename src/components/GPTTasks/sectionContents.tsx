// SectionContents.tsx

import { Tr, Td, Tbody, Table, useColorModeValue } from "@chakra-ui/react";
import { status, task, category } from "./task";
import { Dispatch } from "react";
import { Action } from "./todoSlice";
import DisplayTask from "./displayTask";

export type dispatchFunction = (category: category, rank: number) => void

export default function SectionContents(props: { relevantTasks: task[], dispatch: Dispatch<Action> }) {
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
            case 'waiting': return { color: 'blue.500' };
            case 'complete': return { color: 'green.500' };
            default: return { color: fgColor };
        }
    }

    // ---------------------------------------------
    // <><> Main Return
    // ---------------------------------------------
    return <Table><Tbody>
        {relevantTasks ? relevantTasks.map((thisTask, taskRank) => {
            return <DisplayTask task={thisTask} taskRank={taskRank} taskStyle={taskStyle(thisTask.status)}
                isFirst={taskRank === 0} isLast={taskRank === relevantTasks.length - 1} dispatch={dispatch} />
        }) : <Tr key={'emptySection'}><Td>Empty</Td></Tr>}
    </Tbody></Table>
}