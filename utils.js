module.exports = {
    age(timestamp) {//timestamp = (foundTeacher.birth)
        //Obs: ano que nasci - ano atual = idade que tenho
        //verificar se fiz 21 ou ainda não

        let currentDate = new Date();
        let birthDate = new Date(timestamp);

        let age = currentDate.getFullYear() - birthDate.getFullYear();//2021 - 2000 = 21
        let month = currentDate.getMonth() - birthDate.getMonth();//1 positivo fiz aniversário já

        // Hora de conferir se fiz 21 anos ou ainda não
        if(month < 0 || month == 0 && currentDate.getDate() < birthDate.getDate()) {//Ainda não fiz aniversário
            age -= 1; //Ou seja ainda não fiz 21 anos
        }
        console.log('Cheguei aqui');
        return age;//já fiz 21 anos

    },
    graduation(education) {
        return (education == 'medio') ? "Ensino Médio completo" : 
        (education == 'superior') ? 'Ensino superior completo' : 
        (education == 'mestrado') ? 'Mestrado' :
        (education == 'doutorado') ? 'Doutorado' : 'Nenhum valor informado'        
    },
    date(timestamp) {//timestamp = birth data de aniversário
        const myBirth = new Date(timestamp);//18/06/2000
        let day = `0${myBirth.getUTCDate()}`.slice(-2);//quero somente os 2 últimos números
        let month = `0${myBirth.getUTCMonth() + 1}`.slice(-2);//janeiro inicia em 0, quero que inicie em 1
        let year = myBirth.getUTCFullYear();
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,//o HTML aceita somente assim = ano/mês/dia
            birthDay: `${day}/${month}`
        }
    },
    grade(school) {
        return school == '5' ? '5° Ano do ensino médio' : 
        school == '6' ? '6° Ano do ensino fundamental' : 
        school == '7' ? '7° Ano do ensino fundamental' : 
        school == '8' ? '8° Ano do ensino fundamental' : 
        school == '9' ? '9° Ano do ensino fundamental' : 
        school == '1' ? '1° Ano do ensino médio' : 
        school == '2' ? '2° Ano do ensino médio' : 
        school == '3' ? '3° Ano do ensino médio' : false
    }
}