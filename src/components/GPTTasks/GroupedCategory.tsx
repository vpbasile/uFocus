// GPTTasks.tsx

import { Box, Heading, Button, Tbody, Td, Tr, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Table, Input, RadioGroup, Radio, useColorModeValue } from '@chakra-ui/react';
import { category, listCategory, stateType, task } from './task';
import TaskTable from './TaskTable';
import { groupedTasks } from './task-spoof';
import { useReducer, useState } from 'react';
import taskReducer, { Action } from './todoSlice';


export default function GroupedCategory() {
    // ---------------------------------------------
    // <><> Style constants
    // ---------------------------------------------
    // const accentColor = 'blue.900';
    const expandedStyle = { bg: 'inherit', color: useColorModeValue('black', 'white') };
    const collapsedStyle = { bg: 'inherit', color: 'gray.500' }

    // ---------------------------------------------
    // <><> States
    // ---------------------------------------------
    const [taskState, dispatch] = useReducer<(state: stateType, action: Action) => stateType, stateType>(taskReducer, groupedTasks, (groupedTasks) => groupedTasks);

    const [tempText, SETtempText] = useState("Text of the new task");
    const [tempCategory, SETtempCategory] = useState(listCategory[0]);

    // ---------------------------------------------
    // <><> Actions
    // ---------------------------------------------
    // Function to dispatch the RANK_UP action
    function handleAddNew(category: category, displayText: string) {
        dispatch({ type: 'ADD_TASK', payload: { category: category, displayText: displayText } })
        // // Resetting the input fields
        SETtempText("Text of the new task");
        SETtempCategory(listCategory[0]);
    }

    // ---------------------------------------------
    // <><> Functions that handle rendering
    // ---------------------------------------------
    return (<>
        <Box display={{ md: 'flex' }}>
            <Box id='taskList' p={9} flex={1}>
                <Heading as={'h2'} sx={collapsedStyle}>view: grouped-category</Heading>
                <Accordion defaultIndex={[0]}>
                    {listCategory.map((eachCategory) => {
                        const relevantTasks: task[] = taskState.get(eachCategory) as task[]
                        return <AccordionItem key={`${eachCategory}`}>
                            <AccordionButton
                                sx={collapsedStyle} _expanded={expandedStyle}
                                rounded={'xl'} >
                                <Box as="span" flex='1' textAlign='left'>
                                    <Heading as={'h3'}>{eachCategory}({relevantTasks.length})</Heading>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}><TaskTable category={eachCategory} relevantTasks={relevantTasks}
                                dispatch={dispatch} /></AccordionPanel>
                        </AccordionItem>
                    })}
                    <AccordionItem id='newTaskForm'>
                        <AccordionButton rounded={'xl'} sx={collapsedStyle} _expanded={expandedStyle}>
                            <Box as="span" flex='1' textAlign='left'>
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
                                    <Button ml={2} onClick={() => { handleAddNew(tempCategory, tempText) }}>
                                        Add Task
                                    </Button>
                                </Td>
                            </Tr></Tbody>

                        </Table></AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Box >
    </ >);
}