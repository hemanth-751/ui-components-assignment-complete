import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "./InputField";

test("renders label and updates value", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<InputField label="Name" placeholder="Type" onChange={onChange} />);
  const input = screen.getByPlaceholderText("Type");
  await user.type(input, "Hi");
  expect(onChange).toHaveBeenCalled();
});

test("shows error message when invalid", () => {
  render(<InputField label="Email" invalid errorMessage="Invalid email" />);
  expect(screen.getByText("Invalid email")).toBeInTheDocument();
});
