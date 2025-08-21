import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Button,
  Flex,
  Dropdown,
  MenuToggle,
  DropdownItem,
  DropdownList,
  /* Menu,
  MenuContent,
  MenuList, */
} from "@patternfly/react-core";
import { useTaskContext } from "../context/TasksContext";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  id: string;
  value: "todo" | "in-progress" | "done";
  label: string;
  children?: MenuItem[];
}

const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, addTask } = useTaskContext();
  const [selected, setSelected] = useState<"todo" | "in-progress" | "done">(
    "todo"
  );
  const [menuOptions, setMenuOptions] = useState<MenuItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = (
      event.currentTarget.elements.namedItem("title") as HTMLInputElement
    ).value;
    const description = (
      event.currentTarget.elements.namedItem(
        "description"
      ) as HTMLTextAreaElement
    ).value;
    const user = (
      event.currentTarget.elements.namedItem("user") as HTMLTextAreaElement
    ).value;
    const status = selected;
    console.log("Form submitted", { title, description, status });
    addTask({
      id: tasks.length.toString(),
      title,
      description,
      status: status,
      userId: user,
      categoryId: "defaultCategoryId",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    // reset form fields
    (
      event.currentTarget.elements.namedItem("title") as HTMLInputElement
    ).value = "";
    (
      event.currentTarget.elements.namedItem(
        "description"
      ) as HTMLTextAreaElement
    ).value = "";
    (
      event.currentTarget.elements.namedItem("user") as HTMLTextAreaElement
    ).value = "";
    setSelected("todo");
    setIsOpen(false);
  };

  const handleTaskDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    fetch("http://localhost:3001/status")
      .then((res) => res.json())
      .then((data) => {
        // Preserve children instead of flattening
        const options: MenuItem[] = (data.status || data).map((item: any) => ({
          id: item.id,
          value: item.id,
          label: item.value,
          children: item.children || [],
        }));
        setMenuOptions(options);
      })
      .catch((err) => console.error("Error fetching status options:", err));
  }, []);

  return (
    <Flex
      justifyContent={{ default: "justifyContentCenter" }}
      alignItems={{ default: "alignItemsCenter" }}
      style={{ height: "100%" }}
    >
      <Form data-testid="task-form" onSubmit={handleSubmit}>
        <FormGroup label="Title" fieldId="title" isRequired>
          <TextInput id="title" name="title" isRequired />
        </FormGroup>

        <FormGroup label="Assigned User" fieldId="user" isRequired>
          <TextInput id="user" name="user" isRequired />
        </FormGroup>

        <FormGroup label="Description" fieldId="description">
          <TextArea id="description" name="description" />
        </FormGroup>

        <FormGroup isRequired label="Status" fieldId="status">
          <Dropdown
            isOpen={isOpen}
            onSelect={() => setIsOpen(false)}
            toggle={(toggleRef) => (
              <MenuToggle
                ref={toggleRef}
                isExpanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {selected
                  ? menuOptions.find((opt) => opt.value === selected)?.label
                  : "Select status"}
              </MenuToggle>
            )}
          >
            <DropdownList>
              {menuOptions.map((opt) => (
                <DropdownItem
                  key={opt.id}
                  value={opt.value}
                  onClick={() =>
                    //!opt.children?.length && setSelected(opt.value)
                    setSelected(opt.value)
                  }
                  /* flyoutMenu={
                    opt.children?.length ? (
                      <Menu>
                        {opt.children.map((child) => (
                          <DropdownItem
                            key={child.id}
                            value={child.value}
                            onClick={() => setSelected(child.value)}
                          >
                            {child.label}
                          </DropdownItem>
                        ))}
                      </Menu>
                    ) : undefined
                  } */
                >
                  {opt.label}
                </DropdownItem>
              ))}
            </DropdownList>
          </Dropdown>
        </FormGroup>

        <Button variant="primary" type="submit">
          Create Task
        </Button>
        <Button variant="primary" type="button" onClick={handleTaskDashboard}>
          Task Dashboard
        </Button>
      </Form>
    </Flex>
  );
};

export default TaskForm;
