import React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  TextArea,
  Button,
} from "@patternfly/react-core";

interface TaskDetailsProps {
  taskId: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId }) => {
  return (
    <Card className="pf-u-mx-auto pf-u-p-4" style={{ maxWidth: "64rem" }}>
      <CardTitle data-testid="task-details-title">Task Details</CardTitle>
      <CardBody data-testid={`task-details-${taskId}`}></CardBody>
      <CardTitle>Comments</CardTitle>
      <CardBody>
        <ul data-testid="comments-list" className="pf-u-mb-md pf-u-w-100"></ul>
        <form data-testid="comment-form">
          <TextArea
            name="content"
            data-testid="comment-input"
            className="pf-u-mb-sm"
          />
          <Button
            data-testid="add-comment-button"
            variant="primary"
            type="submit"
          >
            Add Comment
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default TaskDetails;
