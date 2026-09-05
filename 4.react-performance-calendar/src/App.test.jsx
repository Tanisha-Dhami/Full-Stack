import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "./App";

describe("Interactive Calendar Application", () => {

  test("renders main application", () => {
    render(<App />);

    // Specifically check the main H1 heading
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /React Interactive Calendar/i,
      })
    ).toBeInTheDocument();
  });

  test("renders initial calendar events", () => {
    render(<App />);

    expect(screen.getAllByText("React Lecture")).toHaveLength(2);
    expect(screen.getAllByText("DSA Practice")).toHaveLength(2);
    expect(screen.getAllByText("Project Meeting")).toHaveLength(2);
    expect(screen.getAllByText("AI/ML Assignment")).toHaveLength(2);
  });

  test("optimized mode is selected initially", () => {
    render(<App />);

    expect(
      screen.getByText("Optimized", { selector: "p" })
    ).toBeInTheDocument();
  });

  test("switches to non-optimized mode", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Non-Optimized",
      })
    );

    expect(
      screen.getByText("Non-Optimized", { selector: "p" })
    ).toBeInTheDocument();
  });

  test("switches back to optimized mode", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Non-Optimized",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Optimized",
      })
    );

    expect(
      screen.getByText("Optimized", { selector: "p" })
    ).toBeInTheDocument();
  });

  test("counter increases when button is clicked", () => {
    render(<App />);

    const countButton = screen.getByRole("button", {
      name: /Count:/i,
    });

    expect(countButton).toHaveTextContent("Count: 0");

    fireEvent.click(countButton);

    expect(countButton).toHaveTextContent("Count: 1");
  });

  test("input accepts text", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Type something...");

    fireEvent.change(input, {
      target: {
        value: "Testing React Performance",
      },
    });

    expect(input).toHaveValue("Testing React Performance");
  });

  test("calendar displays September 2026", () => {
    render(<App />);

    expect(
      screen.getByText("September 2026")
    ).toBeInTheDocument();
  });

  test("calendar contains all 30 days", () => {
    render(<App />);

    for (let day = 1; day <= 30; day++) {
      expect(
        screen.getByText(String(day), {
          selector: ".calendar-day > strong",
        })
      ).toBeInTheDocument();
    }
  });

});