const express = require('express')
const bodyParser = require('body-parser')

const client = require('./connection')
const app = express()

app.use(bodyParser.json())

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

app.get('/sensor', (req,res) => {
    client.query(`select * from sensor`, (err,result) =>{
        if(!err){
            res.send(result.rows)
        }
    })
})

app.post('/sensor', (req,res) =>{
    const {kode, nama, harga, stok} = req.body

    client.query(`insert into sensor(kode, nama, harga, stok) VALUES ('${kode}', '${nama}', ${harga}, ${stok})`,(err, result) =>{
        if(!err){
            console.log('insert success')
        } else {
            console.log(err.message)
        }
    })
})

app.put('/sensor/:id', (req,res) =>{
    const {nama, harga, stok} = req.body

    client.query(`update sensor set nama = '${nama}', harga = ${harga}, stok = ${stok} where id = ${req.params.id}`,(err, result) =>{
        if(!err){
            console.log('update success')
        } else {
            console.log(err.message)
        }
    })
})

app.delete('/sensor/:id', (req,res) =>{
    client.query(`delete from sensor where id = ${req.params.id}`,(err, result) =>{
        if(!err){
            console.log('delete success')
        } else {
            console.log(err.message)
        }
    })
})