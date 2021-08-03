// // precisamos dos cards
// //evento de click nos cards
// //se algum for clicado abrir o modalOverlay

// let cards = document.querySelectorAll('.card');

// for (let card of cards) {
//     card.addEventListener('click', e => {
//         const videoId = card.getAttribute('id');
//         // Direcionando para outra URL, com o window.location.href
//         window.location.href = `/courses/${videoId}`;
//     })
// }

const currentURL = location.pathname;
console.log(currentURL);

const links = document.querySelectorAll('header a');

for(item of links) {//Com elemento HTML usamos OF
    //Se na currentURl tiver /instructors add a class active
    //ok temos /instructors/2 pode? PODE tem incluido
    //o /instructors
    if(currentURL.includes(item.getAttribute("href"))) {
        item.classList.add('active');
    }
}







