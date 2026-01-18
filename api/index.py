from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary (no DB) storage
expenses = []

@app.get("/expenses")
def get_expenses():
    return expenses

@app.post("/expenses")
def add_expense(expense: dict):
    expense["id"] = len(expenses) + 1
    expenses.append(expense)
    return expense

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int):
    global expenses
    expenses = [e for e in expenses if e["id"] != expense_id]
    return {"message": "Deleted"}
