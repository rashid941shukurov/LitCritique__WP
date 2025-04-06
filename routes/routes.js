const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('homePage')
})

router.get('/about', (req,res)=>{
    res.render('about')
})
router.get('/contact', (req,res)=>{
    res.render('contact')
})
router.post('/newReviewPage', (req,res)=> {
    res.render('newReviewPage')
})

module.exports = router