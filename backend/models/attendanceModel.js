const mongoose = require('mongoose');
const attendSchema = mongoose.Schema({
    staffid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date, 
        required: true,
    },
    time: {
        type: Date, 
        required: true,
    },
}, { timestamps: true });

const attends = mongoose.model("attends",attendSchema);

module.exports = attends;