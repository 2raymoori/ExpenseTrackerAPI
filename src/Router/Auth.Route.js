const express = require('express');
const { Signup, login } = require('../Controller/Auth.Controller');
const Router = express.Router();

Router.post("/signup",Signup);
Router.post('/signin',login);

module.exports = Router;
