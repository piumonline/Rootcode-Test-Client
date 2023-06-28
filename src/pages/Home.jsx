import React, { useEffect, useState } from "react";
import "./Home.scss";
import ExpensesCard from "../components/ExpensesCard";
import axios from "axios";
import ExpenseCreateForm from "../components/ExpenseCreateForm";
import { API_URL } from "../api/path";

function Home() {
  const [isExpenseFormOpen, setExpenseFormOpen] = useState(false); // State to track if the ExpenseCreateForm is open or closed
  const [expenseFormType, setExpenseFormType] = useState(1); // State to track the type of ExpenseCreateForm window
  const [expenses, setExpenses] = useState([]); // State to store the list of expenses
  const [category, setCategory] = useState(""); // State to store the selected category
  const [activeExpense, setActiveExpense] = useState(undefined); // State to store the active expense (selected expense)

  useEffect(() => {
    getData(); // Fetch initial data when the component mounts
  }, []);

  //get all expenses
  const getData = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setExpenses(response.data); // Update expenses state with the fetched data
    } catch (error) {
      console.log(error);
    }
  };

  //filter expenses by category
  const filterCategory = async (selectedCategory) => {
    try {
      const response = await axios.get(`${API_URL}/${selectedCategory}`);
      setExpenses(response.data); // Update expenses state with the filtered data
    } catch (error) {
      console.log(error);
    }
  };

  //window state handler
  const handleModalOpen = (isOpen) => {
    setExpenseFormOpen(isOpen); // Open or close the ExpenseCreateForm
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="header">

          {/* category selector */}
          <select
            name="category"
            value={category}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              setCategory(selectedCategory); // Update the selected category
              filterCategory(selectedCategory); // Filter expenses based on the selected category
            }}
          >
            <option disabled hidden>Select a Category</option>
            <option value="Food">Food</option>
            <option value="Household">Household</option>
            <option value="Social Life">Social Life</option>
            <option value="Health">Health</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Transportation">Transportation</option>
          </select>

          {/* create new expense btn */}
          <button
            onClick={() => {
              setExpenseFormType(1); 
              handleModalOpen(true); // Open the ExpenseCreateForm with type 1 (create mode)
            }}
          >
            Create Expense
          </button>
        </div>

        <div className="expenses-container">
          {expenses.map((item) => (
            <ExpensesCard
              key={item.id}
              data={item}
            />
          ))}
        </div>
      </div>
      
      {isExpenseFormOpen && (
        <ExpenseCreateForm
          windowState={expenseFormType}
          close={() => {
            handleModalOpen(false); // Close the ExpenseCreateForm
            getData(); // Fetch updated data after closing the form
          }}
        />
      )}
    </div>
  );
}

export default Home;
