import { Dispatch } from "react";
import { Action } from "./todoSlice";

// Define the 'category' enum
enum Category {
  focus = 'focus',
  next = 'next',
  completedToday = 'completedToday',
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
  id: string, displayText: string, url?: URL, status: status, subtasks?: task[], category: category
}

export type stateType = Map<category, task[]>
export type dispatchType = Dispatch<Action>