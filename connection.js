const {Client} = require('pg')

const client = new Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "Inandita99",
    database : "daftar_komponen"
})

module.exports = client
