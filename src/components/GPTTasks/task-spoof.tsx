// <> Initial task data and other app data
import { nanoid } from "nanoid";
import { category, listCategory, task } from './task';


export const initialTasks: task[] = [
    { id: nanoid(), displayText: "Implement react router", status: 'complete', category: "completedToday" },
    { id: nanoid(), displayText: "This was another task, though it was surprisingly long for what you'd expect for the text of a task.", status: 'complete', category: 'then' },
    { id: nanoid(), displayText: "Set up a database connection to store tasks", status: 'inProgress', category: "focus" },
    {
        id: nanoid(), displayText: "Render subTasks.", status: 'waiting', category: "focus", subTasks: [
            { id: nanoid(), displayText: "Figure out if this is feasible", status: 'complete', category: "focus" },
            { id: nanoid(), displayText: "Update the component render", status: 'inProgress', category: "focus" },
            { id: nanoid(), displayText: "Update the reducer to change the subTask's status", status: 'inProgress', category: "focus" }
        ]
    },
    {
        id: nanoid(), displayText: "Add a 'Generate daily accomplishments' button that will output a string that will list everything you did that day then move everything from 'completed today' to 'complete'.", status: 'waiting', category: "then", subTasks: [
            { id: nanoid(), displayText: "Take everything that was in the completedToday category and turn the list into one long string.", status: 'complete', category: "focus" },
            { id: nanoid(), displayText: "Update the category to Archive", status: 'inProgress', category: "focus" },
        ]
    },
    { id: nanoid(), displayText: "Integrate the RTM API", status: 'inProgress', category: "then" },
    { id: nanoid(), displayText: "Handle an empty list", status: 'inProgress', category: "then" },
    { id: nanoid(), displayText: "Create an accordion for each category.", status: 'complete', category: 'completedToday' },
    { id: nanoid(), displayText: "Handle state storage", status: 'complete', category: "focus" },
    { id: nanoid(), displayText: "Example task", status: 'complete', category: 'archive' },

];

function tasksOfCategory(category: category) { return initialTasks.filter(eachTask => eachTask.category === category); }
export const groupedTasks = new Map<category, task[]>((listCategory.map((eachCategory) => { return [eachCategory, tasksOfCategory(eachCategory)]; })))