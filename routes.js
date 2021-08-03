const express = require('express');
const routes = express.Router();
const teachers = require('./controllers/teachers');
const students = require('./controllers/students');

routes.get('/', function(req, res) {
    return res.redirect('/teachers');
});

routes.get('/teachers', teachers.index);

routes.get('/teachers/create', function(req, res) {
    return res.render('teachers/create');
});
routes.get('/teachers', teachers.index);
routes.get('/teachers/:id', teachers.show);

routes.post('/teachers', teachers.post);

routes.get('/teachers/:id/edit', teachers.edit)//este manda para o edit pq é só para mostrar os dados
routes.put('/teachers', teachers.update);//este manda para o PUT pq é para ATUALIZA realmente os dados
routes.delete('/teachers', teachers.delete);


// Students
routes.get('/students', students.index);

routes.get('/students/create', function(req, res) {
    return res.render('students/create');
});
routes.get('/students', students.index);
routes.get('/students/:id', students.show);

routes.post('/students', students.post);

routes.get('/students/:id/edit', students.edit)//este manda para o edit pq é só para mostrar os dados
routes.put('/students', students.update);//este manda para o PUT pq é para ATUALIZA realmente os dados
routes.delete('/students', students.delete);

module.exports = routes;