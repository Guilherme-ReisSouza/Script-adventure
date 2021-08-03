
let rolagem = document.getElementById("Scrolllado");
let alturaPag = document.body.scrollHeight - window.innerHeight;

window.onscroll = function rolar(){

    let rolar = (window.pageYOffset / alturaPag) * 100;

    rolagem.style.height = rolar + "%";
}