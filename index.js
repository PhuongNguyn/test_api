const express = require('express')
const app = express()
const router = express.Router()
const {furniture} = require('./furniture')
const {flowers} = require('./flowers')
const {travel} = require('./travel')
const cors = require('cors')

app.use(cors({
    origin: '*'
}))


app.get('/furniture', (req, res) => {
    return res.status(200).json(furniture)
})


app.get('/flower', (req, res) => {
    return res.status(200).json(flowers)
})

app.get('/travel/location', (req, res) => {
    const locations = []
    travel.forEach(item => {
        if(!locations.find(x => x == item.location)){
            locations.push({
                location: item.location,
                slug: item.slug
            })
        }
    })

    return res.status(200).json(locations)
})

app.get('/travel', (req, res) => {
    const price = req.query?.price || null
    const location = req.query.location || null
    console.log(location)
    let result = []

    if(price){
        result = [...result, ...travel.filter(item => Number(item.price) <= Number(price))]
    }

    if(location){
        result = [...result, ...travel.filter(item => item.slug == location)]
    }

    if(!price && !location){
        result =  travel
    }

    return res.status(200).json(result)
})


app.listen(3001, () => {
    console.log("app is listen on http://localhost:" + 3001)
})
