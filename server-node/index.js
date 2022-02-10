require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

let whitelist = ['http://localhost:8100'];
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));  

// ---- USERS
app.use("/user", userRoutes);
app.use("/user", userRoutes);
app.use("/user", userRoutes);

// ---- TASK
app.use("/task", taskRoutes);
app.use("/task", taskRoutes);
app.use("/task", taskRoutes);
app.use("/task", taskRoutes);
app.use("/task", taskRoutes);

app.listen(port, () => {
    console.log("Server running at port: " + port);
})