// <> Initial task data and other app data

import { Kbd } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { category, listCategory, task } from './task';


export const initialTasks: task[] = [
    { id: nanoid(), displayText: "Implement react router", status: 'inProgress', category: "focus" },
    { id: nanoid(), displayText: "Render recursive tasks.", status: 'waiting', category: "focus" },
    { id: nanoid(), displayText: "Handle state storage", status: 'complete', category: "focus" },
    { id: nanoid(), displayText: "Add a 'Focus now' button that collapses everything except the focus list.", status: 'inProgress', category: "focus" },
    { id: nanoid(), displayText: "Add a 'Generate daily accomplishments' button that will output a string that will list everything you did that day then move everything from 'completed today' to 'complete'.", status: 'inProgress', category: "next" },
    { id: nanoid(), displayText: "Integrate the RTM API", status: 'inProgress', category: "next" },
    { id: nanoid(), displayText: "Add a 'Plan' button.", status: 'inProgress', category: "next" },
    { id: nanoid(), displayText: "Handle an empty list", status: 'inProgress', category: "next" },
    { id: nanoid(), displayText: "[Emailed Sue] When is the event?", status: 'waiting', category: "next" },
    { id: nanoid(), displayText: "[Preethi will be back on Tuesday] What's the plan?", status: 'waiting', category: "next" },
    { id: nanoid(), displayText: "Create an accordion for each category.", status: 'complete', category: 'completedToday' },
    { id: nanoid(), displayText: "This was another task, though it was surprisingly long for what you'd expect for the text of a task.", status: 'complete', category: 'completedToday' },
    { id: nanoid(), displayText: "Example task", status: 'complete', category: 'completedToday' },

];

function tasksOfCategory(category: category) { return initialTasks.filter(eachTask => eachTask.category === category); }
export const groupedTasks = new Map<category, task[]>((listCategory.map((eachCategory) => { return [eachCategory, tasksOfCategory(eachCategory)]; })))


export const notesList = [
    <>When an element is made dragggable, you can no longer highlight the text within that element unless you hold down<Kbd>alt</Kbd>.</>,
    <>No detail panel - each task is a string and may have subtasks. </>,
    <>Recursion will be complicated.  </>,
    <>I'd like to do something about the way Chakra handles lists with icons.  You can't use stylePosition for some reason.  I think I'll need to override the css/emotion</>,
    <>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis earum placeat quis necessitatibus inventore a ab consequuntur magni quas nam consequatur, nisi, minima fugit, delectus veritatis velit. Reiciendis, aut dolores!</>
]