const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config() 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function makeTextFormal(text) {
    if (!genAI) throw new Error('Gemini is not initialized')

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = `This is human made review on the book. Try to make it more formal and extended. So the review became more extended and could convey the whole essence of the review. Here is the text: \n\n${text}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
}

module.exports = { makeTextFormal, genAI }
