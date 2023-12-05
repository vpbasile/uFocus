import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { task, category, status, stateType, subTaskCoordinate, taskCoordinate } from './task';
import { groupedTasks } from './task-spoof';
import { nanoid } from 'nanoid';

// Define action types for tasks
type RankUpAction = { type: "RANK_UP"; payload: taskCoordinate }
type RankDownAction = { type: "RANK_DN"; payload: taskCoordinate }
type UpdateStatusAction = { type: 'UPDATE_STATUS'; payload: taskCoordinate };
type AddTaskAction = { type: 'ADD_TASK'; payload: { category: category, displayText: string; } };

// Action types for subTasks
type RankUpSubAction = { type: 'RANK_UP_SUB'; payload: subTaskCoordinate };
type RankDnSubAction = { type: 'RANK_DN_SUB'; payload: subTaskCoordinate };
type UpdateStatusSubAction = { type: 'UPDATE_STATUS_SUB'; payload: subTaskCoordinate };
type AddTaskSubAction = { type: 'ADD_TASK_SUB'; payload: subTaskCoordinate };
export type Action = | RankUpAction | RankDownAction | UpdateStatusAction | AddTaskAction | AddTaskSubAction | RankUpSubAction | RankDnSubAction | UpdateStatusSubAction;

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
            const { category, taskRank } = action.payload as taskCoordinate;
            if (taskRank > 0) {
                // Isolate the category we're updating
                const categoryTasks = taskState.get(category) as task[];
                const copyCategoryTasks = [...categoryTasks];
                // Pull out the task we're moving
                const taskToMove = copyCategoryTasks[taskRank];
                // Remove the task from its current position
                copyCategoryTasks.splice(taskRank, 1);
                // Insert the task at the new position
                copyCategoryTasks.splice(taskRank - 1, 0, taskToMove);
                // Create a new Map to ensure immutability
                const newState = new Map(taskState);
                newState.set(category, copyCategoryTasks);
                return newState;
            } else return taskState;
        }
        case 'RANK_DN': {
            const { category, taskRank } = action.payload as taskCoordinate;
            const categoryTasks = taskState.get(category) as task[]
            const length = categoryTasks.length;
            if (taskRank < length) {
                // Isolate the category we're updating
                const copyCategoryTasks = [...categoryTasks];
                // Pull out the task we're moving
                const taskToMove = categoryTasks[taskRank]
                // Remove the task from its current position
                copyCategoryTasks.splice(taskRank, 1);
                // Insert the task at the new position
                copyCategoryTasks.splice(taskRank + 1, 0, taskToMove);
                // Create a new Map to ensure immutability
                const newState = new Map(taskState);
                newState.set(category, copyCategoryTasks);
                return newState;
            } else return taskState;
        }
        case 'UPDATE_STATUS': {
            const { category, taskRank } = action.payload as taskCoordinate;
            const categoryTasks = taskState.get(category) as task[]
            const oldStatus = categoryTasks[taskRank].status
            const newStatus = nextStatus(oldStatus);
            const taskToUpdate = categoryTasks[taskRank];
            taskToUpdate.status = newStatus
            const newState = new Map(taskState)
            newState.set(category, categoryTasks);
            return newState;
        }
        case 'ADD_TASK_SUB': {
            // Creating a new subtask under the parent, provided its category and rank
            const { category, taskRank } = action.payload as subTaskCoordinate;
            const newID = nanoid();
            const categoryTasks = taskState.get(category) as task[]
            const parentToUpdate = categoryTasks[taskRank];
            const newSubtask: task = { id: newID, displayText: "New task", status: 'inProgress', category };

            const updatedTasks = new Map(taskState);
            const updatedCategoryTasks = [...categoryTasks];

            // Update the parent task with the new subtask
            updatedCategoryTasks[taskRank] = {
                ...parentToUpdate,
                subTasks: [...(parentToUpdate.subTasks || []), newSubtask],
            };

            // Update the category with the modified task list
            updatedTasks.set(category, updatedCategoryTasks);

            return updatedTasks;
        }
        case 'RANK_UP_SUB': {
            const { category, taskRank, subTaskRank } = action.payload as subTaskCoordinate;
            const categoryTasks = taskState.get(category) as task[];
            const parentToUpdate = categoryTasks[taskRank];

            if (parentToUpdate.subTasks && subTaskRank > 0 && subTaskRank < parentToUpdate.subTasks.length) {
                const updatedTasks = new Map(taskState);
                const updatedCategoryTasks = [...categoryTasks];
                const subtaskToMove = parentToUpdate.subTasks[subTaskRank];
                const newSubTasks = [...parentToUpdate.subTasks];
                newSubTasks.splice(subTaskRank, 1);
                newSubTasks.splice(subTaskRank - 1, 0, subtaskToMove);

                updatedCategoryTasks[taskRank] = { ...parentToUpdate, subTasks: newSubTasks };
                updatedTasks.set(category, updatedCategoryTasks);
                return updatedTasks;
            }

            return taskState;
        }
        case 'RANK_DN_SUB': {
            const { category, taskRank, subTaskRank } = action.payload;
            const categoryTasks = taskState.get(category) as task[];
            const parentToUpdate = categoryTasks[taskRank];

            if (parentToUpdate.subTasks && subTaskRank >= 0 && subTaskRank < parentToUpdate.subTasks.length - 1) {
                const updatedTasks = new Map(taskState);
                const updatedCategoryTasks = [...categoryTasks];
                const subtaskToMove = parentToUpdate.subTasks[subTaskRank];
                const newSubTasks = [...parentToUpdate.subTasks];
                newSubTasks.splice(subTaskRank, 1);
                newSubTasks.splice(subTaskRank + 1, 0, subtaskToMove);

                updatedCategoryTasks[taskRank] = { ...parentToUpdate, subTasks: newSubTasks };
                updatedTasks.set(category, updatedCategoryTasks);
                return updatedTasks;
            }

            return taskState;
        }
        case 'UPDATE_STATUS_SUB': {
            const { category, taskRank, subTaskRank } = action.payload as subTaskCoordinate;
            const categoryTasks = taskState.get(category) as task[];
            const parentToUpdate: task = categoryTasks[taskRank];

            if (parentToUpdate.subTasks) {

                // Retrieve the targeted subtask
                const subtaskToUpdate = parentToUpdate.subTasks[subTaskRank] as task;

                const updatedTasks = new Map(taskState);
                const updatedCategoryTasks = [...categoryTasks];

                // Update the parent task with the modified subtask
                updatedCategoryTasks[taskRank] = {
                    ...parentToUpdate,
                    subTasks: parentToUpdate.subTasks.map((subtask, index) =>
                        index === subTaskRank ? subtaskToUpdate : subtask
                    ),
                };

                // Update the category with the modified task list
                updatedTasks.set(category, updatedCategoryTasks);

                return updatedTasks;
            } else return taskState;
        }
        default: return taskState;
    }
}

// I can put this here because I only have one slice.  If I had multiple, I'd put each in a separate file, importing them all into the store file and calling configurestore
export const store = configureStore({ reducer: { todos: taskReducer } })