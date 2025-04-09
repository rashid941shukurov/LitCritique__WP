function filterBooks() {
    const searchInput = document.getElementById('searchInput')
    const filterText = searchInput.value.toLowerCase()
    const allBooks = document.querySelectorAll('.store-elements')

    allBooks.forEach(book => {
        const titleElement = book.querySelector('.book-name')
        const titleText = titleElement.textContent.toLowerCase()
        if (titleText.includes(filterText)) {
            book.style.display = 'block'
        } else {
            book.style.display = 'none'
        }
    })
}

document.getElementById('searchInput').addEventListener('input', filterBooks)
