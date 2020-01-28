const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], //cria um array de strigs
    location:{
        type: PointSchema,
        //quando se trabalha com geolocalização usa-se um index para localizar mais facil a informação
        index: '2dsphere' // 2dsphere é o index usado para latitudo e longitude 
    }
});

module.exports = mongoose.model('Dev',DevSchema);