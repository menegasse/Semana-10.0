const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringsAsArray');

module.exports = {
    async index(request,response){
        const {latitude,longitude, techs} = request.query;
        
        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                //$in é um operador lógico do mongo DB
                $in: techsArray, // retorna os devs que trabalham com a tecnologias do array
            },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },
                    $maxDistance: 10000, // 10 Kilometros
                },
            }
        });

        return response.json({ devs: devs});
    }
}