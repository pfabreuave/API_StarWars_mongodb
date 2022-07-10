const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
        name: String,
        height: Number,
        mass: Number,
        hair_color: String,
        skin_color: String,
        eye_color: String,
        birth_year: String,
        gender: String,
        homeworld: String,
        avatar: String
    })

module.exports = Person