const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    fileUrl: String, // S3 URL or local path
    pageCount: Number,
    chunks: [
        {
            content: String,
            pageNumber: Number,
            embedding: [Number], // to store vector later (optional)
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const PdfModel = mongoose.model('PDF', pdfSchema);

module.exports = PdfModel;
