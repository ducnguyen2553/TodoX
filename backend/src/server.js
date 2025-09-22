const express = require("express");
const taskRoute = require("./routes/tasksRouters.js");
const connectDB = require("./config/db.js");
require("dotenv").config();
const cors = require("cors");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", taskRoute);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
});




// ducnguyen2553_db_user
// aQGtkaaE7yvmSryE