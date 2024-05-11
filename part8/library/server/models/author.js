const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  born: { type: Number },
  name: { type: String, required: true, unique: true, minlength: 4 }
})
schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)
