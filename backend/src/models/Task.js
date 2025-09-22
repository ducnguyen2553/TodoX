const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "complete"],
        default: "active"
    },
    completedAt: {
        type: Date,
        default: null
    },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Task', taskSchema);