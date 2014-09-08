var express = require('express')
var print_r = require('print_r').print_r
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var path = require('path')
var _ = require('underscore')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

function log(o,title){
log('-------'+(title||'')+'--------')
console.log(o)
log('==========')
}

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('express start on port '+port)

app.get('/admin/movie',function(req,res){
console.log('addddddddddddmin/movie')
	res.render('admin',{
		title:'imooc 后台录入页面',
		movie:{
			doctor:'',
			country:'',
			title:'',
			year:'',
			poster:'',
			language:'',
			flash:'',
			summary:''
		}
	})
})




app.get('/',function(req,res){
  Movie.fetch(function(err, movies){//TODO: DRY2
    if(err){
      console.log(err)
    }

    res.render('index', { title: 'imooc Homepage', movies:movies })
  })

})

app.get('/movie/:id',function(req,res){
  var id=req.params.id
  Movie.findById(id, function(err, movie){
    if(err){ console.log(err) }
    res.render('detail', {title:'imooc '+movie.title, movie:movie});
  })
})

//admin update movie
app.get('/admin/update/:id', function(req, res){
  var id=req.params.id
  if(id){
    Movie.findById(id, function(err, movie){
      res.render('admin',{ title:'imooc adminUpdatePage', movie:movie})
    })
  }
})

app.get('/test/movie_save2', function(req,res){
  var o = new Movie({doctor:'kkkk'}) 
  o.save()
  res.render('debug')
})

app.get('/test/movie_save', function(req,res){
 var var1=print_r({k1:'k1v',k2:'k2v'})
 var o = Movie.findById({_id: mongoose.Types.ObjectId('540d77482c87e7b9485c925c')})
 log(o)
 log(o.emitted.err)
 res.render('debug', {var1:var1})
})

//admin post movie
app.post('/admin/movie/new', function(req,res){
//console.log('--------------req------------')
//console.log(req)
  var id = req.body.movie._id //<---why pass (string)'undefined' to me T-T
  var o = req.body.movie //<--notice; req.body & o is produced from <input name="movie[*]" which HAD posted
  log(o)
  var _movie

  if(id!=='undefined'){
    Movie.findById(id, function(err, movie){
      if(err){ console.log(err) }

      _movie = _.extend(movie, o) //<--notice: get old movie from DB, then assign newest value to it
      log(_movie)
      _movie.save(function(err, movie){//<--TODO:refactor to DRY
        if(err){ console.log(err) }
        res.redirect('/movie/' + movie._id)
      })
    })
  }else{
  /*  _movie = new Movie({//<--TODO: refactor to quick assignment
      doctor: o.doctor, title: o.title,
      country: o.country, language: o.language,
      year: o.year, poster: o.poster,
      summary: o.summary, flash: o.flash
    })
    log(_movie, '_movie')

      _movie.save(function(err, movie){//<--TODO:refactor to DRY
        log(movie, 'movie')
        if(err){ console.log(err) }
*/
        res.redirect('/movie/' + movie._id)
 //     })


  }
})

// admin post movie
app.post('/admin/movie/new',function(req,res){
	var id = req.body.movie._id
	var movieObj = req.body.movie

	var _movie

	if(id !=='undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}

			_movie = _.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
			    }

			    res.redirect('/movie/'+_movie.id)
			})

		})
	}else{
		_movie = new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash,
		})

		_movie.save(function(err,movie){
				if(err){
					console.log(err)
			    }

			    res.redirect('/movie/'+_movie.id)
			})
	}
})

app.get('/admin/list',function(req,res){
  Movie.fetch(function(err, movies){//TODO:DRY2
    if(err){
      console.log(err)
    }

    res.render('list', { title: 'imooc Homepage', movies:movies })
  })
})


app.delete('/admin/list',function(req,res){
  var id=req.query.id //<-- ?id=xxxxx
  if(id){ Movie.remove({_id:id}, function(err, movie){
    Movie.remove({_id:id}, function(err, movie){
      if(err){log(err)}
      else{
        res.json({success:1})
      }
    })
  })
  }
})
