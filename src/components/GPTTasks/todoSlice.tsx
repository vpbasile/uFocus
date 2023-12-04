import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { task, category, status, stateType } from './task';
import { groupedTasks } from './task-spoof';
import { nanoid } from 'nanoid';

type payloadType = { category: category; rank: number; };

// Define action types
type RankUpAction = { type: "RANK_UP"; payload: payloadType }
type RankDownAction = { type: "RANK_DN"; payload: payloadType }
type UpdateStatusAction = { type: 'UPDATE_STATUS'; payload: payloadType };
type AddTaskAction = { type: 'ADD_TASK'; payload: { category: category, displayText: string; } };

export type Action = RankUpAction | RankDownAction | UpdateStatusAction | AddTaskAction;

function nextStatus(currentStatus: status): status {
    switch (currentStatus) {
        case 'inProgress': return 'waiting';
        case 'complete': return 'inProgress';
        default: return 'complete'
    }
}

// Define the reducer function
export default function taskReducer(taskState: stateType = groupedTasks, action: AnyAction): stateType {
    // Action types
    switch (action.type) {
        case 'CREATE_SUBTASK': {
            // Creating a new subtask under the parent, provided its category and rank
            const { category, parentRank, displayText } = action.payload as { category: category, parentRank: number, displayText: string };
            const newID = nanoid();
            const categoryTasks = taskState.get(category) as task[]
            const parentToUpdate = categoryTasks[parentRank];
            const newSubtask: task = { id: newID, displayText, status: 'inProgress', category };
            parentToUpdate.subtasks?.push(newSubtask);
            const updatedTasks = new Map(taskState);
            categoryTasks[parentRank] = parentToUpdate;
            updatedTasks.set(category, [...categoryTasks, parentToUpdate]);
            return updatedTasks;
        }
        case 'ADD_TASK': {
            // Creating a new task with the provided text and category
            const { category, displayText } = action.payload as { category: category, displayText: string };
            const newTask: task = { id: nanoid(), displayText, status: 'inProgress', category };
            const updatedTasks = new Map(taskState);
            const categoryTasks = updatedTasks.get(category) || [];
            updatedTasks.set(category, [...categoryTasks, newTask]);
            return updatedTasks;
        }
        case 'RANK_UP': {
            const { category, rank } = action.payload as payloadType;
            if (rank > 0) {
                // Isolate the category we're updating
                const categoryTasks = taskState.get(category) as task[];
                const copyCategoryTasks = [...categoryTasks];
                // Pull out the task we're moving
                const taskToMove = copyCategoryTasks[rank];
                // Remove the task from its current position
                copyCategoryTasks.splice(rank, 1);
                // Insert the task at the new position
                copyCategoryTasks.splice(rank - 1, 0, taskToMove);
                // Create a new Map to ensure immutability
                const newState = new Map(taskState);
                newState.set(category, copyCategoryTasks);
                return newState;
            } else {
                // No change needed if rank is less than or equal to 1
                return taskState;
            }
        }
        case 'RANK_DN': {
            const { category, rank } = action.payload as payloadType;
            const categoryTasks = taskState.get(category) as task[]
            const length = categoryTasks.length;
            if (rank < length) {
                // Isolate the category we're updating
                const copyCategoryTasks = [...categoryTasks];
                // Pull out the task we're moving
                const taskToMove = categoryTasks[rank]
                // Remove the task from its current position
                copyCategoryTasks.splice(rank, 1);
                // Insert the task at the new position
                copyCategoryTasks.splice(rank + 1, 0, taskToMove);
                // Create a new Map to ensure immutability
                const newState = new Map(taskState);
                newState.set(category, copyCategoryTasks);
                return newState;
            } else return taskState;
        }
        case 'UPDATE_STATUS': {
            const { category, rank } = action.payload as payloadType;
            const categoryTasks = taskState.get(category) as task[]
            const oldStatus = categoryTasks[rank].status
            const newStatus = nextStatus(oldStatus);
            const taskToUpdate = categoryTasks[rank];
            taskToUpdate.status = newStatus
            const newState = new Map(taskState)
            newState.set(category, categoryTasks);
            return newState;
        }
        default: return taskState;
    }
}

// I can put this here because I only have one slice.  If I had multiple, I'd put each in a separate file, importing them all into the store file and calling configurestore
export const store = configureStore({ reducer: { todos: taskReducer } })