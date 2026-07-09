const mongoose = require("mongoose");

const paymentRequestSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true
    },

    courseName: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    redirect: {
        type: String,
        required: true
    },

    screenshot: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "Approved"],
        default: "pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("PaymentRequest", paymentRequestSchema);