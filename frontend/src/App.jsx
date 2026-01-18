import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";


function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(null);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  

  const calculateTotal = () => {
  const sum = expenses.reduce((acc, exp) => acc + Number(exp.amount), 0);
  setTotal(sum);
};

  const fetchExpenses = async () => {
    const res = await axios.get(`${API_URL}/expenses`);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async () => {
    if (!form.title || !form.amount || !form.category || !form.date) {
      alert("Fill all fields!");
      return;
    }

    await axios.post(`${API_URL}/expenses`, {
      title: form.title,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
    });

    setForm({ title: "", amount: "", category: "", date: "" });
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API_URL}/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="form">
        <input
          name="title"
          placeholder="Expense Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="amount"
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />

        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>All Expenses</h2>
      <button onClick={calculateTotal}>TOTAL</button>
      </div>


      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.title}</td>
              <td>{exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>
                <button onClick={() => deleteExpense(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {total !== null && (
  <h3 style={{ marginTop: "20px", textAlign: "right" }}>
    Total Expense: ₹{total}
  </h3>
)}

    </div>
  );
}

export default App;
