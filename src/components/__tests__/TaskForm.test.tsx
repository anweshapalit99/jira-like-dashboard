import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { render } from "../../test-utils";
import TaskForm from "../TaskForm";
import { useTaskContext } from "../../context/TasksContext";

// Mock the context
jest.mock("../../context/TasksContext");
const mockUseTaskContext = useTaskContext as jest.MockedFunction<
  typeof useTaskContext
>;

// Mock navigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

describe("TaskForm", () => {
  const mockAddTask = jest.fn();
  const mockTasks = Tas[];

  beforeEach(() => {
    mockUseTaskContext.mockReturnValue({
      tasks: mockTasks,
      addTask: mockAddTask,
      updateTask: jest.fn(),
      initTasks: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it("renders all form fields correctly", () => {
    render(<TaskForm />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assigned user/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create task/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /task dashboard/i })
    ).toBeInTheDocument();
  });

  it("loads status options from API", async () => {
    render(<TaskForm />);

    // Wait for the status dropdown to be populated
    await waitFor(() => {
      expect(screen.getByText(/select status/i)).toBeInTheDocument();
    });

    // Click dropdown to open it
    const statusDropdown = screen.getByRole("button", {
      name: /select status/i,
    });
    await userEvent.click(statusDropdown);

    // Check if options are loaded
    await waitFor(() => {
      expect(screen.getByText("To Do")).toBeInTheDocument();
      expect(screen.getByText("In Progress")).toBeInTheDocument();
      expect(screen.getByText("Done")).toBeInTheDocument();
    });
  });

  it("handles form submission with valid data", async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/title/i), "Test Task");
    await user.type(screen.getByLabelText(/assigned user/i), "Test User");
    await user.type(screen.getByLabelText(/description/i), "Test Description");

    // Select status
    await waitFor(() => {
      expect(screen.getByText(/select status/i)).toBeInTheDocument();
    });

    const statusDropdown = screen.getByRole("button", {
      name: /select status/i,
    });
    await user.click(statusDropdown);

    await waitFor(() => {
      expect(screen.getByText("In Progress")).toBeInTheDocument();
    });

    await user.click(screen.getByText("In Progress"));

    // Submit form
    const submitButton = screen.getByRole("button", { name: /create task/i });
    await user.click(submitButton);

    // Verify addTask was called with correct data
    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Task",
        description: "Test Description",
        status: "in-progress",
        userId: "Test User",
        categoryId: "defaultCategoryId",
      })
    );
  });

  it("resets form after successful submission", async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    // Fill out the form
    const titleInput = screen.getByLabelText(/title/i);
    const userInput = screen.getByLabelText(/assigned user/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await user.type(titleInput, "Test Task");
    await user.type(userInput, "Test User");
    await user.type(descriptionInput, "Test Description");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /create task/i });
    await user.click(submitButton);

    // Check if fields are reset
    await waitFor(() => {
      expect(titleInput).toHaveValue("");
      expect(userInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
    });
  });

  it("navigates to dashboard when dashboard button is clicked", async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const dashboardButton = screen.getByRole("button", {
      name: /task dashboard/i,
    });
    await user.click(dashboardButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("handles API error gracefully when fetching status options", async () => {
    // Mock console.error to avoid test output noise
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    // Mock fetch to reject
    global.fetch = jest.fn().mockRejectedValue(new Error("API Error"));

    render(<TaskForm />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching status options:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it("prevents form submission with empty required fields", async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const submitButton = screen.getByRole("button", { name: /create task/i });
    await user.click(submitButton);

    // Form should not submit without required fields
    expect(mockAddTask).not.toHaveBeenCalled();
  });

  it("displays correct status label in dropdown after selection", async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    await waitFor(() => {
      expect(screen.getByText(/select status/i)).toBeInTheDocument();
    });

    // Open dropdown and select option
    const statusDropdown = screen.getByRole("button", {
      name: /select status/i,
    });
    await user.click(statusDropdown);

    await waitFor(() => {
      expect(screen.getByText("Done")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Done"));

    // Check if the selected value is displayed
    await waitFor(() => {
      expect(screen.getByText("Done")).toBeInTheDocument();
    });
  });
});
