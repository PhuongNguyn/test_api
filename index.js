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

app.get('/travel', (req, res) => {
    return res.status(200).json(travel)
})

app.get('/travel/location', (req, res) => {
    const locations = []
    travel.map(item => {
        if(!locations.find(x => x == item.location)){
            locations.push(item.location)
        }
    })

    return res.status(200).json(locations)
})

app.listen(3001, () => {
    console.log("app is listen on http://localhost:" + 3001)
})
