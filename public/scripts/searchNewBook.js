async function fetchData() {
    try{
        searchBook.innerHTML = '' // clearing all books previously searched

        bookHtml = ''
        const bookName = document.getElementById('search-book').value.toLowerCase().trim()

        
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=AIzaSyB0p2j_R9FiaQF__3qrT3FUmLC8ZwsfFsA`)
        
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

    if (!reviewId) {
        console.error("Review ID is undefined, cannot create review.");
        return;
    }

    const res = await fetch(`${BASE_URL}/`, {
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
