const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookId: String,
    bookTitle: String,
    bookAuthor: String,
    bookGenre: String,
    bookCover: String,  
    reviewText: String,   
})

const Books = mongoose.model('Book', bookSchema);
module.exports = Books;
