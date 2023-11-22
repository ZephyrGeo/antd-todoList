import { createContext, useReducer } from "react";

export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
};

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case "added": {
      return [
        {
          id: action.id,
          text: action.text,
          done: false,
          subtasks: [],
        },
        ...tasks,
      ];
    }
    case "toggled": {
      return tasks.map((t) => {
        if (t.id === action.id) {
          const updatedTask = { ...t, done: !t.done };
          const updatedSubtasks = t.subtasks.map((subtask) => ({
            ...subtask,
            done: !t.done,
          }));
          return { ...updatedTask, subtasks: updatedSubtasks };
        } else return t;
      });
    }
    case "subtask_toggled": {
      return tasks.map((t) => {
        if (t.id === action.taskId) {
          const updatedSubtasks = t.subtasks.map((subtask) =>
            subtask.id === action.id
              ? { ...subtask, done: !subtask.done }
              : subtask
          );
          return { ...t, subtasks: updatedSubtasks };
        }
        return t;
      });
    }

    case "saved": {
      return tasks.map((t) => (t.id === action.task.id ? action.task : t));
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      return tasks;
    }
  }
};

const initialTasks = [
  {
    id: 0,
    text: "make ppt",
    done: false,
    subtasks: [
      { id: 6, text: "create outline", done: false },
      { id: 7, text: "design slides", done: false },
    ],
  },
  { id: 1, text: "post something", done: false, subtasks: [] },
  { id: 2, text: "write content", done: false, subtasks: [] },
  { id: 3, text: "add links", done: false, subtasks: [] },
  { id: 4, text: "study basics", done: false, subtasks: [] },
  { id: 5, text: "build a simple app", done: false, subtasks: [] },
];
