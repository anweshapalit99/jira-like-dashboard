import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEditForm from "./components/TaskEditForm";
import TaskDetails from "./components/TaskDetails";
import AuthProvider from "./context/AuthContext";
import type { Task } from "./types";
import { TaskContextProvider } from "./context/TasksContext";

const defaultTask: Task = {
  id: "",
  title: "",
  description: "",
  status: "todo",
  userId: "",
  categoryId: "",
  createdAt: "",
  updatedAt: "",
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskContextProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskList tasks={[]} />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route
              path="/tasks/:id/edit"
              element={<TaskEditForm task={defaultTask} />}
            />
            <Route path="/tasks/:id" element={<TaskDetails taskId="" />} />
          </Routes>
        </Router>
      </TaskContextProvider>
    </AuthProvider>
  );
};

export default App;
