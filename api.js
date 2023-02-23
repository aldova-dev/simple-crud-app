const express = require('express')
const bodyParser = require('body-parser')

const client = require('./connection')
const app = express()

app.listen(3100, () => {
    console.log('server running in port 3100')
})

client.connect(err =>{
    if(err){
        console.log(err.message)
    } else {
        console.log('connected')
    }
})



