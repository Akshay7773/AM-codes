import { render, fireEvent, screen } from "@testing-library/react";
import Home from "./Home";
import userEvent from "@testing-library/user-event";

it("checked button rendering", () => {
  render(<Home />);
  const btn = screen.getByLabelText("Any");
  expect(btn).toBeTruthy();
});

describe("before click on Custom buttons should be disabled", () => {
  it("onClick", () => {
    render(<Home />);
    const cbEl1 = screen.getByTestId("cbShowHide1");
    expect(cbEl1).toBeDisabled();
  });
});

it("After clicking on Custom buttons should be enabled", () => {
  render(<Home />);
  const btn2 = screen.getByTitle("secondBtn");
  userEvent.click(btn2);
  const cbEl1 = screen.getByTestId("cbShowHide1");
  expect(cbEl1).not.toBeDisabled();
  const cbEl2 = screen.getByTestId("cbShowHide2");
  expect(cbEl2).not.toBeDisabled();
});

it("for language selections", () => {
  render(<Home />);
  // const selectValue = screen.getByTestId("selects");
  // const defaultSelected = screen.getByTestId("defaultselected");
  // expect(defaultSelected).toBeTruthy();
  // const afterSelected = screen.getByTestId("afterSelect");
  let options = screen.getAllByTestId("select-option");
  // console.log(options[2].selected);
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeTruthy();
  expect(options[3].selected).toBeFalsy();
  expect(options[4].selected).toBeFalsy();
  expect(options[5].selected).toBeFalsy();

  //after change
  fireEvent.change(screen.getByTestId("selects"), { target: { value: "cs" } }); //after selecting value cs
  expect(options[0].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
});

//for respopnse format
it("for response format", () => {
  render(<Home />);
  const json = screen.getByLabelText("default (json)");
  expect(json).toHaveAttribute("checked");
  expect(json.value).toBe("json");
  const xml = screen.getByLabelText("xml");
});

//for jokeType
it("for joke type", () => {
  render(<Home />);
  const single = screen.getByTestId("single");
  expect(single).toBeChecked();
  const twopart = screen.getByTestId("twopart");
  expect(twopart).toBeChecked();

  userEvent.click(single);
  expect(single).not.toBeChecked();
  userEvent.click(twopart);
  expect(twopart).not.toBeChecked();
});

//for input string
it("for input string", () => {
  render(<Home />);
  const inputString = screen.getByLabelText("string-input");
  expect(inputString.value).toBe("");
  fireEvent.change(inputString, { target: { value: "akshay" } });
  expect(inputString.value).not.toBe("");
});

//for id range
it("for id range", () => {
  render(<Home />);
  const minIdRange = screen.getByLabelText("number-input1");
  expect(minIdRange.value).toBe("0");
  const maxIdRange = screen.getByLabelText("number-input2");
  expect(maxIdRange.value).toBe("1368");

  fireEvent.change(minIdRange, { target: { value: "100" } });
  expect(minIdRange.value).not.toBe("0");

  fireEvent.change(maxIdRange, { target: { value: "100" } });
  expect(maxIdRange.value).not.toBe("1368");
});

// for amount of jokes
it("for amount of jokes", () => {
  render(<Home />);
  const amount = screen.getByLabelText("amount");
  expect(amount.value).toBe("1");
  fireEvent.change(amount, { target: { value: "1024" } });
  expect(amount.value).not.toBe("1");
});

//checking url
it("checks the url", () => {
  render(<Home />);
  const url = screen.getByTestId("url");
  console.log(url.textContent);
  expect(url.textContent).toBe("https://v2.jokeapi.dev/joke/Any");

  const single = screen.getByTestId("single");

  userEvent.click(single);
  expect(url.textContent).not.toBe("https://v2.jokeapi.dev/joke/Any");
});
