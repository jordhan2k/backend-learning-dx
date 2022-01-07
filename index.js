require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');

const app = express();
app.use(express.json());

app.use(cookieParser("jordanbackend"));

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.lvaty.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connect to DB");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", todoRouter);

app.get("/setCookie", (req, res) => {
    res.cookie("editableToken", "acdkfghor456sf");
    res.cookie("secureToken", "acdkfghor456sjldjf", { signed: true });
    res.json({
        success: true
    });
});

app.get("/getCookie", (req, res) => {
    console.log("unsigned cookies: ", req.cookies);
    console.log("signed cookies: ", req.signedCookies);

    res.json({
        success: true,
        cookies: req.cookies
    });
})

app.listen(PORT, () => {
    console.log(`Starting server at PORT: ${PORT}`);
});