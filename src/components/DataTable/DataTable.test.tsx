import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";

type Row = { id: number; name: string; age: number };
const rows: Row[] = [
  { id: 1, name: "B", age: 30 },
  { id: 2, name: "A", age: 20 }
];
const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true }
];

test("sorts by clicking header", async () => {
  const user = userEvent.setup();
  render(<DataTable<Row> data={rows} columns={columns} />);
  const nameHeader = screen.getByText("Name");
  await user.click(nameHeader);
  const firstCell = screen.getAllByRole("cell")[0];
  expect(firstCell).toHaveTextContent("A");
});

test("renders empty state", () => {
  render(<DataTable<Row> data={[]} columns={columns} />);
  expect(screen.getByText("No data available")).toBeInTheDocument();
});
