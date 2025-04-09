// async function getAllBooks() {

//     const res = await fetch(`/api/books`)
//     const lcData = await res.json()
//     const reviewStore = document.getElementById('reviewStore')

//     const liCreate = document.querySelector('.store-postNew')
//     const oldReviews = reviewStore.querySelectorAll('.store-elements')
//     oldReviews.forEach(el => el.remove());

//     lcData.forEach(item => {
//         const li = document.createElement('li')
//         li.className = 'store-elements'
//         li.innerHTML = `
//             <div class="review__book" data-id="${item.bookId}">
//                 <img src="${item.bookCover || '/img/default.webp'}" alt="${item.bookTitle || 'Book'}" class="book-cover" draggable="false">
//                 <p class="book-author">${item.bookAuthor || 'Author not found'}</p>
//                 <h3 class="book-name">${item.bookTitle || 'No title found'}</h3>
//             </div>
//             <div class="review__actionButtons">
//                 <button class="reviewActionBtn read"><img src="img/read.webp" class="reviewAction" alt="read review"></button>
//                 <button class="reviewActionBtn edit"><img src="img/edit.webp" class="reviewAction" alt="edit review"></button>
//                 <button class="reviewActionBtn delete"><img src="img/delete.webp" class="reviewAction" alt="delete review"></button>
//             </div>
//         `
//         reviewStore.insertBefore(li, liCreate)
//     })
//     addEditBtnListeners()
//     readBtnListener()
//     deleteBtnListener()
// }

async function getAllBooks() {
    try {
        const res = await fetch("/api/books");
        const lcData = await res.json();

        if (!Array.isArray(lcData)) {
            console.error("Expected an array but got:", lcData);
            return; // Прерываем выполнение, если lcData не массив
        }

        const reviewStore = document.getElementById('reviewStore');
        const liCreate = document.querySelector('.store-postNew');
        const oldReviews = reviewStore.querySelectorAll('.store-elements');
        oldReviews.forEach(el => el.remove());

        lcData.forEach(item => {
            const li = document.createElement('li');
            li.className = 'store-elements';
            li.innerHTML = `
                <div class="review__book" data-id="${item.bookId}">
                    <img src="${item.bookCover || '/img/default.webp'}" alt="${item.bookTitle || 'Book'}" class="book-cover" draggable="false">
                    <p class="book-author">${item.bookAuthor || 'Author not found'}</p>
                    <h3 class="book-name">${item.bookTitle || 'No title found'}</h3>
                </div>
                <div class="review__actionButtons">
                    <button class="reviewActionBtn read"><img src="img/read.webp" class="reviewAction" alt="read review"></button>
                    <button class="reviewActionBtn edit"><img src="img/edit.webp" class="reviewAction" alt="edit review"></button>
                    <button class="reviewActionBtn delete"><img src="img/delete.webp" class="reviewAction" alt="delete review"></button>
                </div>
            `;
            reviewStore.insertBefore(li, liCreate);
        });
    } catch (err) {
        console.error("Error fetching books:", err);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/') {
        getAllBooks()
    }
})