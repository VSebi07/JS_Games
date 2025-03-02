const menuBtn = document.getElementById('menu_fogomb');
const linkek = document.querySelectorAll('#menu a');
const egeszMenu = document.getElementById('menu');
const mfgSzel = menuBtn.getBoundingClientRect().width;
egeszMenu.style.width = `${mfgSzel + 6*window.innerHeight/100}px`;

var szel_csukva = 0;
var szel_nyitva = 0;

function Meretek(){
    szel_csukva = `${mfgSzel + 6*window.innerHeight/100}px`;
    szel_nyitva = `${100 + 12*window.innerHeight/100 + 4*9*window.innerWidth/100}px`;
}

Meretek();

var menuSzelessegCsukva = egeszMenu.getBoundingClientRect().width;


menuBtn.addEventListener('mouseenter', function(){ 
    linkek.forEach(link => link.style.opacity = '1');
    egeszMenu.style.width = szel_nyitva;
})

menu.addEventListener('mouseleave', function(){
    
    window.setTimeout(() => {
        linkek.forEach(link => link.style.opacity = '0');
        egeszMenu.style.width = szel_csukva;
    },2000)
    
})