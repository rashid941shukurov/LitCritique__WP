
function deleteBtnListener() {
    const deleteBtns = document.querySelectorAll('.reviewActionBtn.delete')

    deleteBtns.forEach(button => {
        button.addEventListener('click', async () => {
            const storeElement = button.closest('.store-elements') 
            const reviewBook = storeElement.querySelector('.review__book')
            const bookId = reviewBook.dataset.id

            try {
                
                const res = await fetch(`/api/books/${bookId}`, {
                    method: 'DELETE'
                })

                if (!res.ok) throw new Error('thrown an error in deletion')
                storeElement.remove()
            } catch (err) {
                console.error('Error in deletion:', err)
            }
        })
    })
}