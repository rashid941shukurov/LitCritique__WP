function readBtnListener() {
    const readBtn = document.querySelectorAll('.reviewActionBtn.read')

    readBtn.forEach(button => {
        button.addEventListener('click', () => {
            const storeElement = button.closest('.store-elements')
            const reviewBook = storeElement.querySelector('.review__book')
            const bookId = reviewBook.dataset.id
            localStorage.setItem('bookId', bookId)
            window.location.href = '/readReviewPage'
        })
    })
}


window.addEventListener('DOMContentLoaded', async () => {

    if (window.location.pathname !== '/readReviewPage') return

    const bookId = localStorage.getItem('bookId')
    bookReviewData.style.display = 'none'
    try {
        const res = await fetch(`${global_url}${bookId}`)
        const lcData = await res.json()
        if (!res.ok) throw new Error('Book not found')

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

async function readBook() {
    const bookId = localStorage.getItem('bookId')  
    const res = await fetch(`${global_url}${bookId}`)

    const payload = await res.json();

    if (res.ok) {
        window.location.href = '/'
    } else {
        console.error('Server error:', payload.error)
        alert(payload.error)
    }
}


