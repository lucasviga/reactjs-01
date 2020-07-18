import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import api from "../services/api";

const apiMock = new MockAdapter(api);

import App from "../App";

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe("App component", () => {
  it("should be able to add new repository", async () => {
    const { getByText, getByTestId } = render(<App />);

    apiMock.onGet("projects").reply(200, []);

    apiMock.onPost("projects").reply(200, {
      id: "123",
      title: "Mobile com React Native",
      owner: "Lucas"
    });

    await actWait();

    fireEvent.click(getByText("Adicionar"));

    await actWait();

    expect(getByTestId("repository-list")).toContainElement(
      getByText("Mobile com React Native")
    );
  });

  it("should be able to remove repository", async () => {
    const { getByText, getByTestId } = render(<App />);

    apiMock.onGet("projects").reply(200, [
      {
        id: "123",
        title: "Mobile com React Native",
        owner: "Lucas"
      },
    ]);

    apiMock.onDelete("projects/123").reply(204);

    await actWait();

    fireEvent.click(getByText("Remover"));

    await actWait();

    expect(getByTestId("repository-list")).toBeEmpty();
  });
});
