var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views')
app.set('view engine', 'jade')
app.listen(port)

console.log('express start on port '+port)

app.get('/', function(req, res){
	res.render('index', {title: 'index here'})
})
app.get('/movie/:id', function(req, res){
	res.render('detail', {title: 'dtail here'})
})
app.get('/amdin/movie', function(req, res){
	res.render('admin', {title: 'admin here'})
})
app.get('/admin/list', function(req, res){
	res.render('list', {title: 'list here'})
})
