const { Route } = require('express');
const express = require('express');
const { addIncome, deleteIncome, modifyIncome, allIncome, getIncome } = require('../Controller/Income.controller');
const Router = express.Router();

Router.post("/add",addIncome);
Router.delete("/delete/:id",deleteIncome);
Router.put("/edit/:id",modifyIncome);
Router.get("/all",allIncome);
Router.get("/:id",getIncome);
module.exports = Router;