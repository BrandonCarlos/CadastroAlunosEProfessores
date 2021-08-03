const fs = require('fs');
const data = require('../data.json');
// Iremos importar FUNÇÕES aqui dentro
const { age, graduation, date, grade} = require('../utils');

exports.index = function(req, res) {

    const study = data.students.find((student) => {
        return student.id > 0;//Ou seja todos que tiverem id > 0 entram no ARRAY
    })

    const studyng = {
        ...study,
        school: grade(study.school),

    }

    return res.render('students/index', { students: data.students, studyng });
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

    let { avatar_url, name, email, school, charge, birth } = req.body;

    birth = Date.parse(birth);//quando cadastramos vem STRING então vamos converter para NUMBER = ex: 2342356475623435 = 01/01/2019
    let id = Number(data.students.length + 1);//length pois vai que tem 5 elementos lá dentro, e +1 para o próximo elemento que entrar seja 6
    //quero saber a hora em que o usuário se cadastrou
    let created_at = Date.now();//Date.now() irá nós trazer o horário em que o usuário se cadastrou

    // Agora com os dados já criados e alguns dados modificados podemos adicionar no ARRAY tudo até mesmo os dados criados
    data.students.push({//Vamos adicionar dentro do ARRAY, OBJETOS por enquanto Javascript, abaixo vamos adicionar no
        //arquivo JSON, só que antes de adicionar vamos converter abaixo o OBJETO JAVASCRIPT em OBJETO JSON
        id,
        avatar_url,
        name,
        email,
        school,
        charge,
        birth,
        created_at
    })

    //Estamos adicionando todos os valores de vez no ARRAY
    //em vez de adicionar tudo de uma vez, vamos DESESTRUTURAR esse OBJETO, e modificar
    //alguma CHAVE ou criar alguma chave, podemos modificar a chave BIRTH em milisegundos
    //exemplo BIRTH = Date.parse(birth), Date com D maiusculo pois é um CONSTRUCTOR 
    // Hora de cadastrar devemos adicionar ID
    

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {//convertendo tudo para OBJETO JSON e adicionar no arquivo
        if (err) return res.send('Não foi possivel escrever o arquivo.');

        return res.redirect('/students');//depois que adicionar no arquivo JSON irá redirecionar para '/students'
    })


},

exports.show = function (req, res) {
    const { id } = req.params;

    // Vamos buscar com a função do ARRAY chamada FIND
    const foundStudent = data.students.find(student => {
        return student.id == id;//Se achar o professor que tem o mesmo id do REQ.PARAMS retorna ele
    })

    if(!foundStudent) return res.send('student not found!');

    // Agora temos todos os dados dentro do searchStudent
    const student = {
        ...foundStudent,//Espalhamento dos dados para podemos usar abaixo e modificarmos para apresentar no FRONT-END
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundStudent.created_at),//formatando a data para PT-BR
        //com o constructor Intl, que transforma em data universais como: pt-BR, USA etc...
        birth: date(foundStudent.birth).birthDay,//no caso estou editando esse dado BIRTH
        // school: grade(student.school)
        school: grade(foundStudent.school)
    }

    // graduation(foundStudent.education); //Aqui usei somente para ver o valor no CONSOLE.LOG()

    // age(foundStudent.birth);//Para poder exibir o console.log() devemos entrar na rota SHOW
    //localhost:3000/students/3, ai o console.log() é ativado

    return res.render('students/show', { student });
},

exports.edit = function (req, res) {
    const { id } = req.params;//pegando o id da URL
    //Já temos o ID da rota, agora precisamos saber qual elemento do nosso ARRAY tem esse ID da rota
    //e como tudo é váriavel, estrutura de decisão, looops, arrays, vamos guardar o cara com ID dentro da váriavel
    const student = data.students.find(student => {
        return student.id == id;//a rota armazena o ID em formato de STRING e no array em formato de number, portanto só fazemos ==
    })

    if (!student) return res.send("student not found!");

    
    let students = {
        ...student,
        birth: date(student.birth).iso,
    }

    return res.render('students/edit', {students});

},

exports.update = function(req, res) {
    const { id } = req.body;
    let index = 0;
    const foundStudent = data.students.find((student, foundIndex) => {
        if ( id == student.id) {//somente id do ESTUDANTE
            index = foundIndex//foundIndex = todos os dados do ESTUDANTE
            return true;//retornando que achou o studant com o id do req.body
        }
    })

    if(!foundStudent) return res.send("Student not found!");

    const student = {
        ...foundStudent,
        ...req.body,
        birth: date(foundStudent.birth).iso,
        id: Number(req.body.id),
    }

    data.students[index] = student;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) throw `${err} not possible write file`;

        return res.redirect(`/students/${foundStudent.id}`);
    })

},
exports.delete = function(req, res) {
    const { id } = req.body;

    const studentsFiltered = data.students.filter(function(student) {
        return student.id != id;
    })

    data.students = studentsFiltered;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) throw `${err} Write file error!`;

        return res.redirect('/students');
    })
}