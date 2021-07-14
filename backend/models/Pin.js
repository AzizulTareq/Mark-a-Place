const mongoose = require('mongoose')

const pinSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
        min: 3
    },
    desc: {
        type: String,
        require: true,
        min: 3
    },
    rating: {
        type: Number,
        require: true,
        min: 3,
        max: 5
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Pin", pinSchema)