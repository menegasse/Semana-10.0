const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringsAsArray');
const {findConnections, sendMessage} = require('../websocket');
/*
 controler possui 5 tipos de nomes:

    index: quando se quer retorna uma lista;

    show: quando se quer mostrar um unico registro;

    store: quando for criar um registro;
    
    update: quando for atualizar um registro;

    destroy: quando for excluir o registro;

 */

module.exports =  { 

    async index(request,response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async update (request,response){

        const {github_username, techs, latitude, longitude} = request.query

        const techArray = ParseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude,latitude],
        };

        const dev = await Dev.updateOne({github_username},{techs:techArray,location});

        dev.nModified;

        return response.json(dev);

    },

    async destroy (request,response){
        const {github_username} = request.query;

        let dev = await Dev.deleteOne({github_username});

        dev.deletedCount;

        return response.json(dev);
    },

    async store(request,response) {
        const {github_username, techs, latitude, longitude} = request.body //busca a informação github_username dentro do request

        let dev = await Dev.findOne({github_username});

        if(!dev){
            //awai indica que tudo que vir depois dele sera esperado terminar sua execução
            const apiReponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const {name = login, avatar_url, bio} = apiReponse.data; // se o valor de name não existir ele pega por padrão o do login

            const techArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude,latitude],
            };

            //shotsyntax é quando passa uma propriedade para uma função com mesmo nome de uma variavel
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray, //não foi usado shortsyntax
                location
            });

            const sendSocketMessageTo = findConnections(
                {latitude,longitude},
                techsArray,
            );

            sendMessage(sendSocketMessageTo, 'new-dev',dev);

        }
        return response.json(dev);
    }

}