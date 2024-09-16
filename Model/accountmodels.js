const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    username: String,
    Email: String,
    password: String,
})

module.exports = mongoose.model('accountdb', AccountSchema )