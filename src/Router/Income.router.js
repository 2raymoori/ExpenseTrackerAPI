const { Route } = require("express");
const express = require("express");
const {
  addIncome,
  deleteIncome,
  modifyIncome,
  allIncome,
  getIncome,
} = require("../Controller/Income.controller");
const authenticate = require("../MiddleWare/Authenticate.auth");
const Router = express.Router();

Router.post("/add", authenticate, addIncome);
Router.delete("/delete/:id", authenticate, deleteIncome);
Router.put("/edit/:id", authenticate, modifyIncome);
Router.get("/all", authenticate, allIncome);
Router.get("/:id", authenticate, getIncome);
module.exports = Router;
