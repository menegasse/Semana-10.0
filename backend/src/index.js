const express = require('express'); //importa a biblioteca express para o projeto (npm install express)
const mongoose = require('mongoose'); //importa o mongo DB para o projeto (npm install mongoose)
const cors = require('cors'); //importa uma biblioteca que ajuda a conectar o React com o Nodejs (npm install cors)
const routes = require('./routes'); //importa o arquivo com as rotas do sistema 
const http = require('http'); // biblioteca que cria os metodos que executam os metodo GET,POST, DELETE, PUCH
const {setupWebsocket} = require('./websocket');

const app = express();// monitora as alterações no projeto e atualiza no servidor
const server = http.Server(app);

setupWebsocket(server);

//realiza a coneção com o banco de dados mongo DB criado no site: https://www.mongodb.com/cloud/atlas
mongoose.connect('mongodb+srv://omnistack:plokijuh@cluster0-egexn.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); // configura o express para utilizar estrutura JSON
app.use(routes); // confgiura as rotas para ser usada pela aplicação

server.listen(3333);