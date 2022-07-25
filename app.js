require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(cookieParser());

app.set("view engine", "ejs");

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", error => console.log(error.message));

db.once("connected", connected => console.log("Successfully connected to database!"));

const homeRoute = require("./routes/home");
const projectRoute = require("./routes/project");
const addProjectRoute = require("./routes/addProject");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const deleteRoute = require("./routes/delete");

app.use("/", homeRoute);
app.use(projectRoute);
app.use(addProjectRoute);
app.use(loginRoute);
app.use(signupRoute);
app.use("/project/delete", deleteRoute);

app.get('/set-cookies', (req, res) => {
    res.cookie('newUser', false);
    res.cookie('isRegistered', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});

    console.log('cookies');
});

app.get('/read-cookies', (req, res) => {
    const cokkies = req.cookies;
    console.log(cookies);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});