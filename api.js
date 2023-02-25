//Memasukkan Depedencies dari packages
const express = require('express')
const bodyParser = require('body-parser')

//Inisialisasi client dan app
const client = require('./connection')
const app = express()

//menerapkan body parser pada app
app.use(bodyParser.json())

//bergabung dengan port 3100
app.listen(3100, () => {
    console.log('server running in port 3100')
})

//mengecek koneksi dengan client
client.connect(err =>{
    if(err){
        console.log(err.message)
    } else {
        console.log('connected')
    }
})

//contoh sederhana api get method 
app.get('/sensor', (req,res) => {
    client.query((`select * from sensor`), (err,result) =>{
        if(!err){
            res.send(result.rows)
        } else{
            res.send(err.message)
        }
    })
})

//contoh sederhana api post method
app.post('/sensor', (req,res)=>{
    const {kode, nama, harga, stok} = req.body

    client.query((`insert into sensor(kode, nama, harga, stok) values('${kode}', '${nama}', ${harga}, ${stok})`),(err, result) =>{
        if(!err){
            res.send('insert success')
        } else {
            res.send(err.message)
        }
    })
})

//contoh sederhana api put method
app.put('/sensor/:id', (req,res) =>{
    const {nama, harga, stok} = req.body

    client.query((`update sensor set nama = '${nama}', harga = ${harga}, stok = ${stok} where kode = '${req.params.id}'`),(err, result) =>{
        if(!err){
            res.send('update success')
        } else {
            res.send(err.message)
        }
    })
})

//contoh sederhana api delete method
app.delete('/sensor/:id', (req,res) =>{
    client.query(`delete from sensor where kode = '${req.params.id}'`,(err, result) =>{
        if(!err){
            res.send('delete success')
        } else {
            res.send(err.message)
        }
    })
})