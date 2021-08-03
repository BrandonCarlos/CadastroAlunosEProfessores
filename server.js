const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();

server.use(express.urlencoded({ extends: true }));
server.use(express.static('public'));//vou usar arquivos CSS que estão dentro do PUBLIC, não precisa por o caminho completo
server.use(methodOverride('_method'));//Agora o que tiver PUT será PUT o mesmo para o DELETE
server.use(routes);//As routes sempre devem estar embaixo
server.set('view engine', 'njk')//Motor de visualização irá ser HTML por enquanto

nunjucks.configure('views', {
    express: server,
    autoescape: false,/* Para remover código HTML das váriaveis */
    noCache: true,
})

// Conferindo acima se tem as rotas, senão tiver mostre este erro para qualquer rota diferente das acima
// server.use(function (req, res) {
//     return res.status(404).render('not-found');
// })

server.listen(5000, function () {
    return console.log('Hello World');
})