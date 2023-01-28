const express = require('express');
const { addExpense, updateExpense, deleteExpense, allExpense, expenseByid } = require('../Controller/Expense.controller');
const Router = express.Router();
const authenticate  = require('../MiddleWare/Authenticate.auth')

Router.post("/add",authenticate,addExpense);
Router.put("/update/:id",authenticate,updateExpense);
Router.delete("/delete/:id",authenticate,deleteExpense);
Router.get("/all",authenticate,allExpense);
Router.get("/:id",authenticate,expenseByid);

module.exports = Router;