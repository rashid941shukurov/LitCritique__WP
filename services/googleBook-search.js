require('dotenv').config()

const apikey = process.env.GOOGLE_BOOKS_API

async function searchBooks(bookName) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}&key=${apikey}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Google Books API error:', error.message)
        throw new Error('Some error in req to Google Book API')
    }
}

module.exports = { searchBooks }
