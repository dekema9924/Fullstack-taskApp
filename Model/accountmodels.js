const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('accountdb', AccountSchema )