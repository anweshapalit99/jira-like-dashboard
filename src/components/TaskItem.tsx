import React from "react";
import { Card, CardBody, Button } from "@patternfly/react-core";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <Card data-testid={`task-${task.id}`} className="pf-u-mb-sm pf-u-w-100">
      <CardBody className="pf-u-display-flex pf-u-justify-content-space-between">
        <span>{task.title}</span>
        <div>
          <Button data-testid={`edit-task-${task.id}`} variant="link">
            Edit
          </Button>
          <Button data-testid={`delete-task-${task.id}`} variant="danger">
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskItem;
