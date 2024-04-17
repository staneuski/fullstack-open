const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genres: [{ type: String }],
  published: { type: Number },
  title: { type: String, required: true, minlength: 4, unique: true }
})

module.exports = mongoose.model('Book', schema)
