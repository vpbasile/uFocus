export const listCategory = ["focus", "waiting", "next", "completedToday", "complete"]
export type category = "focus" | "waiting" | "next" | "completedToday" | "complete"
export type task = { id: number, displayText: string, url?: URL, complete: boolean, subtasks?: task[], category: category }