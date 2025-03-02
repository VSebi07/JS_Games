const landingInner = document.getElementById('landing_inner');
const landingKep = document.getElementById('landing_main');
var gorgetes = false;

function betoltesIdozites(){
    for (let i = 0; i < landingInner.childElementCount; i++){
        window.setTimeout(() => {   
            landingInner.children[i].style.opacity = '1';
        },500+((i+1)*600));
    } 
}

betoltesIdozites();

window.addEventListener('scroll', function(){
    if (window.scrollY >= document.getElementById('szekcio2').getBoundingClientRect().top + document.getElementById('szekcio2').getBoundingClientRect().height){
        landingKep.style.backgroundImage = 'url(fooldal/pics/pong.png)';
        landingInner.children[0].textContent = 'Coming soon...';
        landingInner.children[1].textContent = 'PONG';
        landingInner.children[2].innerHTML = 'Készülj fel csapatunk legújabb játékára, amely a retro stílusú pong! <br> Itt már nem logika, annál inkább gyors reflexek szükségesek a győzelemhez! <br> Multiplayer és gép elleni játék egyaránt elérhetővé válik nemsokára...'
        landingInner.children[3].children[0].children[0].textContent = 'Érdekel';
        landingInner.children[3].children[0].setAttribute('href', 'hangman/hangman.html');
        landingInner.children[3].style.backgroundColor = '#B22222';

    } else {
        landingKep.style.backgroundImage = 'url(fooldal/pics/landing-image.jpg)';
        landingInner.children[0].textContent = 'Fedezd Fel a Logikai Játékok Világát!';
        landingInner.children[1].textContent = 'Játékaink';
        landingInner.children[2].innerHTML = 'Rövid, izgalmas kihívások várnak rád, ideálisak gyors kikapcsolódásra. <br> Játssz most, és fejleszd a logikádat szórakoztató módon!';
        landingInner.children[3].children[0].children[0].textContent = 'Nézd meg';
        landingInner.children[3].children[0].setAttribute('href', '#szekcio2');
        landingInner.children[3].style.backgroundColor = '#005A92';
    }
})
