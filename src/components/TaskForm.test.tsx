import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  test("renders form elements", () => {
    render(<TaskForm />);

    const form = screen.getByTestId("task-form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("onSubmit");

    const titleInput = screen.getByTestId("title-input");
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute("name", "title");
    expect(titleInput).toHaveAttribute("type", "text");

    const descriptionInput = screen.getByTestId("description-input");
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveAttribute("name", "description");
    expect(descriptionInput).toHaveAttribute("type", "textarea");
    expect(descriptionInput).toHaveAttribute("placeholder");

    const statusInput = screen.getByTestId("status-input");
    expect(statusInput).toBeInTheDocument();
    expect(statusInput).toHaveAttribute("id", "status");
    expect(statusInput).toHaveAttribute("onClick");
    expect(statusInput).toHaveAttribute("toggle");

    const submitButton = screen.getByTestId("submit-task-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
    expect(submitButton).toHaveTextContent("Create Task");
  });
});
