const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type:{
        type:String,
        enum: ['Point'],
        required: true,//significa queo campo type é obrigatório 
    },
    coordinates:{
        type: [Number],
        required: true,
    }
});

module.exports = PointSchema;