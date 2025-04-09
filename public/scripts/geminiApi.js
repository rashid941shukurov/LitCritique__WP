document.addEventListener('DOMContentLoaded', () => {
    
    formalBtn.addEventListener('click', async () => {
        const userText = reviewText.value.trim()
        if (!formalBtn || !reviewText) return;

        try {
            const res = await fetch('/makeFormal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: userText }),
            })

            const data = await res.json()
            if (data.formalText) {
                reviewText.value = data.formalText
            } else {
                alert("Sorry we couldn't transform the text")
            }
        } catch (err) {
            console.error('Caught some erro in connection with Gemini:', err)
        }
    })
})
