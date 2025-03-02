const kepek = [     //memória ikonok Font Awesome-os class nevei
    "fa-bomb",
    "fa-pen",
    "fa-cart-shopping",
    "fa-brush",
    "fa-fish",
    "fa-truck-fast",
    "fa-bicycle",
    "fa-lemon",
    "fa-star",
    "fa-cloud",
    "fa-hippo",
    "fa-bell",
    "fa-headphones",
    "fa-plane",
    "fa-magnet",
    "fa-bug",
    "fa-paint-roller",
    "fa-film",
    "fa-dumpster-fire",
    "fa-paper-plane",
    "fa-cable-car",
    "fa-crown",
    "fa-coins",
    "fa-champagne-glasses",
    "fa-volcano",
    "fa-vihara",
    "fa-toilet-paper",
    "fa-scale-balanced",
    "fa-mosque",
    "fa-parachute-box",
    "fa-map-location-dot",
    "fa-landmark-flag",
    "fa-street-view",
    "fa-dice",
    "fa-bridge",
    "fa-republican",
    "fa-person-skiing",
    "fa-money-bill-wave",
    "fa-mobile-retro",
    "fa-microphone-lines",
    "fa-helicopter",
    "fa-car-tunnel",
    "fa-bullhorn"
];

function Kever(tomb){
    tomb.sort(() => Math.random() - 0.5);
}

//HTML-elemek
const lepesek = document.getElementById("lepesek_div");
const parSzamlalo = document.getElementById('parok-szama');
const jatekter = document.getElementById('jatekter');
const konti = document.querySelector('.conti');
const szabalyGomb = document.getElementById('szabaly-popup');
const szabalySor = document.getElementById('szabalyok');

//Változók
var terulet = [];
var lepesek_szama = 0;
var elso_lap = -1;
var aktivRekord;
var aktPar = [];
var parokSzama = 0;
var next = true;    //lehet-e a következő kártyára kattintani
var telo = false;

function pixelCheck(){
    if (window.innerWidth <= 768){
        telo = true;
    } else {
        telo = false;
    }
    
}

pixelCheck();


function RekordAlapBeallitas(){
    for (let i = 0; i < document.querySelector('option').childElementCount; i++){
        if (localStorage.getItem(`rekord${i*2}x*${i*2}`) == null){
            localStorage.setItem(`${i*2}x${i*2}`, 10000);
        }
    }
}

RekordAlapBeallitas()




function LepesekNovelese(){
    lepesek_szama = lepesek_szama + 1;
    document.getElementById("lepesek_szama_p").innerHTML = lepesek_szama;
}



function MezoMeretezes(){
    Kever(kepek);
    konti.style.display = 'flex';
    // mezők számának megadása - html select alapján
    document.getElementById("bev").style.opacity = "0";
    
    window.setTimeout(() => {
        document.getElementById("bev").style.display = "none";
        foConti.style.display = 'block';
        if (telo){
            lepesek.style.display = "flex";
        } else {
            lepesek.style.display = "block";
        }
        
        for (i = 0; i < terulet.length; i++){
            const lap = document.createElement("i");
            lap.setAttribute("onclick",`ForditsdMeg(${i});`);
            lap.className = "fa-solid nem-aktiv";
            lap.classList.add(kepek[terulet[i]]);
            
            lap.id = `lap${i}`
            jatekter.appendChild(lap);
            if (telo && mezok_szama >= 6) {
                jatekter.childNodes.forEach(t => {                    
                    t.style.fontSize = `${24 / mezok_szama}vh`;
                    t.style.borderRadius = '1.75vh';
                });
            }
            
        }
    },300);
    window.setTimeout(() => {
        foConti.style.opacity = '1';
        szabalySor.style.opacity = '0';
        szabalySor.style.transform = 'translateY(10vh)';
    },500)
    
    
    var e = document.getElementById("mezo_meret");
    var mezok_szama = parseInt(e.value);
    var kartyak = [];

    if (!telo || mezok_szama < 6){
        jatekter.style.gridTemplateColumns = `repeat(${mezok_szama}, 10vh)`;
        jatekter.style.gridTemplateRows = `repeat(${mezok_szama}, 10vh)`;
    } else if (telo && mezok_szama >= 6) {
        jatekter.style.gridTemplateColumns = `repeat(${mezok_szama - 2}, ${(45 / mezok_szama)}vh)`;
        jatekter.style.gridTemplateRows = `repeat(${Math.ceil(Math.pow(mezok_szama, 2) / (mezok_szama - 2))}, ${(45 / mezok_szama)}vh)`;
    

    }

    aktivRekord = localStorage.getItem(`rekord${mezok_szama}x${mezok_szama}`);
    
    

    // kartyak lista letrehozasa (feltoltese szamokkal)

    for (i = 0; i < mezok_szama ** 2 / 2; i++){
        kartyak.push(i)
        kartyak.push(i)
    }

    // terulet tomb feltoltese a kartyak tomb tartalmaval veletlenszeruen

    while (kartyak.length > 0){
        var rand_szam = GetRandomInt(kartyak.length);
        terulet.push(kartyak[rand_szam]);
        kartyak = RemoveArrayElementByIndex(kartyak, rand_szam);
    }    
}

function ForditsdMeg(index){
    if (aktPar[0] != index && next && !jatekter.children[index].classList.contains('par')){
        next = false;
        LepesekNovelese();
        jatekter.children[index].style.transform = 'rotateY(180deg)';
        window.setTimeout(() => {
            jatekter.children[index].classList.remove('nem-aktiv');
        },200)
        aktPar.push(index);
        
        if (lepesek_szama % 2 == 1){
            elso_lap = terulet[index];
            next = true;
        } else {
            if (elso_lap == terulet[index]){
                window.setTimeout(() => {
                    jatekter.children[aktPar[0]].classList.add('par');    
                    jatekter.children[aktPar[1]].classList.add('par'); 
                    aktPar = [];  
                    next = true;  
                },450);
                parokSzama += 1;
                parSzamlalo.textContent = parokSzama;
                if (parokSzama == jatekter.childElementCount / 2){
                    window.setTimeout(modalKi, 1000);
                    window.setTimeout(OsszesParMegvan, 1000);
                    
                }
            } else {
                window.setTimeout(() => {
                    jatekter.children[aktPar[0]].classList.add('nem-aktiv');
                    jatekter.children[aktPar[1]].classList.add('nem-aktiv');
                    
                },800);
                window.setTimeout(() => {
                    jatekter.children[aktPar[0]].style.transform = 'rotateY(0deg)';
                    jatekter.children[aktPar[1]].style.transform = 'rotateY(0deg)';
                    aktPar = [];
                    next = true;
                },1000);
                
            }
        }
    }  
}

function OsszesParMegvan(){
    vegeModal.children[0].style.backgroundColor = '#E89611';
    
    const ikon = document.createElement('span');
    
    if (lepesek_szama < aktivRekord){
        ikon.className = 'fa-solid fa-medal fa-4x fa-bounce';
        ikon.style.color = '#FFD700';
        localStorage.setItem(`rekord${Math.sqrt(jatekter.childElementCount)}x${Math.sqrt(jatekter.childElementCount)}`, lepesek_szama);
        vegeModal.children[2].textContent = `Új rekord (${Math.sqrt(jatekter.childElementCount)}x${Math.sqrt(jatekter.childElementCount)}): ${lepesek_szama} lépés`;
    } else if (lepesek_szama == aktivRekord) {
        ikon.className = 'fa-solid fa-award fa-3x fa-bounce';
        ikon.style.color = '#FFD43B';
        vegeModal.children[2].textContent = 'A rekordok nem dőlnek meg könnyen... De legalább megint beállítottad.'
    }
    
    else {
        ikon.className = 'fa-solid fa-star fa-3x fa-bounce';
        ikon.style.color = 'gold';
        vegeModal.children[2].textContent = `Teljesítetted a szintet ${lepesek_szama} lépés alatt`;
    }
    
    
    jelConti.appendChild(ikon);
    window.setTimeout(modalKi, 500);
    window.setTimeout(() => {
        vegeModal.children[0].style.opacity = '1';
    }, 1000);
    window.setTimeout(() => {
        vegeModal.children[1].style.opacity = '1';
    }, 1300);
    window.setTimeout(() => {
        vegeModal.children[2].style.opacity = '1';
    }, 1800);

    window.setTimeout(() => {
        vegeGombok.forEach(gomb => gomb.style.opacity = '1');
    }, 2300);

}

function Reset() {
    terulet = [];
    lepesek_szama = 0;
    parokSzama = 0;
    foConti.style.opacity = '0';
    window.setTimeout(() => {
        foConti.style.display = 'none';
    },300)

    parSzamlalo.textContent = '0';
    
    document.getElementById("lepesek_szama_p").innerHTML = '0';
    vegeModal.style.transform = 'scale(0)';
    window.setTimeout(() => {
        for (let i = 0; i < vegeModal.childElementCount - 1; i++) {
            vegeModal.children[i].style.opacity = '0';
        }
        vegeGombok.forEach(gomb => gomb.style.opacity = '0');
        foConti.style.filter = 'brightness(1) blur(0)';
        foConti.style.backdropFilter = 'brightness(1)';
        vegeModal.style.opacity = '0';
        while (jatekter.firstChild){
            jatekter.removeChild(jatekter.lastChild);
        }
    },200);
    window.setTimeout(() => {
        jelConti.children[0].remove();
        document.getElementById("bev").style.display = "block";
        
    },400);

    window.setTimeout(() => {
        document.getElementById("bev").style.opacity = "1";
    },600);
}

function szabalyMegnyit(){
    szabalySor.style.opacity = '1';
    szabalySor.style.transform = 'translateY(0)';
}

vegeGombok[0].addEventListener('click', Reset);
szabalyGomb.addEventListener('click', szabalyMegnyit)