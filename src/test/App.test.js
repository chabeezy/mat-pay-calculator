import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";

describe("App", () => {
  const submitForm = () => {
    const salaryEntryBox = screen.getByLabelText(
      "What is your current salary?"
    );
    const firstWeeksInput = screen.getByLabelText("How many weeks will you receive this?");
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
    fireEvent.submit(submitButton);
  };

  const setup = (jsx) => {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  };

  test("renders the maternity pay calculator", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("Maternity Pay Calculator")).toBeInTheDocument();
  });

  it("displays results when form has been submitted", async () => {
    const { user } = setup(
      <Provider store={store}>
        <App />
      </Provider>
    );

    submitForm();

    expect(
      screen.getByText(
        "A month by month breakdown of your pay over the next 12 months"
      )
    ).toBeInTheDocument();

    await user.click(screen.getByTestId("reset"));
  });

  it("displays home screen if results are reset", async () => {
    const { user } = setup(
      <Provider store={store}>
        <App />
      </Provider>
    );

    submitForm();

    await user.click(screen.getByTestId("reset"));

    expect(
      await screen.findByLabelText(
        "What is your current salary?"
      )
    ).toBeInTheDocument();
  });
});
