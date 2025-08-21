import React from "react";
import { Select, SelectOption, Card, CardBody } from "@patternfly/react-core";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

interface TaskListProps {
  tasks?: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [] }) => {
  return (
    <Card className="pf-u-mx-auto pf-u-p-4 pf-u-w-100">
      <CardBody>
        <Select
          data-testid="status-filter"
          toggle={(toggleRef) => <div ref={toggleRef}>Select Status</div>}
        >
          <SelectOption value="">All</SelectOption>
          <SelectOption value="todo">Todo</SelectOption>
          <SelectOption value="in-progress">In Progress</SelectOption>
          <SelectOption value="done">Done</SelectOption>
        </Select>
        <ul data-testid="task-list" className="pf-u-mt-md pf-u-space-between">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default TaskList;
