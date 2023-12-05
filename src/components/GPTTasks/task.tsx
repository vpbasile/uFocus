import { Dispatch } from "react";
import { Action } from "./todoReducer";

// Define the 'category' enum
enum Category {
  focus = 'focus',
  then = 'then',
  completedToday = 'completedToday',
  archive = 'archive',
  // Add more categories as needed
}

enum Status {
  inProgress = 'inProgress',
  waiting = 'waiting',
  complete = 'complete',
}

// Export the 'category' enum for use in other files
export type category = keyof typeof Category;
export const listCategory: category[] = Object.keys(Category) as category[];
// Do the same for status
export type status = keyof typeof Status;
export const listStatus: status[] = Object.keys(Status) as status[];

export type task = {
  id: string, displayText: string, url?: URL, status: status, subTasks?: task[], category: category
}

export type stateType = Map<category, task[]>
export type dispatchType = Dispatch<Action>

export type taskCoordinate = { category: category, taskRank: number}
export type subTaskCoordinate = { category: category, taskRank: number, subTaskRank: number }