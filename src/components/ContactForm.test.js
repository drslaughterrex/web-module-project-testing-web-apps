import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
	render(<ContactForm />);
});

test("renders the contact form header", () => {
	render(<ContactForm />);
	const header = screen.queryByText(/Contact Form/i);
	expect(header).toBeInTheDocument();
	expect(header).toBeTruthy();
	expect(header).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
	render(<ContactForm />);

	const firstInput = screen.getByLabelText("First Name*");
	const lastInput = screen.getByLabelText("Last Name*");
	const emailInput = screen.getByLabelText("Email*");

	userEvent.type(firstInput, "Justin");
	userEvent.type(lastInput, "McGraw");
	userEvent.type(emailInput, "justinmcgraw@rex.com");

	const error = await screen.findAllByText(/error/i);

	expect(error.length).toEqual(1);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
	render(<ContactForm />);

	const submit = screen.getByTestId("submitButton");

	userEvent.click(submit);

	const error = await screen.findAllByText(/error/i);
	expect(error.length).toEqual(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
	render(<ContactForm />);

	const firstInput = screen.getByLabelText("First Name*");
	const lastInput = screen.getByLabelText("Last Name*");
	const submit = screen.getByTestId("submitButton");

	userEvent.type(firstInput, "Justin");
	userEvent.type(lastInput, "McGraw");
	userEvent.click(submit);

	const error = await screen.findAllByText(/error/i);
	expect(error.length).toEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />);

	const email = screen.getByLabelText("Email*");
	userEvent.type(email, "falseemail");

	const error = await screen.findAllByTestId(/error/i);
	expect(error.length).toEqual(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
	render(<ContactForm />);

	const firstInput = screen.getByLabelText("First Name*");
	const emailInput = screen.getByLabelText("Email*");
	const submit = screen.getByTestId("submitButton");

	userEvent.type(firstInput, "Justin");
	userEvent.type(emailInput, "justinmcgraw@rex.com");
	userEvent.click(submit);

	const err = await screen.findAllByTestId(/error/i);

	expect(err.length).toEqual(1);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
	render(<ContactForm />);

	const firstInput = screen.getByLabelText("First Name*");
	const lastInput = screen.getByLabelText("Last Name*");
	const emailInput = screen.getByLabelText("Email*");
	const submit = screen.getByTestId("submitButton");

	userEvent.type(firstInput, "Justin2");
	userEvent.type(lastInput, "McGraw2");
	userEvent.type(emailInput, "justinmcgraw@rex.com");
	userEvent.click(submit);

	const firstSubmit = screen.getByTestId("firstnameDisplay");
	const lastSubmit = screen.getByTestId("lastnameDisplay");
	const emailSubmit = screen.getByTestId("emailDisplay");
	const message = screen.queryByTestId("messageDisplay");

	expect(firstSubmit).toBeVisible;
	expect(emailSubmit).toBeVisible;
	expect(lastSubmit).toBeVisible;
	expect(message).toBeNull();
});

test("renders all fields text when all fields are submitted.", async () => {
	render(<ContactForm />);

	const firstInput = screen.getByLabelText("First Name*");
	const lastInput = screen.getByLabelText("Last Name*");
	const emailInput = screen.getByLabelText("Email*");
	const submit = screen.getByTestId("submitButton");

	userEvent.type(firstInput, "Justin2");
	userEvent.type(lastInput, "McGraw2");
	userEvent.type(emailInput, "justinmcgraw@rex.com");
	userEvent.click(submit);

	const firstSubmit = screen.getByTestId("firstnameDisplay");
	const lastSubmit = screen.getByTestId("lastnameDisplay");
	const emailSubmit = screen.getByTestId("emailDisplay");
	const message = screen.queryByTestId("messageDisplay");

	expect(firstSubmit).toBeVisible;
	expect(emailSubmit).toBeVisible;
	expect(lastSubmit).toBeVisible;
	expect(message).toBeVisible;
});
