import { useState } from "react";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function handleSubmit(e) {
    e.preventDefault();
    const amt = Number(amount);
    if (!category) return alert("Select a category");
    if (!date) return alert("Select a date");
    if (!Number.isFinite(amt) || amt <= 0) return alert("Amount must be > 0");

    const newExpense = {
      id: crypto.randomUUID(),
      category,
      amount: amt,
      date,
    };

    setExpenses((prev) => [newExpense, ...prev]);

    setCategory("Food");
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
  }

  return (
    <div className="p-8">
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          type="number"
          placeholder="enter amount"
        />
        <input
          value={date}
          onChange={(event) => setDate(event.target.value)}
          type="date"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.category}</span>
            <span>{expense.amount}</span>
            <span>{expense.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
