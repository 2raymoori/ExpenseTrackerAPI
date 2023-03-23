// const { ObjectId } = require('mongoose');
const { ObjectId } = require("mongodb").ObjectId;
const ExpenseModel = require("../Model/Expense.model");

const addExpense = async (req, res) => {
  try {
    const { name, amount, expenseDate, expenseCategory, description } =
      req.body;
    const newExpense = new ExpenseModel();
    if (amount > 0) {
      newExpense.amount = -amount;
    } else {
      return res.status(201).send({
        status: "error",
        data: "The Amount for Expense cannot be or less than 0.",
      });
    }
    newExpense.expenseCategory = expenseCategory;
    if (expenseDate) {
      newExpense.expenseDate = expenseDate;
    }
    if (description) {
      newExpense.description = description;
    }
    newExpense.name = name;
    newExpense.user = req.user.id;
    await newExpense.save();
    res.status(200).send({ status: "Success", data: newExpense });
  } catch (error) {
    res.status(500).send({ status: "Error", data: error.message });
  }
};
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const curUser = req.user.id;
    const { name, amount, expenseDate, description, expenseCategory } =
      req.body;
    const expenseToUpdate = await ExpenseModel.findByIdAndUpdate({
      _id: id,
      user: curUser,
    });
    if (expenseToUpdate) {
      if (name) {
        expenseToUpdate.name = name;
      }
      if (amount) {
        if (amount > 0) {
          expenseToUpdate.amount = -amount;
        } else {
          return res.status(201).send({
            status: "error",
            data: "The Amount for Expense cannot be or less than 0.",
          });
        }
      }
      if (expenseCategory) {
        expenseToUpdate.expenseCategory = expenseCategory;
      }
      if (expenseDate) {
        expenseToUpdate.expenseDate = expenseDate;
      }
      if (description) {
        expenseToUpdate.description = description;
      }
      console.log(expenseToUpdate);
      await expenseToUpdate.save();
      return res.status(200).send({ status: "success", data: expenseToUpdate });
    } else {
      return res.status(201).send({
        status: "error",
        data: "Sorry There is no such Expense with this id.",
      });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(201).send({
        status: "error",
        data: "Sorry There is no such Expense with this id.",
      });
    }
    return res.status(500).send({ status: "error", data: error.message });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const curUser = req.user.id;
    const expenseToUpdate = await ExpenseModel.findByIdAndDelete({
      _id: id,
      user: curUser,
    });
    if (expenseToUpdate) {
      await expenseToUpdate.delete();
      res.status(200).send({ status: "success", data: expenseToUpdate });
    } else {
      res.status(201).send({
        status: "error",
        data: "Sorry There is no such Expense with this id.",
      });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(201).send({
        status: "error",
        data: "Sorry There is no such Expense with this id.",
      });
    }
    res.status(500).send({ status: "error", data: error.message });
  }
};
const allExpense = async (req, res) => {
  try {
    const curUser = req.user.id;
    const allExpense = await ExpenseModel.find({
      user: curUser,
    })
      .populate("expenseCategory", ["name"])
      .populate("user", ["email", "fName"]);
    res.status(200).send({ status: "Success", data: allExpense });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};
const expenseByid = async (req, res) => {
  try {
    const { id } = req.params;
    const curUser = req.user.id;
    const currentExpense = await ExpenseModel.find({
      _id: id,
      user: curUser,
    })
      .populate("expenseCategory", ["name"])
      .populate("user", ["email", "fName"]);
    if (currentExpense) {
      return res.status(200).send({ status: "Success", data: currentExpense });
    } else {
      return res.status(201).send({
        status: "error",
        data: "Sorry There is no such Expense with this id.",
      });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(201).send({
        status: "error",
        data: "Sorry There is no such Expense with this id.",
      });
    }
    res.status(500).send({ status: "error", data: error.message });
  }
};
module.exports = {
  addExpense,
  updateExpense,
  deleteExpense,
  allExpense,
  expenseByid,
};
