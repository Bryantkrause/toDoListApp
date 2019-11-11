const express = require('express')
const path = require('path')
const mysql = require('mysql2')

const app = express()
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todo_db'
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true }))


// item routes

// GET all items
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (e, items) => {
        if (e) {
            console.log(e)
        }
        res.json(items)
    })
})

// POST one item
app.post('/items', (req, res) =>{
    console.log(req.body)
    db.query(`INSERT INTO items (text, isDone) VALUES '${req.body.text}', ${req.body.isDone}`
    res.send('POST one item')
})

// PUT one item
app.put('/items/:id', (req, res) => {
    res.send('PUT one item')
})

// DELETE one item
app.delete('/items/:id', (req, res) => {
    res.send('DELETE one item')
})

app.listen(3000, () => {
    console.log('this is an amazing discovery')
})