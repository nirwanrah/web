//usung express and EJS
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const fs = require('fs')
var datum = fs.readFileSync('web.json', 'utf8')
var data = JSON.parse(datum)

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', express.static(path.join(__dirname, 'public')))

//parse application/x-www-form-urlencoded => extract form
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json =>extract json
app.use(bodyParser.json())

//page home
app.get('/', (req, res) => res.render('home', { data, title:"Bread System" }))
//pagination
app.get('/page', (req, res) => res.render('page', {title:"Belum jadi"}))

//add
app.get('/add', (req, res) => res.render('add', {title:"Add Form"}))
app.post('/add', (req, res) => {
    data.push(req.body)
    fs.writeFileSync('web.json', JSON.stringify(data, null, 3), 'utf8')
    res.redirect('/')
})

//delete
app.get('/delete/:id', (req, res) => {
    data.splice(req.params.id, 1)
    fs.writeFileSync('web.json', JSON.stringify(data, null, 3), 'utf8')
    res.redirect('/')
})

//edit 
app.get('/edit/:id', (req, res) => {
    let editNth = data[req.params.id]
    let id =parseInt(req.params.id)
    res.render('edit', { editNth, id, title:"Edit Form"})
})
app.post('/edit/:id', (req, res) => {
    data.splice(req.params.id, 1, req.body)
    fs.writeFileSync('web.json', JSON.stringify(data, null, 3), 'utf8')
    res.redirect('/')
})

app.listen(2000, () => {
    console.log('Web ini berjalan di port 2000')
})