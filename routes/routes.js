const express = require('express')
const router = express.Router()
const Books = require('../models/books')

router.get('/', (req, res) => {
    res.render('homePage')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/newReviewPage', (req, res) => {
    res.render('newReviewPage')
})
router.get('/updateReviewPage', async (req, res) => {
    res.render('updateReviewPage')
})
router.get('/readReviewPage', async (req, res) => {
    res.render('readReviewPage')
})


router.post('/api/books', async (req, res) => {
    try {
        const book = new Books(req.body)
        const saved = await book.save()
        res.status(201).json(saved)
    } catch (err) {
        console.error('some mongoose error', err)
        res.status(400).json({ error: err.message })
    }
})

router.put('/api/books/:bookId', async (req, res) => {
    try {
        const updated = await Books.findOneAndUpdate({ bookId: req.params.bookId }, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})
  
router.get('/api/books/:bookId', async (req, res) => {
    try {
        const book = await Books.findOne({ bookId: req.params.bookId })
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.get('/api/books', async (req, res) => {
    try {
        const books = await Books.find()
        res.json(books)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.delete('/api/books/:bookId', async (req, res) => {
    try {
        await Books.findOneAndDelete({ bookId: req.params.bookId })
        res.json({ message: 'User deleted' })
    } catch (err) {
            res.status(400).json({ error: err.message })
    }
})
const { makeTextFormal } = require('../services/gemini-start')

router.post('/makeFormal', async (req, res) => {
    const { text } = req.body

    try {
        const formalText = await makeTextFormal(text)
        res.json({ formalText })
    } catch (err) {
        console.error('Gemini Error:', err)
        res.status(500).json({ error: 'Error in req to Gemini' })
    }
})

const { searchBooks } = require('../services/googleBook-search')

router.get('/api/foundBook', async (req, res) => {
    const bookName = req.query.q
    const data = await searchBooks(bookName) 
    res.json(data)
})

  

module.exports = router