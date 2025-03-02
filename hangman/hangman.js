var hibak_szama = 0;

const osszes_betu_eredeti = ["a", "á", "b", "c", "d", "e", "é", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "o", "ó", 
                                "ö", "ő", "p", "q", "r", "s", "t", "u", "ú", "ü", "ű", "v", "w", "x", "y", "z", "-", "/"];
var osszes_betu = [];

var kitalalando_szo = "";
var kitalalt_resz = "";
var szint;
var szorzo;

var talalgatas_fazis = false;
const betuConti = document.getElementById('betuk');
const katCim = document.getElementById('katdisplay');
var hibajel;
if (window.innerWidth <= 768){
    hibajel = document.getElementById('hibajel');
} else {
    hibajel = document.getElementById('hibajel-pc')
}


function Letrehozas(){
    for (let i = 0; i < osszes_betu_eredeti.length; i++){
        const b = document.createElement('button');
        b.textContent = osszes_betu_eredeti[i].toUpperCase();
        b.setAttribute('onclick', `checkthis("${(osszes_betu_eredeti[i])}")`);
        b.id = `${osszes_betu_eredeti[i]}`;
        b.classList.add('b');
        betuConti.appendChild(b);
    }
}

Letrehozas();

function HangmanStart(lista_neve, kategoria_nev){
    window.setTimeout(() => {
        var szavak = [];
    for (i = 0; i < lista_neve.length; i++){
        szavak.push(lista_neve[i])
    }
    
    kitalalt_resz = '';        
    document.getElementById("hangman_intro").style.opacity = "0";
    window.setTimeout(() => {
        document.getElementById("hangman_intro").style.display = "none";
        foConti.style.display = "block";
    },300);
    window.setTimeout(() => {
        foConti.style.opacity = '1';
    },400);
    
    talalgatas_fazis = true;

    var x = GetRandomInt(szavak.length);
    kitalalando_szo = szavak[x];
    for (i = 0; i < kitalalando_szo.length; i++){
        if (kitalalando_szo[i] == ' '){
            kitalalt_resz += ' '
        } else {
            kitalalt_resz += "_"
        }
    }
    katCim.textContent = kategoria_nev;

    document.getElementById("talaldkiezt").innerHTML = kitalalt_resz;
    for (y = 0; y < osszes_betu_eredeti.length; y++){
        osszes_betu.push(osszes_betu_eredeti[y])
    }
    },300);

    szint = parseInt(document.getElementById('fok-valaszt').value);
    
    if (szint == 11){
        szorzo = 1;
    } else if (szint == 8){
        szorzo = 1.5;
    } else {
        szorzo = 2;
    }
    hibajel.textContent = `0/${szint}`
    
}


function checkthis(betu){       
    if (talalgatas_fazis){
        var megnyerted_e = false;
        var megtalaltuk_benne = false;
        document.getElementById(betu).classList.add('tipp');
        document.getElementById(betu).disabled = 'true';
        for (y = 0; y < osszes_betu.length; y++){
            if (betu === osszes_betu[y]){
                for (i = 0; i < kitalalando_szo.length; i++){
                    betu = betu.toLowerCase();
                    if (kitalalando_szo[i].toLowerCase() === betu){
                        if (kitalalando_szo[i].toUpperCase() == kitalalando_szo[i]){
                            betu = betu.toUpperCase();
                        }
                        megtalaltuk_benne = true;
                        document.getElementById(betu.toLowerCase()).style.backgroundColor = '#008000';
                        var ize = "";
                        for (j = 0; j < kitalalt_resz.length; j++){
                            if (j == i){
                                ize += betu;
                            }
                            else {
                                ize += kitalalt_resz[j]
                            }
                        }
                        kitalalt_resz = ize;
                        document.getElementById("talaldkiezt").innerHTML = kitalalt_resz;
                        
                        if (kitalalt_resz === kitalalando_szo){megnyerted_e = true;}
                    }
                }
                osszes_betu = RemoveArrayElementByIndex(osszes_betu, y);
            }
        }
        if (!megtalaltuk_benne && hibak_szama <= szint){
            for (let i = 0; i < osszes_betu_eredeti.length; i++){
                if (betu == osszes_betu_eredeti[i]){
                    hibak_szama++;     
                    hibajel.textContent = `${hibak_szama}/${szint}`;                    
                }
            }            
            document.getElementById('kep_tarto').children[Math.floor((hibak_szama-1)*szorzo)].classList.add('aktkep');
            document.getElementById(betu).style.backgroundColor = '#B22222';
        }

        if (megnyerted_e || hibak_szama == szint){
            betuConti.childNodes.forEach(b => {
                b.classList.add('tipp');
                b.disabled = true;
            })
            const ikon = document.createElement('span');
            if (megnyerted_e){
                talalgatas_fazis = false;
                ikon.className = 'fa-solid fa-trophy fa-bounce fa-3x';
                ikon.style.color = '#FFD700';
                vegeModal.children[0].style.backgroundColor = '#E89611';

                vegeModal.children[2].textContent = 'Kitaláltad a szót: ';
                vegeModal.children[3].textContent = kitalalando_szo;
                window.setTimeout(modalKi, 500);
                modalMegjelenit();
                
                
            } else if (hibak_szama == szint){
                talalgatas_fazis = false;
                window.setTimeout(modalKi, 500);
                vegeModal.children[0].textContent = 'Játék vége';
                vegeModal.children[0].style.backgroundColor = 'gray';

                ikon.className = 'fa-solid fa-face-dizzy fa-shake fa-3x';
                ikon.style.color = 'navy';

                vegeModal.children[2].textContent = 'A kitalálandó szó ez lett volna:';
                vegeModal.children[3].textContent = kitalalando_szo;
                
                window.setTimeout(modalMegjelenit, 500);
            }
            jelConti.appendChild(ikon)
        }

        
    }
    
    
}

function modalMegjelenit(){
    window.setTimeout(() => {
        vegeModal.children[0].style.opacity = '1';
    }, 1300);
    window.setTimeout(() => {
        vegeModal.children[1].style.opacity = '1';
    }, 2000);
    window.setTimeout(() => {
        vegeModal.children[2].style.opacity = '1';
    }, 2500);
    window.setTimeout(() => {
        vegeModal.children[3].style.opacity = '1';
    }, 3000);

    window.setTimeout(() => {
        vegeGombok.forEach(gomb => gomb.style.opacity = '1');
    }, 3500);
}

window.addEventListener('keydown', (betu) => {
    const b = String(betu.key).toLowerCase();
    if (document.getElementById(b)){
        if (!document.getElementById(b).disabled){
            checkthis(b);
        }
        else{
            document.getElementById(b).classList.add('razkodas');
            window.setTimeout(() => {
                document.getElementById(b).classList.remove('razkodas');
            },700);
        }
    }
    
});

const kepTarto = document.getElementById('kep_tarto')

function Reset() {
    hibajel.textContent = `/${szint}`;
    kitalalt_resz = '';
    hibak_szama = 0;
    foConti.style.opacity = '0';
    betuConti.childNodes.forEach(b => {
        b.classList.remove('tipp');
        b.style.backgroundColor = '#0047AB';
        b.disabled = false;
    });
    
    for (let i = 0; i < kepTarto.childElementCount; i++){
        kepTarto.children[i].classList.remove('aktkep');
    }
    vegeModal.style.transform = 'scale(0)';
    window.setTimeout(() => {
        for (let i = 0; i < vegeModal.childElementCount - 1; i++) {
            vegeModal.children[i].style.opacity = '0';
        }
        vegeGombok.forEach(gomb => gomb.style.opacity = '0');
        foConti.style.filter = 'brightness(1) blur(0)';
        foConti.style.backdropFilter = 'brightness(1)';
        vegeModal.style.opacity = '0';
    },200);
    window.setTimeout(() => {
        
        if (jelConti.children[0]){
            jelConti.children[0].remove();
        }
        
        
        document.getElementById("hangman_intro").style.display = "flex";
    },400);

    window.setTimeout(() => {
        foConti.style.display = 'none';
        document.getElementById("hangman_intro").style.opacity = "1";
    },600);
}

vegeGombok[0].addEventListener('click', Reset);