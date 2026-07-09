const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    courseId: String,
    progress: Number
});

module.exports = mongoose.model("Progress", progressSchema);