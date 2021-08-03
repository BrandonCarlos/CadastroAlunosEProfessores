const fs = require('fs');
const data = require('../data.json');
// Iremos importar FUNÇÕES aqui dentro
const { age, graduation, date} = require('../utils');

exports.index = function(req, res) {

    return res.render('teachers/index', { teachers: data.teachers });
},

exports.post = function (req, res) {
    //retorna CHAVES do objeto
    const keys = Object.keys(req.body);

    for (let key of keys) {
        if (req.body[key] === "") {
            return res.send('Preencha todos os campos por favor!');
        }
    }

    // Antes de adicionar tudo vamos DESESTRUTURAR esse OBJETO e pegar algumas chaves e adicionar
    //e algumas chaves vamos modificar antes de cadastrar no nosso arquivo JSON

    let { avatar_url, name, birth, education, classes, services } = req.body;

    birth = Date.parse(birth);//quando cadastramos vem STRING então vamos converter para NUMBER = ex: 2342356475623435 = 01/01/2019
    let id = Number(data.teachers.length + 1);//length pois vai que tem 5 elementos lá dentro, e +1 para o próximo elemento que entrar seja 6
    //quero saber a hora em que o usuário se cadastrou
    let created_at = Date.now();//Date.now() irá nós trazer o horário em que o usuário se cadastrou

    // Agora com os dados já criados e alguns dados modificados podemos adicionar no ARRAY tudo até mesmo os dados criados
    data.teachers.push({//Vamos adicionar dentro do ARRAY, OBJETOS por enquanto Javascript, abaixo vamos adicionar no
        //arquivo JSON, só que antes de adicionar vamos converter abaixo o OBJETO JAVASCRIPT em OBJETO JSON
        id,
        avatar_url,
        name,
        birth,
        education,
        classes,
        services,
        created_at
    })

    //Estamos adicionando todos os valores de vez no ARRAY
    //em vez de adicionar tudo de uma vez, vamos DESESTRUTURAR esse OBJETO, e modificar
    //alguma CHAVE ou criar alguma chave, podemos modificar a chave BIRTH em milisegundos
    //exemplo BIRTH = Date.parse(birth), Date com D maiusculo pois é um CONSTRUCTOR 
    // Hora de cadastrar devemos adicionar ID
    

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {//convertendo tudo para OBJETO JSON e adicionar no arquivo
        if (err) return res.send('Não foi possivel escrever o arquivo.');

        return res.redirect('/teachers');//depois que adicionar no arquivo JSON irá redirecionar para '/teachers'
    })


},

exports.show = function (req, res) {
    const { id } = req.params;

    // Vamos buscar com a função do ARRAY chamada FIND
    const foundTeacher = data.teachers.find(teacher => {
        return teacher.id == id;//Se achar o professor que tem o mesmo id do REQ.PARAMS retorna ele
    })

    if(!foundTeacher) return res.send('Teacher not found!');

    // Agora temos todos os dados dentro do searchTeacher
    const teacher = {
        ...foundTeacher,//Espalhamento dos dados para podemos usar abaixo e modificarmos para apresentar no FRONT-END
        age: age(foundTeacher.birth),//OBS: foundTeacher.birth é um ARGUMENTO de uma função AGE
        graduation: graduation(foundTeacher.education),
        services: foundTeacher.services.split(','),//funcionando perfeitamente
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),//formatando a data para PT-BR
        //com o constructor Intl, que transforma em data universais como: pt-BR, USA etc...
    }

    // graduation(foundTeacher.education); //Aqui usei somente para ver o valor no CONSOLE.LOG()

    // age(foundTeacher.birth);//Para poder exibir o console.log() devemos entrar na rota SHOW
    //localhost:3000/teachers/3, ai o console.log() é ativado

    return res.render('teachers/show', { teacher });
},

exports.edit = function (req, res) {
    const { id } = req.params;//pegando o id da URL
    //Já temos o ID da rota, agora precisamos saber qual elemento do nosso ARRAY tem esse ID da rota
    //e como tudo é váriavel, estrutura de decisão, looops, arrays, vamos guardar o cara com ID dentro da váriavel
    const teacher = data.teachers.find(teacher => {
        return teacher.id == id;//a rota armazena o ID em formato de STRING e no array em formato de number, portanto só fazemos ==
    })

    if (!teacher) return res.send("Teacher not found!");

    
    let teachers = {
        ...teacher,
        birth: date(teacher.birth).iso,//no caso estou editando esse dado BIRTH

    }

    return res.render('teachers/edit', {teachers});

},

exports.update = function(req, res) {
    const { id } = req.body;
    let index = 0;
    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if ( id == teacher.id) {//somente id do ESTUDANTE
            index = foundIndex//foundIndex = todos os dados do ESTUDANTE
            return true;//retornando que achou o studant com o id do req.body
        }
    })

    if(!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: date(foundTeacher.birth).iso,
        id: Number(req.body.id),
    }

    data.teachers[index] = teacher;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) throw `${err} not possible write file`;

        return res.redirect(`/teachers/${foundTeacher.id}`);
    })
},
exports.delete = function(req, res) {
    const { id } = req.body;

    const teachersFiltered = data.teachers.filter(function(teacher) {
        return teacher.id != id;
    })

    data.teachers = teachersFiltered;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) throw `${err} Write file error!`;

        return res.redirect('/teachers');
    })
}