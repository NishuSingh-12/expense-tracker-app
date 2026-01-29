import { useEffect, useState } from "react";

const getTodayDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Health", "Other"];

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ADD FORM STATES
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getTodayDate());

  // FILTER STATE
  const [filterCategory, setFilterCategory] = useState("All");

  // DERIVED LIST (filtered result)
  const visibleExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory);

  const total = visibleExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = visibleExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  function handleSubmit(e) {
    e.preventDefault();

    const amt = Number(amount);
    const id = crypto?.randomUUID?.() ?? String(Date.now());

    if (!category) return alert("Select a category");
    if (!date) return alert("Select a date");
    if (!Number.isFinite(amt) || amt <= 0) return alert("Amount must be > 0");

    const newExpense = {
      id,
      category,
      amount: amt,
      date,
    };

    setExpenses((prev) => [newExpense, ...prev]);

    // reset form
    setCategory("Food");
    setAmount("");
    setDate(getTodayDate());
  }

  function removeExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>

      {/* ADD EXPENSE FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 border rounded-lg mb-4"
      >
        <div className="flex gap-3">
          <select
            className="border rounded px-3 py-2 w-1/2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            className="border rounded px-3 py-2 w-1/2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex gap-3">
          <input
            className="border rounded px-3 py-2 w-1/2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />

          <button
            type="submit"
            className="w-1/2 bg-black text-white rounded px-3 py-2"
          >
            Add
          </button>
        </div>
      </form>

      {/* FILTER */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold">Filter</p>
        <select
          className="border rounded px-3 py-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="border rounded p-3 mb-4">
        <p className="font-semibold">Summary</p>
        <p>Total: ₹{total}</p>

        <ul className="mt-2">
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <li key={cat} className="flex justify-between">
              <span>{cat}</span>
              <span>₹{amt}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* LIST */}
      <ul className="space-y-2">
        {visibleExpenses.length === 0 ? (
          <li className="text-gray-500">No expenses yet.</li>
        ) : (
          visibleExpenses.map((expense) => (
            <li
              key={expense.id}
              className="border rounded px-3 py-2 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="font-semibold">{expense.category}</span>
                <span className="text-sm text-gray-600">{expense.date}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">₹{expense.amount}</span>
                <button
                  onClick={() => removeExpense(expense.id)}
                  className="border rounded px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
