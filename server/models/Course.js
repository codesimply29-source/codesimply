const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        default: "General"
    },

    level: {
        type: String,
        default: "Beginner"
    },

    language: {
        type: String,
        default: "العربية"
    },

    duration: {
        type: String,
        default: ""
    },

    lessonsCount: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        default: ""
    },

    introVideo: {
        type: String,
        default: ""
    },

    lessons: [{
        title: String,
        video: String
    }],

    files: [{
        name: String,
        path: String
    }],

    price: {
        type: Number,
        required: true
    },

    students: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Course", courseSchema);