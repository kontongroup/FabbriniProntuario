const mongoose = require('mongoose');

const ProntSchema = new mongoose.Schema({
  selectedDate: String,
  selectsex: String,
  dados: String,
});
module.exports = mongoose.model('Prontuario', ProntSchema);
