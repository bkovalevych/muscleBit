const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DataSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    data: Schema.Types.Mixed,
    tags: [String],
    name: String,
    mode: String,
    description: String
});

module.exports = Data = mongoose.model('data', DataSchema);
