require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uploadRouter = require("./routes/uploads.route");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api",uploadRouter);


app.get("/",(req,res)=>{
    res.send(`<h1>Welcome to Notebook-LM</h1>
        <form action="/api/pdf" method="post" enctype="multipart/form-data">
        <input type="file" name="file" />
        <input type="text" name="name" />
        <button type="submit">Upload</button>   
        </form>
        `)
    })


// Health check;
app.get("/test",(req,res)=>{
    res.status(200).json({
        message:"Server is up and running"
    })
})


app.listen(6060, () => console.log("Server started on port 6060"));