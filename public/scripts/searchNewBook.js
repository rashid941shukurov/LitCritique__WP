async function fetchData() {
    try{
        searchBook.innerHTML = '' // clearing all books previously searched

        bookHtml = ''
        const bookName = document.getElementById('search-book').value.toLowerCase().trim()
        
        const res = await fetch(`/api/foundBook?q=${encodeURIComponent(bookName)}`)
        
        const data = await res.json()

        if (!res.ok) {
            throw new Error("couldn't fetch resource")
        }


        console.log(data.items)

        data.items.forEach(book => {
            const bookVol = book.volumeInfo
            const bookId = book.id
            const bookTitle = bookVol.title
            const bookCover = bookVol.imageLinks ? bookVol.imageLinks.thumbnail : "placeholder.jpg"
            const bookAuth = bookVol.authors ? bookVol.authors.join(', ') : ''
            const bookGenre = bookVol.categories ? bookVol.categories.join(', ') : ''

            bookHtml += `
            <li class="resultEl"
                data-id="${bookId}"
                data-title="${bookTitle}"
                data-author="${bookAuth}"
                data-genre="${bookGenre}"
                data-cover="${bookCover}">
                <img src="${bookCover}" alt="${bookTitle}" class="resultImg">
                <p class="resultName">${bookTitle}</p>
            </li>
            `
        })
        searchResult.style.display = 'flex'
        searchResult.innerHTML = bookHtml
        

        inputInReview()
    }
    catch(error) {
        console.log(error)
    }
}


function inputInReview() {
    const bookReview = document.querySelectorAll('#search-resultEl .resultEl')

    bookReview.forEach(el => {
        el.addEventListener('click', ()=> {
            
            reviewImg.src = el.dataset.cover
            reviewImg.alt = el.dataset.title

            reviewGenre.textContent = el.dataset.genre

            reviewAuth.textContent = el.dataset.author

            reviewTitle.textContent = el.dataset.title

            reviewId = el.dataset.id
            bookReviewData.style.display = "flex"
        })
    })
}


async function createBookReview() {
    const thisReviewText = reviewText.value.trim()
    let checkRes
    if (!reviewId) {
        console.error("Review ID is undefined, cannot create review.");
        return;
    }
    checkRes = await fetch(`/api/books/${reviewId}`)
    if (checkRes.ok) {
        alert('This book has already reviewed. Please choose another book')
        return;
    }


    const res = await fetch(`/api/books/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            bookId: reviewId, 
            bookTitle: reviewTitle.textContent,
            bookAuthor: reviewAuth.textContent,
            bookGenre: reviewGenre.textContent,
            bookCover: reviewImg.src,
            reviewText: thisReviewText
        })
    })

    const payload = await res.json()

    if (res.ok) {
        window.location.href = '/'
    } else {
        console.error('Server error:', payload.error)
        alert(payload.error)
    }
}
const searchInput = document.getElementById('search-book')
const searchClearBtn = document.getElementById('search-clear')


window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/newReviewPage') {
        searchInput.addEventListener('input', fetchData)
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = ''
        
            searchResult.innerHTML = ''
            searchResult.style.display = 'none'
        })        
    }
})



