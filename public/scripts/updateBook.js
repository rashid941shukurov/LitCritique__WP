function addEditBtnListeners() {
    const editButtons = document.querySelectorAll('.reviewActionBtn.edit')

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const storeElement = button.closest('.store-elements')
            const reviewBook = storeElement.querySelector('.review__book')
            const bookId = reviewBook.dataset.id
            localStorage.setItem('bookId', bookId)
            window.location.href = '/updateReviewPage'
        })
    })
}


window.addEventListener('DOMContentLoaded', async () => {

    if (window.location.pathname !== '/updateReviewPage') return

    const bookId = localStorage.getItem('bookId');
    try {
        const res = await fetch(`/api/books/${bookId}`)
        const lcData = await res.json()
        if (!res.ok) throw new Error('Book not found')

        console.log('Fetched book data:', lcData)

        reviewId = bookId
        reviewImg.src = lcData.bookCover || '/img/default.webp'
        reviewTitle.textContent = lcData.bookTitle || 'No Title'
        reviewAuth.textContent = lcData.bookAuthor || 'Unknown Author'
        reviewGenre.textContent = lcData.bookGenre || 'Unknown Genre'
        reviewText.value = lcData.reviewText || ''
        bookReviewData.style.display = 'flex'

    } catch (err) {
        console.error('Error fetching book:', err)
    }
})

async function updateBook() {
    const bookId = localStorage.getItem('bookId')  

    const thisReviewText = reviewText.value.trim()
    const res = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            bookId: bookId, 
            bookTitle: reviewTitle.textContent,
            bookAuthor: reviewAuth.textContent,
            bookGenre: reviewGenre.textContent,
            bookCover: reviewImg.src,
            reviewText: thisReviewText
        })
    })

    const payload = await res.json();

    if (res.ok) {
        window.location.href = '/'
    } else {
        console.error('Server error:', payload.error)
        alert(payload.error)
    }
}