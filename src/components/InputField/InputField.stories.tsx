import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: { label: "Email", placeholder: "you@example.com", variant: "outlined", size: "md" },
  parameters: { layout: "centered" }
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true, errorMessage: "Required field" } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const Filled: Story = { args: { variant: "filled" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField label="Small" size="sm" />
      <InputField label="Medium" size="md" />
      <InputField label="Large" size="lg" />
    </div>
  )
};
