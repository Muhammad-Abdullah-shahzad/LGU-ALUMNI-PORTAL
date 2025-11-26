const express = require("express")
const authRoutes = require("./routes/authRoutes")
const dashboardRoutes = require("./routes/dashboard")
const postRoutes = require("./routes/postRoutes")
const notificationRoutes = require("./routes/notificationRoute")
const userRoutes = require("./routes/userRoutes")
const surveyRoutes = require("./routes/surveyRoutes")



require('dotenv').config(); // Load .env variables

const cors = require("cors")
const connectDB = require("./database/db")
const app = express()
app.use(cors())
app.use(express.json())
connectDB();



app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/post", postRoutes);
app.use("/notification", notificationRoutes);
app.use("/user", userRoutes);
app.use("/survey", surveyRoutes);





app.listen(5000, () => {
    console.log("server started");
})

