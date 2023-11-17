// Define the 'category' enum
enum Category {
  focus = 'focus',
  next = 'next',
  waiting = 'waiting',
  completedToday = 'completedToday',
  // Add more categories as needed
}

// Export the 'category' enum for use in other files
export type category = keyof typeof Category;
export const listCategory: category[] = Object.keys(Category) as category[];

export type task = { id: string, displayText: string, url?: URL, complete: boolean, subtasks?: task[], category: category }