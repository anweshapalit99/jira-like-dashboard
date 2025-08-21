import React, { useCallback, useEffect, useState } from "react";
import {
  Gallery,
  Card,
  CardTitle,
  CardBody,
  Title,
  Flex,
  FlexItem,
  Label,
} from "@patternfly/react-core";
import { useTaskContext } from "../context/TasksContext";
import { TaskTreeNode } from "../types";

// Define types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive?: boolean;
}

interface StatusColumn {
  key: "todo" | "in-progress" | "done";
  label: string;
}

const statusColumns: StatusColumn[] = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

const Dashboard: React.FC = () => {
  const { tasks, initTasks, updateTask } = useTaskContext();
  const [users, setUsers] = useState<User[]>();

  const getUser = (id: string): User | undefined =>
    users && users.find((u) => u.id === id);

  // Drag handlers
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: TaskTreeNode["status"]
  ) => {
    const taskId = event.dataTransfer.getData("taskId");
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, status: newStatus };
      updateTask(updatedTask);
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const fetchData = useCallback(async () => {
    try {
      const [tasksResponse, usersResponse] = await Promise.all([
        fetch("http://localhost:3001/tasks"),
        fetch("http://localhost:3001/users"),
      ]);
      const tasksData = await tasksResponse.json();
      const usersData = await usersResponse.json();
      if (tasksData && usersData) {
        initTasks(tasksData);
        setUsers(usersData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [initTasks]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "4rem",
      }}
    >
      <Title headingLevel="h1" className="marginBottom">
        Kanban Dashboard
      </Title>
      <Flex
        spaceItems={{ default: "spaceItemsLg" }}
        alignItems={{ default: "alignItemsStretch" }}
        direction={{ default: "row" }}
      >
        {statusColumns.map((col) => (
          <FlexItem key={col.key} style={{ flex: 1 }}>
            <Title headingLevel="h2" size="xl" style={{ marginBottom: "1rem" }}>
              {col.label}
            </Title>
            <div
              onDrop={(e) => onDrop(e, col.key)}
              onDragOver={onDragOver}
              style={{
                minHeight: "300px",
                padding: "8px",
                background: "#f5f5f5",
                borderRadius: "6px",
              }}
            >
              <Gallery hasGutter minWidths={{ default: "250px" }}>
                {tasks?.length &&
                  tasks
                    .filter((t) => t.status === col.key)
                    .map((task) => {
                      const user = getUser(task.userId);
                      return (
                        <Card
                          key={task.id}
                          isCompact
                          draggable
                          onDragStart={(e) => onDragStart(e, task.id)}
                        >
                          <CardTitle>{task.title}</CardTitle>
                          <CardBody>
                            <p>{task.description || <i>No description</i>}</p>
                            {user && (
                              <Label
                                color={
                                  user.isActive === false ? "grey" : "blue"
                                }
                              >
                                {user.name}
                              </Label>
                            )}
                          </CardBody>
                        </Card>
                      );
                    })}
              </Gallery>
            </div>
          </FlexItem>
        ))}
      </Flex>
    </div>
  );
};

export default Dashboard;
