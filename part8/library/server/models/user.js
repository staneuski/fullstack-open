const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = mongoose.Schema({
  username: { type: String, minLength: 3, required: true, unique: true },
  // passwordHash: String,
  favoriteGenre: { type: String }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)
