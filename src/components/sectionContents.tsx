import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Button, Tr, Td, ButtonGroup, Tbody, Table } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { category, task } from "./task";
import StatusButton from "./StatusButton";

export default function SectionContents(props: { relevantTasks: task[], rankUp: (taskRank: number, categoryKey: category) => void, rankDown: (taskRank: number, categoryKey: category) => void }) {
    const relevantTasks = props.relevantTasks;
    const rankUp = props.rankUp;
    const rankDown = props.rankDown;
    let indexGen = 0;
    let whatToDisplay = []

    // Functions for handling data


    // Functions for rendering
    if (relevantTasks.length > 0) {
        // let taskCount = 0;
        whatToDisplay = relevantTasks.map(thisTask => {
            const taskID = thisTask.id;
            const taskRank = ++indexGen;
            // const taskStyles = isLast ? { borderBottom: "2px solid " + accentColor, paddingBottom: 6 } : { borderBottom: '2px solid black' };
            return <Tr key={taskID} >
                <Td
                    p={2} borderBottom={'1px solid gray'}>
                    <ButtonGroup size='sm' isAttached>
                        <Button>{taskRank}</Button>
                        <Button leftIcon={<ArrowUpIcon />} onClick={() => rankUp(taskRank, thisTask.category)} isDisabled={taskRank === 1} />
                        <Button leftIcon={<ArrowDownIcon />} onClick={() => rankDown(taskRank, thisTask.category)} isDisabled={taskRank === relevantTasks.length} />
                        <StatusButton thisTask={thisTask} />
                    </ButtonGroup>
                </Td>
                <Td>{thisTask.displayText}</Td>
            </Tr>
        })
    } else whatToDisplay = [<Tr key={nanoid()}><Td>Empty</Td></Tr>]

    return <Table><Tbody>
        {whatToDisplay}
    </Tbody></Table>
}