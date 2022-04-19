const express = require('express');
const { addExpense, updateExpense, deleteExpense, allExpense, expenseByid } = require('../Controller/Expense.controller');
const Router = express.Router();

Router.post("/add",addExpense);
Router.put("/update/:id",updateExpense);
Router.delete("/delete/:id",deleteExpense);
Router.get("/all",allExpense);
Router.get("/:id",expenseByid);

module.exports = Router;