const express = require("express")
const authRoutes = require("./routes/authRoutes")
const cors = require("cors")
const connectDB = require("./database/db")
const app = express()

app.use(cors())

app.use(express.json())

connectDB();



app.use("/auth", authRoutes)

app.use("/", (req, res) => {
    res.status(200).json({
        message: "server working"
    })
})

app.listen(5000, () => {
    console.log("server started");
})

