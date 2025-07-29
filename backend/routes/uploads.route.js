const express = require("express");
const { uploadPdf, upload } = require("../controllers/uploadPdf.controller");


const uploadRouter = express.Router();

// Routes
uploadRouter.post("/pdf",upload.single("file"),uploadPdf);


module.exports = uploadRouter;