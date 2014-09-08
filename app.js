var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('express start on port '+port)

app.get('/', function(req, res){
	res.render('index', {title: 'index here'})
})
app.get('/movie/:id', function(req, res){
	res.render('detail', {title: 'dtail here'})
})
app.get('/admin/movie', function(req, res){
	res.render('admin', {title: 'admin here'})
})
app.get('/admin/list', function(req, res){
	res.render('list', {title: 'list here'})
})
