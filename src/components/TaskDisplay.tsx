import {
    List,
    ListItem,
    ListIcon,
    Box, Heading, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon, Kbd
} from '@chakra-ui/react'
import { ChatIcon, CheckIcon, CopyIcon, DragHandleIcon } from '@chakra-ui/icons'
import { listCategory, task } from './task'
// import { useState } from 'react';

export default function TaskDisplay() {


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

    const currentList = originalList
    
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
            whatToDisplay = relevantTasks.map(thisTask => {
                const taskInfo = thisTask[1];
                const thisIcon = taskInfo.complete ? CheckIcon : CopyIcon;
                return <ListItem key={++numGen}
                    p={2} borderBottom={'1px solid gray'}
                    draggable 
                    // onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}
                ><ListIcon as={DragHandleIcon} /><Icon as={thisIcon} m={2} />{taskInfo.displayText}</ListItem>;
            })
        } else whatToDisplay = [<Box key={++numGen}>Empty</Box>]
        return <List>{whatToDisplay}</List>;
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
                            <AccordionButton rounded={'xl'} _expanded={{ bg: 'blue.900', color: 'white' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    {/* Make this a droppable area */}
                                    <Heading as={'h3'}>{eachCategory}({relevantTasks.length})</Heading>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4} >{taskContents(relevantTasks)}</AccordionPanel>
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