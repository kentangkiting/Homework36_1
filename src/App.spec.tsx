import App from "./App";
import { render } from "@testing-library/react";
// import {describe} from "jest"

describe(App, () => {
  test("Should show title", () => {
    const { getByText } = render(<App></App>);
    expect(getByText("Hello Jayjay Student!")).toBeTruthy;
  });
});

describe(App, () => {
  test("Should show sub title", () => {
    const { getByText } = render(<App></App>);
    expect(getByText("Let's create unit test")).toBeTruthy;
  });
});
