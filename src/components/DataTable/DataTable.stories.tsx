import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

type User = { id: number; name: string; email: string; age: number };
const data: User[] = [
  { id: 1, name: "Aarav", email: "aarav@example.com", age: 24 },
  { id: 2, name: "Diya", email: "diya@example.com", age: 27 },
  { id: 3, name: "Kabir", email: "kabir@example.com", age: 22 }
];
const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
] as const;

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  args: { data, columns, selectable: true }
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { data: [] } };
