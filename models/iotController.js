const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IotControllerSchema = new Schema({
    registered: {type: Date, default: Date.now},
    name: String,
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    specification: String
});
module.exports = IotController = mongoose.model('iotController', IotControllerSchema);
