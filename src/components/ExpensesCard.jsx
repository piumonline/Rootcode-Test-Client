import React from "react";
import "./ExpensesCard.scss";

function ExpensesCard(props) {
  const { title, date, description, category, amount } = props.data;

  return (
    <div className="ExpensesCard">
      {/* Expense details */}
      <div className="card-item spent">
        <div className="apentat">{title}</div>
        <div className="date">{date.toString().split("T")[0]}</div>
      </div>
      <div className="card-item desc">{description}</div>
      <div className="card-item category">{category}</div>
      <div className="card-item amount">{amount} LKR</div>

      {/* Buttons */}
      <div className="buttons">
        {/* Edit button */}
        <button>
          Edit
        </button>
      </div>
    </div>
  );
}

export default ExpensesCard;
