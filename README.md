
# Expense Tracker (Full Stack)

A simple full-stack Expense Tracker application where users can **add, view, delete expenses** and store data in **PostgreSQL**.

---

## ✅ Project Idea
This project helps users manage daily expenses by allowing them to:
- Add a new expense (title, amount, category, date)
- View all saved expenses
- Delete any expense
- View total expense using a **TOTAL** button

---

## ✅ Tech Stack
### Frontend
- React (Vite)
- Axios
- Basic CSS

### Backend
- FastAPI
- SQLAlchemy
- Uvicorn

### Database
- PostgreSQL

---

## ✅ Features
- Add Expense
- View Expense Records
- Delete Expense
- Total Expense Calculation (TOTAL Button)
- PostgreSQL database integration
- Clean UI (basic styling)

---

## 📁 Project Structure
```

expense-tracker/
│── backend/
│   │── main.py
│   │── database.py
│   │── models.py
│   │── schemas.py
│   │── venv/ (ignored in git)
│
│── frontend/
│   │── src/
│   │   │── App.jsx
│   │   │── App.css
│   │── package.json
│   │── vite.config.js
│
│── README.md
│── .gitignore

````

---

## ⚙️ Setup Instructions

### ✅ 1) Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker
````

---

## ✅ Backend Setup (FastAPI + PostgreSQL)

### 1) Go to backend folder

```bash
cd backend
```

### 2) Create & activate virtual environment

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3) Install dependencies

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic
```

### 4) Configure PostgreSQL

Create a database named:

```
expense_db
```

Update `DATABASE_URL` in `backend/database.py`:

```py
DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@localhost:5432/expense_db"
```

### 5) Run backend server

```bash
uvicorn main:app --reload
```

Backend will run on:

```
http://127.0.0.1:8000
```

API Docs:

```
http://127.0.0.1:8000/docs
```

---

## ✅ Frontend Setup (React + Vite)

### 1) Go to frontend folder

```bash
cd ../frontend
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run frontend

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## ✅ How to Use the App

1. Open the frontend in browser
2. Fill the form and click **Add Expense**
3. Expense will appear in the table
4. Click **Delete** to remove any expense
5. Click **TOTAL** button to display the total expense amount

---

## ✅ Database Check (PostgreSQL)

To view all expenses in database:

```sql
SELECT * FROM expenses;
```

---

## 👨‍💻 Author

Developed by: **Sachin Kotian**


