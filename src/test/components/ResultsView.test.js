import React from "react";
import ResultsView from "../../components/ResultsView";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("ResultsView", () => {
  const setup = (text) => {
    render(
      <Provider store={store}>
        <ResultsView />
      </Provider>
    );

    const value = screen.getByText(text);
    return value;
  };

  it("Displays the results header text", () => {
    const results = setup("A month by month breakdown of your pay over the next 12 months");

    expect(results).toBeInTheDocument();
  });

  it("displays months", async () => {
    render(
      <Provider store={store}>
        <ResultsView />
      </Provider>
    );

    const april = screen.getByText("April");
    const may = screen.getByText("May");

    expect(april).toBeInTheDocument();
    expect(may).toBeInTheDocument();
  });
});
