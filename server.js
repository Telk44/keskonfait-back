const express = require('express')
const app = express()
const port = 3000

//database
const db = require('./config/database')

db.authenticate()
    .then(() => console.log('database connected'))
    .catch(err => console.log('Error: ' + err))



app.get('/', (req, res) => {
    res.send('Hello World!')
})

//user routes

app.use('/user', require('./routes/user'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})