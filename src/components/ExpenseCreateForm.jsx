import React, { useEffect, useState } from "react";
import "./ExpenseCreateForm.scss";
import axios from "axios";
import { API_URL } from '../api/path';

function ExpenseCreateForm(props) {
  // Initialize form data with default values or props
  const [formData, setFormData] = useState({
    title: "",
    description:  "",
    date: props.activeExpense?.date || "",
    category: "",
    amount: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value, // Updates the specific field using its name attribute
  });
};

  // Create a new expense
  const createNewExpense = async () => {
    try {
      const response = await axios.post(`${API_URL}`, formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    props.close();
  };

  // Update an existing expense
  

  // Delete an expense with confirmation
  

  return (
    <div className="Modal">

        <div className="expenseCreateForm-container">
          <div>
            Create Expense
          </div>
          {/* title input */}
          <div className="expenseCreateForm-title">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            {/* category input selector */}
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="Household">Household</option>
              <option value="Social Life">Social Life</option>
              <option value="Health">Health</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Transportation">Transportation</option>
            </select>
          </div>

          {/* description input */}
          <div className="expenseCreateForm-description">
            <textarea
              name="description"
              cols="20"
              rows="10"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* date and amount input */}
          <div className="expenseCreateForm-date">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            {/* amount input */}
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div>
            {/* cancel and submit btn */}
            <button className="cancel-btn" onClick={props.close}>
              Cancel
            </button>
            <button
              className="submit-btn"
              onClick={createNewExpense}
            >
              Submit
            </button>
          </div>
        </div>
      
    </div>
  );
}

export default ExpenseCreateForm;
