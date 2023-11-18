import { useState } from 'react';
import { Box, Heading, List, ListItem, Button, Tbody, Td, Tr, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon, Table, Kbd, Input, RadioGroup, Radio } from '@chakra-ui/react';
import { category, listCategory, task } from './task';
import { ChatIcon } from '@chakra-ui/icons';
import { nanoid } from 'nanoid';
import SectionContents from './sectionContents';

export default function GPTTasks() {
    const accentColor = 'blue.900';
    const accented = { bg: accentColor, color: 'white' };

    const notesList = [
        <>When an element is made dragggable, you can no longer highlight the text within that element unless you hold down<Kbd>alt</Kbd>.</>,
        <>No detail panel - each task is a string and may have subtasks. </>,
        <>Recursion will be complicated.  </>,
        <>I'd like to do something about the way Chakra handles lists with icons.  You can't use stylePosition for some reason.  I think I'll need to override the css/emotion</>,
        <>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis earum placeat quis necessitatibus inventore a ab consequuntur magni quas nam consequatur, nisi, minima fugit, delectus veritatis velit. Reiciendis, aut dolores!</>
    ]

    const initialTasks: task[] = [
        { id: nanoid(), displayText: "Render recursive tasks.", status: 'inProgress', category: "focus" },
        { id: nanoid(), displayText: "Add a 'Focus now' button that collapses everything except the focus list.", status: 'inProgress', category: "focus" },
        { id: nanoid(), displayText: "Add a 'Generate daily accomplishments' button that will output a string that will list everything you did that day then move everything from 'completed today' to 'complete'.", status: 'inProgress', category: "next" },
        { id: nanoid(), displayText: "Integrate the RTM API", status: 'inProgress', category: "next" },
        { id: nanoid(), displayText: "Handle state storage", status: 'inProgress', category: "next" },
        { id: nanoid(), displayText: "Add a 'Plan' button.", status: 'inProgress', category: "next" },
        { id: nanoid(), displayText: "Handle an empty list", status: 'inProgress', category: "next" },
        { id: nanoid(), displayText: "[Emailed Sue] When is the event?", status: 'waiting', category: "next" },
        { id: nanoid(), displayText: "[Preethi will be back on Tuesday] What's the plan?", status: 'waiting', category: "next" },
        { id: nanoid(), displayText: "Create an accordion for each category.", status: 'complete', category: 'completedToday' },
        { id: nanoid(), displayText: "This was another task, though it was surprisingly long for what you'd expect for the text of a task.", status: 'complete', category: 'completedToday' },
        { id: nanoid(), displayText: "Example task", status: 'complete', category: 'completedToday' },

    ];

    function tasksOfCategory(category: category) { return initialTasks.filter(eachTask => eachTask.category === category); }

    // Group tasks by category
    const groupedTasks = new Map<category, task[]>((listCategory.map((eachCategory) => { return [eachCategory, tasksOfCategory(eachCategory)]; })))
    const [taskState, setTasks] = useState(groupedTasks);

    const [tempText, SETtempText] = useState("Text of the new task");
    const [tempCategory, SETtempCategory] = useState(listCategory[0]);

    const handleAddTask = () => {
        // Creating a new task with the provided text and category
        const newTask: task = {
            id: nanoid(),
            displayText: tempText,
            status: 'inProgress',
            category: tempCategory,
        };

        // Updating the state to include the new task
        const updatedTasks = new Map(taskState);
        const categoryTasks = updatedTasks.get(tempCategory) || [];
        updatedTasks.set(tempCategory, [...categoryTasks, newTask]);
        setTasks(updatedTasks);

        // Resetting the input fields
        SETtempText("Text of the new task");
        SETtempCategory(listCategory[0]);
    };

    // <> Functions that handle ranking
    function rankUp(taskRank: number, categoryKey: category): void {
        if (taskRank > 1) {
            const oldList = new Map(taskState);
            const oldPart = oldList.get(categoryKey) as task[]
            const [movedTask] = oldPart.splice(taskRank - 1, 1); // Pull out the task we're moving
            oldPart.splice(taskRank - 2, 0, movedTask);
            setTasks(oldList.set(categoryKey, oldPart));
        }
    }

    function rankDown(taskRank: number, categoryKey: category): void {
        const oldList = new Map(taskState);
        const oldPart = oldList.get(categoryKey) as task[];

        if (taskRank < oldPart.length) {
            const [movedTask] = oldPart.splice(taskRank - 1, 1); // Pull out the task we're moving
            oldPart.splice(taskRank, 0, movedTask);
            setTasks(oldList.set(categoryKey, oldPart));
        }
    }


    // <> Functions that handle rendering

    let keyGen = 0;

    return (<>
        <Box display={{ md: 'flex' }}>
            <Box id='taskList' p={9} flex={1}>
                <Heading as={'h2'}>Tasks</Heading>
                <Box key={++keyGen}>
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                            <AccordionButton rounded={'xl'} _expanded={accented}>
                                <Box as="span" flex='1' textAlign='left'>
                                    {/* Make this a droppable area */}
                                    <Heading as={'h3'}>Create task</Heading>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4} ><Table>
                                <Tbody><Tr>
                                    <Td id='createForm' mb={4}>
                                        <Input
                                            placeholder="Task text"
                                            mr={2}
                                            onChange={(e) => SETtempText(e.target.value)}
                                            defaultValue={tempText}
                                        />
                                        <RadioGroup
                                            value={tempCategory}
                                            onChange={(e: category) => { SETtempCategory(e) }}
                                        // ChatpGPT help me out here, please
                                        >
                                            {listCategory.map(thisCat => <Radio key={thisCat} value={thisCat}>{thisCat}</Radio>)}
                                            {/* Add more categories as needed */}
                                        </RadioGroup>
                                        <Button ml={2} onClick={handleAddTask}>
                                            Add Task
                                        </Button>
                                    </Td>
                                </Tr></Tbody>

                            </Table></AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                </Box>
                {listCategory.map((eachCategory) => {
                    const relevantTasks: task[] = taskState.get(eachCategory) as task[]
                    return <Box key={nanoid()}>
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <AccordionButton rounded={'xl'} _expanded={accented}>
                                    <Box as="span" flex='1' textAlign='left'>
                                        {/* Make this a droppable area */}
                                        <Heading as={'h3'}>{eachCategory}({relevantTasks.length})</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} ><SectionContents relevantTasks={relevantTasks} rankUp={rankUp} rankDown={rankDown} /></AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                    </Box>
                }
                )}
            </Box>
            <Box id='notes' p={9} flex={1}>
                <Heading as={'h2'}>Notes</Heading>
                <List spacing={3} stylePosition={'inside'}>{notesList.map(eachNote => <ListItem key={nanoid()}><Icon as={ChatIcon} /> {eachNote}</ListItem>)}</List>
            </Box>
        </Box >
    </>);
}