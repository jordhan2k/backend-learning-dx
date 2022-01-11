require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');
const cookierouter = require('./routes/cookie');
const fileRouter = require('./routes/file');
const timeRouter = require('./routes/time');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser("jordanbackend"));
app.use(express.static("resources"));

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
app.use("/api/v1/cookie", cookierouter);
app.use("/api/v1/files", fileRouter);
app.use("/api/v1/time", timeRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Starting server at PORT: ${PORT}`);
});

console.log(" Piano_man - Mamamoo.mp3 ".trim().split(" ").join("_"));
