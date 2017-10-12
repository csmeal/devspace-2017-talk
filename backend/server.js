const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'forum'
})

connection.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.post('/api/posts', (req, res) => {
    let queryString = 'insert into posts(title, url, submit_date) values (\''
        + req.body.title + '\', \'' + req.body.url + '\', Now())';
    console.log(queryString);
    connection.query(queryString, function (err, rows, fields) {
        if (err) res.json(err);
        res.json({});
    });
})

app.delete('/api/posts/:id', (req, res) => {
    connection.query('delete from posts where id=' + req.params.id, function (err, rows, fields) {
        if (err) res.json(err);
        res.json({});
    })
})

app.get('/api/posts', (req, res) => {
    connection.query('SELECT * from posts', function (err, rows, fields) {
        if (err) res.json(err);
        res.json(rows);
    })
})

app.get('/api/posts/:id', (req, res) => {
    let queryString = 'SELECT * from posts where id=' + req.params.id;
    console.log(queryString);
    connection.query(queryString, function (err, rows, fields) {
        if (err) {res.json(err);return;}
        if (rows.length === 0) res.json({});
        connection.query('select * from comments where post_id=' + req.params.id, function (commErr, commRows, commFields) {
            
            rows[0].comments = commRows;
            res.json(rows);
        })
    })
})


app.get('/api/posts/:id/comments/', (req, res) => {
    connection.query('SELECT * from comments where post_id=' + req.params.id, function (err, rows, fields) {
        if (err) res.json(err);
        res.json(rows);
    })
})

app.post('/api/posts/:id/comments/', (req, res) => {
    let queryString = 'insert into comments (text, post_id, date_submitted) values(\'' + 
        req.body.text + '\', ' + req.params.id + ', Now())';
        console.log(queryString);
    
    connection.query(queryString, function(err, rows, stuff){
        if (err) res.json(err);
        res.json({});
    })
})

app.listen(3000, function () {
    console.log('listening on 3000')
})
