import { useState, useEffect } from "react";
import "./App.css";

function ExpenseCard({ title, amount }) {
  return (
    <div className="expense-card">
      <h3>{title}</h3>
      <p>₹{amount}</p>
    </div>
  );
}

function ExpenseForm({ addExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || amount === "") {
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name,
      amount: Number(amount),
      category: category
    };

    addExpense(newExpense);

    setName("");
    setAmount("");
    setCategory("Food");
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Expense name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      <button type="submit">
        Add Expense
      </button>

    </form>
  );
}

function ExpenseItem({ expense, deleteExpense }) {
  return (
    <div className="expense-item">

      <div>
        <h3>{expense.name}</h3>
        <p>{expense.category}</p>
      </div>

      <div>
        <strong>₹{expense.amount}</strong>

        <button
          className="delete-btn"
          onClick={() => deleteExpense(expense.id)}
        >
          Delete
        </button>
      </div>

    </div>
  );
}

function App() {

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function addExpense(expense) {
    setExpenses([...expenses, expense]);
  }

  function deleteExpense(id) {
    setExpenses(
      expenses.filter((expense) => expense.id !== id)
    );
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const foodTotal = expenses
    .filter((expense) => expense.category === "Food")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const travelTotal = expenses
    .filter((expense) => expense.category === "Travel")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const educationTotal = expenses
    .filter((expense) => expense.category === "Education")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const entertainmentTotal = expenses
    .filter((expense) => expense.category === "Entertainment")
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="container">

      <h1>Personal Expense Visualization Board</h1>

      <ExpenseForm addExpense={addExpense} />

      <div className="summary">

        <ExpenseCard
          title="Total"
          amount={total}
        />

        <ExpenseCard
          title="Food"
          amount={foodTotal}
        />

        <ExpenseCard
          title="Travel"
          amount={travelTotal}
        />

        <ExpenseCard
          title="Education"
          amount={educationTotal}
        />

        <ExpenseCard
          title="Entertainment"
          amount={entertainmentTotal}
        />

      </div>

      <h2>Expense List</h2>

      <div className="expense-list">

        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              deleteExpense={deleteExpense}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default App;