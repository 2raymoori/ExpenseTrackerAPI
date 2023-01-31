const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config/systemDb');
const CategoryRouter = require('./src/Router/ExpenseCategory.router');
const ExpenseRouter = require("./src/Router/Expense.router");
const IncomeCategoryRouter = require("./src/Router/IncomeCategory.router");
const IncomeRouter = require("./src/Router/Income.router");
const userRouter = require('./src/Router/User.router')
const authRouter = require('./src/Router/Auth.Route')
const PORT = process.env.PORT || 3001;

const app = express();
connectDB();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors());
// API ENDPOINTS / ROUTES
app.use("/api/expensecategory",CategoryRouter);
app.use("/api/expense",ExpenseRouter);
app.use("/api/incomecategory",IncomeCategoryRouter);
app.use("/api/income",IncomeRouter);
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.listen(PORT,()=>{
    console.log("Server Started on port ")
});
