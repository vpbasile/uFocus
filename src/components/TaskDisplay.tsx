import { Box, Heading, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon, Kbd, Button, ButtonGroup, Tr, Td, Table, Tbody, List, ListItem } from '@chakra-ui/react'
import { ChatIcon, CheckIcon, ArrowDownIcon, ArrowUpIcon, HamburgerIcon } from '@chakra-ui/icons'
import { listCategory, task } from './task'
import { useState } from 'react';
// import { useState } from 'react';

export default function TaskDisplay() {

    const accentColor = 'blue.900';

    let numGen = 0;
    const originalList: [number, task][] = [
        [++numGen, { id: numGen, displayText: "Render recursive tasks.", complete: false, category: "focus" }],
        [++numGen, { id: numGen, displayText: "Add a 'Focus now' button that collapses everything except the focus list.", complete: false, category: "focus" }],
        [++numGen, { id: numGen, displayText: "Add a 'Generate daily accomplishments' button that will output a string that will list everything you did that day then move everything from 'completed today' to 'complete'.", complete: false, category: "next" }],

        // [++numGen, { id: numGen, displayText: "", complete: false, category: "focus" }],
        [++numGen, { id: numGen, displayText: "Integrate the RTM API", complete: false, category: "next" }],
        [++numGen, { id: numGen, displayText: "Handle state storage", complete: false, category: "next" }],
        [++numGen, { id: numGen, displayText: "Add a 'Plan' button.", complete: false, category: "next" }],
        [++numGen, { id: numGen, displayText: "Handle an empty list", complete: false, category: "next" }],
        // [++numGen, { id: numGen, displayText: "", complete: false, category: "next" }],
        [++numGen, { id: numGen, displayText: "[Emailed Sue] When is the event?", complete: false, category: "waiting" }],
        [++numGen, { id: numGen, displayText: "[Preethi will be back on Tuesday] What's the plan?", complete: false, category: "waiting" }],
        [++numGen, { id: numGen, displayText: "Create an accordion for each category.", complete: true, category: 'completedToday' },],
        [++numGen, { id: numGen, displayText: "This was another task, though it was surprisingly long for what you'd expect for the text of a task.", complete: true, category: 'completedToday' },],
        [++numGen, { id: numGen, displayText: "Example task", complete: true, category: 'completedToday' },],
        // [++numGen, { id: numGen, displayText: "", complete: true, category: 'completedToday' },],
        // [++numGen, { id: numGen, displayText: "", complete: true, category: 'completedToday' },],
        // [++numGen, { id: numGen, displayText: "", complete: true, category: 'completedToday' },],
        // [++numGen, { id: numGen, displayText: "", complete: true, category: 'completedToday' },],
    ]

    const [currentList, updateList] = useState(originalList)

    const notesList = [
        <>When an element is made dragggable, you can no longer highlight the text within that element unless you hold down<Kbd>alt</Kbd>.</>,
        <>No detail panel - each task is a string and may have subtasks. </>,
        <>Recursion will be complicated.  </>,
        <>I'd like to do something about the way Chakra handles lists with icons.  You can't use stylePosition for some reason.  I think I'll need to override the css/emotion</>,
        <>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis earum placeat quis necessitatibus inventore a ab consequuntur magni quas nam consequatur, nisi, minima fugit, delectus veritatis velit. Reiciendis, aut dolores!</>
    ]
    {/* <ListItem>type task = '{id: number, displayText: string, url?: URL, complete: boolean, subtasks?: task[], category: category }'</ListItem> */ }

    // <> Functions that handle rendering
    function taskContents(relevantTasks: [number, task][]) {
        let whatToDisplay = []
        if (relevantTasks.length > 0) {
            let taskCount = 0;
            whatToDisplay = relevantTasks.map(thisTask => {
                const taskInfo = thisTask[1];
                const finishButton = taskInfo.complete ? <Button leftIcon={<CheckIcon />} /> : <Button leftIcon={<HamburgerIcon />} />;
                const taskIndex = taskCount++;
                const [isFirst, isLast] = [taskIndex === 0, taskIndex === relevantTasks.length];
                const taskStyles = isLast ? { borderBottom: "2px solid " + accentColor, paddingBottom: 6 } : { borderBottom: '2px solid black' };
                return <Tr key={taskIndex} sx={taskStyles}>
                    <Td
                        p={2} borderBottom={'1px solid gray'}>
                        <ButtonGroup size='sm' isAttached>
                            <Button>{taskInfo.id}/{taskIndex}</Button>
                            <Button leftIcon={<ArrowUpIcon />} isDisabled={isFirst} onClick={() => rankUp(taskIndex)} />
                            <Button leftIcon={<ArrowDownIcon />} isDisabled={isLast} onClick={() => rankDown(taskIndex)} />
                            {finishButton}
                        </ButtonGroup>
                    </Td>
                    <Td>{taskInfo.displayText}</Td>
                </Tr>
            })
        } else whatToDisplay = [<Tr key={++numGen}><Td>Empty</Td></Tr>]
        return <Tbody>{whatToDisplay}</Tbody>;
    }

    // <> Functions that handle ranking
    function rankUp(taskID: number) {
        const tempList = [...currentList]
        const [thisTask, thatTask] = [tempList[taskID], tempList[taskID - 1]]
        tempList[taskID] = thatTask; tempList[taskID - 1] = thisTask
        updateList(tempList)
    }

    function rankDown(taskID: number) {
        const tempList = [...currentList];
        const [thisTask, thatTask] = [tempList[taskID], tempList[taskID + 1]]; // Swap with the next task
        tempList[taskID] = thatTask;
        tempList[taskID + 1] = thisTask; // Update the correct index
        updateList(tempList);
    }



    // <> Main return


    return (<>
        <Box display={{ md: 'flex' }}>
            <Box id='taskList' p={9} flex={1}>
                <Heading as={'h2'}>Tasks</Heading>
                {listCategory.map((eachCategory) => {
                    const relevantTasks = currentList.filter((eachTask) => { return (eachTask[1].category === eachCategory) })
                    return <Box key={++numGen}>
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <AccordionButton rounded={'xl'} _expanded={{ bg: accentColor, color: 'white' }}>
                                    <Box as="span" flex='1' textAlign='left'>
                                        {/* Make this a droppable area */}
                                        <Heading as={'h3'}>{eachCategory}({relevantTasks.length})</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} ><Table>{taskContents(relevantTasks)}</Table></AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                    </Box>
                }
                )}
            </Box>
            <Box id='no' p={9} flex={1}>
                <Heading as={'h2'}>Notes</Heading>
                <List spacing={3} stylePosition={'inside'}>{notesList.map(eachNote => <ListItem key={++numGen}><Icon as={ChatIcon} /> {eachNote}</ListItem>)}</List>
            </Box>
        </Box>
    </>)


}