from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Expense
from schemas import ExpenseCreate, ExpenseOut
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Expense Tracker API Running"}

# ✅ Add expense
@app.post("/expenses", response_model=ExpenseOut)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    new_expense = Expense(**expense.dict())
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense

# ✅ View expenses
@app.get("/expenses", response_model=list[ExpenseOut])
def get_expenses(db: Session = Depends(get_db)):
    return db.query(Expense).all()

# ✅ Delete expense
@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    exp = db.query(Expense).filter(Expense.id == expense_id).first()
    if not exp:
        return {"error": "Expense not found"}
    db.delete(exp)
    db.commit()
    return {"message": "Deleted successfully"}
