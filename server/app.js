const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())

app.use(express.json())

app.use("/",(req,res)=>{
    res.status(200).json({
        message:"server working"
    })
})

app.listen(5000,()=>{
    console.log("server started");
})

