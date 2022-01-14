import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { findByText, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);

  const head = screen.getByText(/contact form/i);
  expect(head).toBeInTheDocument();
  expect(head).toBeTruthy();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  //arrange

  const name = screen.queryByLabelText(/First Name/i);
  userEvent.type(name, "tim");

  //act

  //assertion
  const errorMessage = await screen.findAllByTestId("error");
  expect(errorMessage).toHaveLength(1);
});

// test("renders THREE error messages if user enters no values into any fields.", async () => {
//   <ContactForm />;

//   const submitButton = screen.getByRole("button");
//   //console.log(button);
//   userEvent.click(submitButton);

//   waitFor(() => {
//     const errorMessage = screen.queryAllByTestId("error");
//     expect(errorMessage).toHaveLength(3);
//   });
// });

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const name = screen.queryByLabelText(/First Name/i);
  userEvent.type(name, "timmothy");

  const lastname = screen.queryByLabelText(/Last name/i);
  userEvent.type(lastname, "velichko");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const error = await screen.findAllByTestId("error");

  expect(error).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const email = screen.queryByLabelText(/Email/i);
  userEvent.type(email, "velichko");

  const error = await screen.findAllByTestId("error");

  expect(error).toHaveLength(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const name = screen.queryByLabelText(/First Name/i);
  userEvent.type(name, "timmothy");

  const email = screen.queryByLabelText(/Email/i);
  userEvent.type(email, "velichko@gmail.com");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const error = await screen.findAllByTestId("error");

  expect(error).toHaveLength(1);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const name = screen.queryByLabelText(/First Name/i);
  userEvent.type(name, "timmothy");

  const email = screen.queryByLabelText(/Email/i);
  userEvent.type(email, "velichko@gmail.com");

  const lastname = screen.queryByLabelText(/Last name/i);
  userEvent.type(lastname, "velichko");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const nameText = screen.queryByText("timmothy");
    const lastnameText = screen.queryByText("velichko");
    const emailText = screen.queryByText("velichko@gmail.com");
    const messageText = screen.queryByTestId("messageDisplay");

    expect(nameText).toBeInTheDocument();
    expect(lastnameText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
    expect(messageText).not.toBeInTheDocument();
  });
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const name = screen.queryByLabelText(/First Name/i);
  userEvent.type(name, "timmothy");

  const email = screen.queryByLabelText(/Email/i);
  userEvent.type(email, "velichko@gmail.com");

  const lastname = screen.queryByLabelText(/Last name/i);
  userEvent.type(lastname, "velichko");

  const message = screen.queryByLabelText(/message/i);
  userEvent.type(message, "its by bday");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const nameText = screen.queryByText("timmothy");
    const lastnameText = screen.queryByText("velichko");
    const emailText = screen.queryByText("velichko@gmail.com");
    const messageText = screen.queryByTestId("messageDisplay");

    expect(nameText).toBeInTheDocument();
    expect(lastnameText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();
  });
});
