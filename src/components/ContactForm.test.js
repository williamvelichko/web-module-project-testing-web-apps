import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

// test('renders without errors', ()=>{

// });

// test('renders the contact form header', ()=> {

// });

// test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

// });

// test('renders THREE error messages if user enters no values into any fields.', async () => {

// });

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

// });

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {

// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// });

// test('renders all fields text when all fields are submitted.', async () => {
// });

test("renders without errors", () => {
  render(<ContactForm />);

  const head = screen.getByText(/contact form/i);
  expect(head).toBeInTheDocument();
  expect(head).toBeTruthy();
});

test("renders error message if the user enters less than 4 characters", async () => {
  render(<ContactForm />);
  //arrange

  const name = screen.queryByLabelText(/First Name/i);
  userEvent.type(name, "tim");

  //act

  //assertion
  const errorName = "Error: firstName must have at least 5 characters.";
  const lastName = "Error: lastName is a required field.";
  const email = "Error: email must be a valid email address";

  const errorNameExists = screen.queryByText(errorName);
  const errorLastNameExists = screen.queryByText(lastName);
  const errorEmailExists = screen.queryByText(email);
  //console.log(errorNameExists);
  expect(errorNameExists).toBeInTheDocument();
});
test("three errors render when user doesnt aplly anything in the inputs", () => {
  <ContactForm />;

  const name = screen.queryByLabelText(/First Name/i);
  const lastName = screen.queryByLabelText(/Last Name/i);
  const email = screen.queryByLabelText(/Email/i);
  //   userEvent.type(name, "");
  //   userEvent.type(lastName, "");
  //   userEvent.type(email, "");

  //   const button = screen.getByRole("button");
  //   console.log(button);
});
