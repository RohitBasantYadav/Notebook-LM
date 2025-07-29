const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cloudinary = require('cloudinary').v2;


// path.join(__dirname, "uploads/");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads", { recursive: true });
        }
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() + 10 * Math.random())
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.pdf')
    }

})

const filefilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (file.mimetype === "application/pdf" && ext === ".pdf") {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF files are allowed"), false);
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter })

// Controller
const uploadPdf = async (req, res) => {

    try {
        const localFilePath = req.file.path;
        // console.log(path.join(__dirname+req.file.path));

        // Upload PDF to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            // resource_type: "raw",
            folder:"notebooklm-pdfs",
            use_filename: true,
            unique_filename: false
            // type: "upload",
            // public_id: req.file.originalname.split('.')[0]
        });
        console.log(req.file.originalname);

        //delete local file after upload
        fs.unlinkSync(localFilePath);
        console.log(result.url)
        res.status(200).json({
            message: "PDF uploaded to Cloudinary",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Upload failed", error: err.message });
    }
}

module.exports = { uploadPdf, upload }