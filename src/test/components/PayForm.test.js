import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import PayForm from "../../components/PayForm";

describe("PayForm", () => {
  const setup = (label) => {
    render(
      <Provider store={store}>
        <PayForm />
      </Provider>
    );

    const input = screen.getByLabelText(label);
    return input;
  };

  it("display a salary entry box with a label", () => {
    const salaryEntryBox = setup("What is your current salary?");

    expect(salaryEntryBox).toBeInTheDocument();
    expect(salaryEntryBox).toHaveAttribute("id", "salary");
  });

  it("display an error after blur when salary entry is blank", () => {
    const salaryEntryBox = setup("What is your current salary?");

    fireEvent.blur(salaryEntryBox);

    expect(screen.getByText("Salary is required")).toBeInTheDocument();
  });

  it("only allows numeric values into the salary entry box", () => {
    const salaryEntryBox = setup("What is your current salary?");

    fireEvent.change(salaryEntryBox, { target: { value: "hello" } });
    expect(salaryEntryBox.value).toBe("");

    fireEvent.change(salaryEntryBox, { target: { value: "25000" } });
    expect(salaryEntryBox.value).toBe("25000");
  });

  it("allows you to enter x weeks at x% pay", () => {
    const firstWeeksInput = setup("How many weeks will you receive this?");
    const firstWeekPercentageInput = setup("What percentage will you receive?");

    expect(firstWeeksInput).toBeInTheDocument();
    expect(firstWeekPercentageInput).toBeInTheDocument();
  });

  it("display an error after blur when weeks entry is blank", () => {
    const firstWeeksInput = setup("How many weeks will you receive this?");

    fireEvent.blur(firstWeeksInput);

    expect(screen.getByText("Number of weeks is required")).toBeInTheDocument();
  });

  it("display an error after blur when percentage entry is blank", () => {
    const percentagePay = setup("What percentage will you receive?");

    fireEvent.blur(percentagePay);

    expect(screen.getByText("Pay percentage is required")).toBeInTheDocument();
  });

  it("allow you to enter x weeks at statutory maternity pay", () => {
    const secondWeeksInput = setup(
      "How many weeks will you receive statutory pay?"
    );

    expect(secondWeeksInput).toBeInTheDocument();
  });

  it("display an error after blur when stat maternity pay entry is blank", () => {
    const secondWeeksInput = setup(
      "How many weeks will you receive statutory pay?"
    );

    fireEvent.blur(secondWeeksInput);

    expect(
      screen.getByText("statutory maternity pay period is required")
    ).toBeInTheDocument();
  });

  it("submit is disabled on load", () => {
    render(
      <Provider store={store}>
        <PayForm />
      </Provider>
    );
    const submitButton = screen.getByText("Calculate");

    expect(submitButton).toBeDisabled();
  });

  test("user can see a student loan option", () => {
    render(
      <Provider store={store}>
        <PayForm />
      </Provider>
    );

    const studentLoan = screen.getByLabelText("Student Loan");

    expect(studentLoan.textContent).toBe("No student loan");
  });

  test("user can select a different student loan", () => {
    render(
      <Provider store={store}>
        <PayForm />
      </Provider>
    );

    const studentLoan = screen.getByTestId("studentLoan");
    expect(studentLoan).toHaveAttribute("value", "0");

    fireEvent.change(studentLoan, { target: { value: "Plan 1" } });
  });

  test("user can select a maternity start month", () => {
    render(
      <Provider store={store}>
        <PayForm />
      </Provider>
    );

    const maternityMonth = screen.getByLabelText("Maternity leave starts in");

    expect(maternityMonth.textContent).toBe("January");
  });

  it("user is prompted to enter text into field if left blank", () => {
    render(
      <Provider store={store}>
        <PayForm />
      </Provider>
    );

    const salaryEntryBox = screen.getByLabelText(
      "What is your current salary?"
    );
    fireEvent.change(salaryEntryBox, { target: { value: "" } });
  });

  it("submit is enabled when fields are complete", async () => {
    render(
      <Provider store={store}>
        <PayForm />
      </Provider>
    );

    const salaryEntryBox = screen.getByLabelText(
      "What is your current salary?"
    );
    const firstWeeksInput = screen.getByLabelText(
      "How many weeks will you receive this?"
    );
    const firstWeekPercentageInput = screen.getByLabelText(
      "What percentage will you receive?"
    );
    const secondWeeksInput = screen.getByLabelText(
      "How many weeks will you receive statutory pay?"
    );

    fireEvent.change(salaryEntryBox, { target: { value: "30000" } });
    fireEvent.change(firstWeeksInput, { target: { value: "20" } });
    fireEvent.change(firstWeekPercentageInput, { target: { value: "90" } });
    fireEvent.change(secondWeeksInput, { target: { value: "20" } });

    const submitButton = screen.getByText("Calculate");

    expect(submitButton).not.toBeDisabled();
  });

  test("user can see a option top select standard statutory pay", () => {
    const standardStatutory = setup("I get statutory maternity pay");

    expect(standardStatutory).toBeInTheDocument();
  });

  test("user can set that they get statutory maternity pay", () => {
    const standardStatutory = setup("I get statutory maternity pay");
    expect(standardStatutory.checked).toEqual(false);

    fireEvent.click(standardStatutory);

    expect(standardStatutory.checked).toEqual(true);
  });

  test("when user selects statutory maternity pay, weeks field sets to 6 and read only", () => {
    const standardStatutory = setup("I get statutory maternity pay");
    const firstWeeksInput = screen.getByLabelText(
      "How many weeks will you receive this?"
    );
    
    fireEvent.click(standardStatutory);

    expect(firstWeeksInput.value).toBe("6");
    expect(firstWeeksInput).toHaveAttribute("disabled");

    
    expect(standardStatutory.checked).toEqual(true);
  });
  test("when user selects statutory maternity pay, percentage field sets to 90 and read only", () => {
    const standardStatutory = setup("I get statutory maternity pay");
    const percentage = screen.getByLabelText(
      "What percentage will you receive?"
    );
    
    fireEvent.click(standardStatutory);

    expect(percentage.value).toBe("90");
    expect(percentage).toHaveAttribute("disabled");

    
    expect(standardStatutory.checked).toEqual(true);
  });
  test("when user selects statutory maternity pay, statutory weeks are set to 33", () => {
    const standardStatutory = setup("I get statutory maternity pay");
    const statWeeks = screen.getByLabelText(
      "How many weeks will you receive statutory pay?"
    );
    
    fireEvent.click(standardStatutory);

    expect(statWeeks.value).toBe("33");
    expect(statWeeks).toHaveAttribute("disabled");

    
    expect(standardStatutory.checked).toEqual(true);
  });
});
