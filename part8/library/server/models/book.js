const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genres: [{ type: String }],
  published: { type: Number },
  title: { type: String, required: true, minlength: 4, unique: true }
})
schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)
