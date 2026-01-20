import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  // ✅ Fetch expenses from backend
  const fetchExpenses = async () => {
    const res = await axios.get(`${API_URL}/expenses`);
    setExpenses(res.data);
  };

  // ✅ Run fetch once when page loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ Auto-calculate total whenever expenses changes
  useEffect(() => {
    const sum = expenses.reduce((acc, exp) => acc + Number(exp.amount), 0);
    setTotal(sum);
  }, [expenses]);

  // ✅ Form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ When click Edit -> fill form with that record
  const handleEdit = (exp) => {
    setEditId(exp.id);
    setForm({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
    });
  };

  // ✅ Add or Update expense
  const addExpense = async () => {
  if (!form.title || !form.category || !form.date) {
  alert("Fill all fields!");
  return;
  }

  const amountValue = Number(form.amount);

  if (isNaN(amountValue) || amountValue <= 0) {
  alert("Amount must be greater than 0");
  return;
  }


    const payload = {
    title: form.title,
    amount: amountValue,
    category: form.category,
    date: form.date,
    };


    if (editId) {
      // ✅ update expense
      await axios.put(`${API_URL}/expenses/${editId}`, payload);
      setEditId(null);
    } else {
      // ✅ add expense
      await axios.post(`${API_URL}/expenses`, payload);
    }

    setForm({ title: "", amount: "", category: "", date: "" });
    fetchExpenses();
  };

  // ✅ Delete expense
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

        <button onClick={addExpense}>
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </div>

      <h2>All Expenses</h2>

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
                <button onClick={() => handleEdit(exp)}>Edit</button>
                <button
                  onClick={() => deleteExpense(exp.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px", textAlign: "right" }}>
        Total Expense: ₹{total}
      </h3>
    </div>
  );
}

export default App;
