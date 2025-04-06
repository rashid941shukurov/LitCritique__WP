async function fetchData() {
    try{
        const bookName = document.getElementById('search-book').value.toLowerCase().trim()

        const searchBook = document.getElementById('search-resultEl')

        searchBook.innerHTML = '' // clearing all books previously searched

        let bookHtml = ''

        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=AIzaSyB0p2j_R9FiaQF__3qrT3FUmLC8ZwsfFsA`)
        
        const data = await res.json()

        if (!res.ok) {
            throw new Error("couldn't fetch resource")
        }
        const searchResult = document.getElementById('search-resultEl')


        console.log(data.items)

        data.items.forEach(book => {
            const bookVol = book.volumeInfo
            const bookTitle = bookVol.title
            const bookCover = bookVol.imageLinks ? bookVol.imageLinks.thumbnail : "placeholder.jpg"

            bookHtml += `
            <li class="resultEl">
                <img src="${bookCover}" alt="${bookTitle}" class="resultImg">
                <p class="resultName">${bookTitle}</p>
            </li>
            `
            searchResult.style.display = 'flex'
            searchResult.innerHTML = bookHtml

        })
    }
    catch(error) {
        console.error(error)
    }
}