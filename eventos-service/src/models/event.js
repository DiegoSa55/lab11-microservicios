
const mongoose = require('mongoose');

// Esquema para almacenar eventos históricos
const eventSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },

    action: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);
