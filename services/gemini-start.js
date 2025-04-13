const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config() 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function makeTextFormal(text) {
    if (!genAI) throw new Error('Gemini is not initialized')

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = `You are a professional writing assistant. Your task is to take informal or amateur book reviews and transform them into more formal, polished, and professional literary reviews, suitable for publication or presentation to a broad audience.
    Please maintain the original meaning, tone, and key opinions of the user, but enhance the vocabulary, sentence structure, and coherence. Avoid exaggeration or adding opinions not present in the original. The result should sound like it was written by a skilled literary critic. \n\n${text}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
}

module.exports = { makeTextFormal, genAI }
