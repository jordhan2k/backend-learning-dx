require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Create an instance of express
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;

const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');

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

app.listen(PORT, () => {
    console.log(`Starting server at PORT: ${PORT}`);
});