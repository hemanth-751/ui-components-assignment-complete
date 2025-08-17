import { useState, useMemo } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";

type User = { id: number; name: string; email: string; age: number };

const seed: User[] = [
  { id: 1, name: "Aarav", email: "aarav@example.com", age: 24 },
  { id: 2, name: "Diya", email: "diya@example.com", age: 27 },
  { id: 3, name: "Kabir", email: "kabir@example.com", age: 22 }
];

export default function App() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => seed.filter(u => u.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">UI Components Assignment</h1>
        <p className="text-sm text-gray-500">React • TypeScript • Tailwind • Storybook</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">InputField</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="Search user" placeholder="Type a name" value={q} onChange={(e)=>setQ(e.target.value)} helperText="Try typing: aarav" />
          <InputField label="Email" placeholder="you@example.com" invalid errorMessage="Required" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">DataTable</h2>
        <DataTable<User>
          data={filtered}
          columns={[
            { key: "name", title: "Name", dataIndex: "name", sortable: true },
            { key: "email", title: "Email", dataIndex: "email" },
            { key: "age", title: "Age", dataIndex: "age", sortable: true },
          ]}
          selectable
          onRowSelect={(rows) => console.log("Selected rows:", rows)}
        />
      </section>
    </div>
  );
}
