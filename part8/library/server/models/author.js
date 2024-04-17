const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  born: { type: Number },
  name: { type: String, required: true, unique: true, minlength: 4 }
})

module.exports = mongoose.model('Author', schema)
