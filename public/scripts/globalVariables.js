const reviewImg = document.getElementById('bookImg')
const reviewGenre = document.getElementById('book__authorGenre')
const reviewAuth = document.getElementById('book__authorName')
const reviewTitle = document.getElementById('book__titleName')
const bookReviewData = document.getElementById('book-data')
const reviewText = document.getElementById('reviewMessage')
let reviewId

const searchBook = document.getElementById('search-resultEl')
let bookHtml 
const searchResult = document.getElementById('search-resultEl')

const BASE_URL = 'http://localhost:4200/api/books'
