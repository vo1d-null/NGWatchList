var express = require('express');
var Movie = require('../models/movie');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.find()
    .then((movies) => {      
      const currentMovies = movies.filter(movie => !movie.read);
      const completedMovies = movies.filter(movie => movie.read === true);

      console.log(`Total movies: ${movies.length}   Movies to watch: ${currentMovies.length}    Watched Movies:  ${completedMovies.length}`)
      res.render('index', { currentMovies: currentMovies, completedMovies: completedMovies });
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


router.post('/addMovie', function(req, res, next) {
  const movieName = req.body.movieName;
  const director = req.body.director;
  
  var movie = new Movie({
    movieName: movieName,
    director: director
  });
  console.log(`Adding a new movie ${movieName} - Director ${director}`)

  movie.save()
      .then(() => { 
        console.log(`Added new movie ${movieName} - Director ${director}`)        
        res.redirect('/'); })
      .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
      });
});

router.post('/watchMovie', function(req, res, next) {
  console.log("I am in the PUT method")
  const movieId = req.body._id;
  const readDate = Date.now();

  Movie.findByIdAndUpdate(movieId, { read: true, readDate: readDate})
    .then(() => { 
      console.log(`Watch movie ${movieId}`)
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


router.post('/deleteMovie', function(req, res, next) {
  const movieId = req.body._id;
  const readDate = Date.now();
  Movie.findByIdAndDelete(movieId)
    .then(() => { 
      console.log(`Deleted movie $(movieId)`)      
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


module.exports = router;