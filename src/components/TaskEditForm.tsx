import React, { useState } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Select,
  SelectOption,
  Button,
} from "@patternfly/react-core";
import type { Task } from "../types";

interface TaskEditFormProps {
  task: Task;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Form
      data-testid="edit-task-form"
      className="pf-u-w-100 pf-u-mx-auto pf-u-p-4"
    >
      <FormGroup label="Title" fieldId="title" isRequired>
        <TextInput
          id="title"
          name="title"
          type="text"
          defaultValue={task.title}
          data-testid="title-input"
          isRequired
        />
      </FormGroup>
      <FormGroup label="Description" fieldId="description">
        <TextArea
          id="description"
          name="description"
          defaultValue={task.description}
          data-testid="description-input"
        />
      </FormGroup>
      <FormGroup label="Status" fieldId="status">
        <Select
          toggle={(toggleRef) => <div ref={toggleRef}>Select Status</div>}
          data-testid="status-input"
          id="status"
          isOpen={isOpen}
          onSelect={() => {
            setIsOpen(false);
          }}
          selected={task.status}
        >
          <SelectOption value="todo">Todo</SelectOption>
          <SelectOption value="in-progress">In Progress</SelectOption>
          <SelectOption value="done">Done</SelectOption>
        </Select>
      </FormGroup>
      <Button data-testid="save-task-button" variant="primary" type="submit">
        Save Task
      </Button>
    </Form>
  );
};

export default TaskEditForm;
