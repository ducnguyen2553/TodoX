const express = require("express");
const taskRoute = require("./routes/tasksRouters.js");
const connectDB = require("./config/db.js");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", taskRoute);


const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
});




// ducnguyen2553_db_user
// aQGtkaaE7yvmSryE