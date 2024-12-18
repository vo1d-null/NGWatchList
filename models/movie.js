const mongoose = require('mongoose');

constmovieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    trim: true,
  },
  director: String,
  readDate: Date,
  read: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);