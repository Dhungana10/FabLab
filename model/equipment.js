const Mongoose = require('mongoose');


const equipmentSchema = new Mongoose.Schema({
    equipmentName:{
        type: String,
        required: false,
    },
    image: {
        type:String,
        required: false,
    },
    type:{
        type: String,
        required: false,
    },
    description: {
        type: String,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    }
}) 

module.exports = Mongoose.model('equipment', equipmentSchema);

