const { Router} = require('express'); // a chaves {} importa um modulo especifico da biblioteca

const DevController = require('./controller/DevController');
const SearchController = require('./controller/SearchController');

const routes = Router();


/*
  Existem varios metodos para rota (métodos HTTP):

        get() para buscar uma informação na aplicação

        post() para criar uma nova informação

        put() para atualizar uma informação

        delete() excluir uma informação
 */

 /*
  Tipo de parâmetros de request:

    Query Params (metodos get): request.query (Filtro,ordenação, paginação, ... )
    Route Params (metodos put e delete): request.params (indentificar um recurso na alteração ou remoção)
    Body (metods post e put): request.body (Dados para criação ou alteração de um registro)
  */

/*o metodo get tem por padrão dois parametros request(requisição) e response(resposta)
routes.get('/',(request, response) => {
    console.log(request.query);
    return response.json({message: 'Hello Omnistack!'});
});

routes.delete('/user/:id',(request,response) => {
    console.log(request.params);
    return response.json({message: 'Usuário Deletado'});
});

routes.post('/user/:id',(request,response) => {
    console.log(request.body)    
    return response.json({message: 'Usuário Encontrado'});
});
*/

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/devs',DevController.destroy);
routes.put('/devs',DevController.update);

routes.get('/search', SearchController.index);

module.exports = routes;