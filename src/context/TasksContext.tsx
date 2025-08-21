import React, { createContext } from "react";
import type { TaskContextType } from "../types";
import { useState } from "react";

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  initTasks: () => {
    console.warn("initTasks not implemented");
  },
  addTask: () => {
    console.warn("addTask not implemented");
  },
  updateTask: () => {
    console.warn("updateTask not implemented");
  },
  deleteTask: () => {
    console.warn("deleteTask not implemented");
  },
  getTaskById: () => {
    console.warn("getTaskById not implemented");
    return undefined;
  },
});

export const TaskContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TaskContextType["tasks"]>([]);

  const initTasks: TaskContextType["initTasks"] = (initialTasks) => {
    setTasks((prev) => [...initialTasks, ...prev]);
  };

  const addTask: TaskContextType["addTask"] = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask: TaskContextType["updateTask"] = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? task : t))
    );
  };

  const deleteTask: TaskContextType["deleteTask"] = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  const getTaskById: TaskContextType["getTaskById"] = (taskId) => {
    return tasks.find((t) => t.id === taskId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        initTasks,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskContextProvider");
  }
  return context;
};
