import { useState } from "react";

export default function App() {
  const [expenses, setExpenses] = useState([
    {
      id: "1",
      category: "Food",
      amount: 1200,
      date: "2026-02-28",
    },
    {
      id: "2",
      category: "Travel",
      amount: 2000,
      date: "2026-02-25",
    },
  ]);
  return (
    <div className="p-8">
      <h1>Expense Tracker</h1>
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
