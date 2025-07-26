require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


// Health check;
app.get("/test",(req,res)=>{
    res.status(200).json({
        message:"Server is up and running"
    })
})


app.listen(6060, () => console.log("Server started on port 6060"));