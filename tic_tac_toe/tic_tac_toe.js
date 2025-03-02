const mezok = document.querySelectorAll('.kocka');

var kor_mezoi = [];
var x_mezoi = [];
var szabad_mezok = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var nyero_mezok = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
var lepes_szama = 0;
var kezdes = 0;

function Start_ttt(){
    foConti.style.opacity = '0';
    document.getElementById("ttt_introDiv").style.opacity = "0";
    window.setTimeout(() => {
        document.getElementById("ttt_mainDiv").style.display = "block";
        foConti.style.display = "block";
        document.getElementById('ttt_introDiv').style.display = 'none';
    },401);
    window.setTimeout(() => {
        foConti.style.opacity = "1";
        document.getElementById("ttt_mainDiv").style.opacity = "1";
    },500);
}

function Nyertel_E(jatekos_mezoi) {
    for (i = 0; i < nyero_mezok.length; i++) {
        var akt_lista = [];
        for (j = 0; j < nyero_mezok[i].length; j++) {
            for (k = 0; k < jatekos_mezoi.length; k++) {
                if (nyero_mezok[i][j] == jatekos_mezoi[k]) {
                    akt_lista.push(true);
                    if (akt_lista.length == 3) {
                        return true;
                    }
                }
            }
        }
    }
}

function Ellenorzes(jatekos_mezoi) {
    if (Nyertel_E(jatekos_mezoi)) {
        mezok.forEach(mezo => mezo.classList.add('no-click'));
        vegeGombok[0].textContent = 'Visszavágó?';
        window.setTimeout(modalKi, 500);
        window.setTimeout(() => {
            vegeModal.children[0].style.opacity = '1';
        }, 1300);
        window.setTimeout(() => {
            vegeModal.children[1].style.opacity = '1';
        }, 1800);
        window.setTimeout(() => {
            vegeModal.children[2].style.opacity = '1';
        }, 2300);

        window.setTimeout(() => {
            vegeGombok.forEach(gomb => gomb.style.opacity = '1');
        }, 3000)

        for (let i = 0; i < 3; i++) {
            const jel = document.createElement('span');
            jel.style.textShadow = '.75vh .75vh rgba(0, 0, 0, 0.3)';
            jelConti.appendChild(jel);
        }
        vegeModal.children[0].textContent = 'Gratulálunk!';
        if (jatekos_mezoi == kor_mezoi) {
            vegeModal.children[0].style.backgroundColor = '#B22222';
            vegeModal.children[2].textContent = 'A Kör nyert';
            jelConti.childNodes.forEach((jel) => {
                jel.className = 'fa-regular fa-circle fa-2x fa-bounce';
                jel.style.color = '#FF0800';
            });

        } else {
            vegeModal.children[0].style.backgroundColor = '#008000';
            vegeModal.children[2].textContent = 'Az X nyert';
            jelConti.childNodes.forEach((jel) => {
                jel.className = 'fa-solid fa-xmark fa-3x fa-beat';
                jel.style.color = '#008000';
            });
        }
    }
}

function Klikk(mezo_szama) {
    var hasznalhato = false;
    for (i = 0; i < szabad_mezok.length; i++) {
        if (szabad_mezok[i] == mezo_szama) {
            hasznalhato = true;
        }
    }

    if (hasznalhato) {
        lepes_szama++;
        var akt_mezo = document.getElementById(`k${mezo_szama}`);
        
        if (lepes_szama % 2 - kezdes == 0) {
            kor_mezoi.push(mezo_szama);
            akt_mezo.classList.add("korMezoi");
            akt_mezo.classList.add("no-click");
            const jel = document.createElement('span');
            jel.className = 'fa-regular fa-circle fa-beat';
            jel.style.textShadow = '1vh 1vh rgba(0, 0, 0, 0.3)';
            akt_mezo.appendChild(jel);
            Ellenorzes(kor_mezoi);
        }
        else {
            x_mezoi.push(mezo_szama);
            akt_mezo.classList.add("xMezoi");
            akt_mezo.classList.add("no-click");
            const jel = document.createElement('span');
            jel.className = 'fa-solid fa-xmark fa-lg fa-beat';
            jel.style.textShadow = '1vh 1vh rgba(0, 0, 0, 0.3)';
            akt_mezo.appendChild(jel);
            Ellenorzes(x_mezoi);
        }

        if (lepes_szama == 9 && !Nyertel_E(kor_mezoi) && !Nyertel_E(x_mezoi)){
            Dontetlen();
        }
    }
}

function Kocka1() {
    Klikk(1);
}

function Kocka2() {
    Klikk(2);
}

function Kocka3() {
    Klikk(3);
}

function Kocka4() {
    Klikk(4);
}

function Kocka5() {
    Klikk(5);
}

function Kocka6() {
    Klikk(6);
}

function Kocka7() {
    Klikk(7);
}

function Kocka8() {
    Klikk(8);
}

function Kocka9() {
    Klikk(9);
}



function Reset() {
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
        while (jelConti.firstChild){
            jelConti.removeChild(jelConti.lastChild);
        }

    },400)
    
        
    lepes_szama = 0;
    kor_mezoi = [];
    x_mezoi = [];
    mezok.forEach(function(kocka){
        kocka.className = 'kocka';
        if (kocka.children[0]){
            kocka.children[0].remove();
        }
    })
}

function UjJatek() {
    Reset();
    // foConti.style.opacity = "0";
    // foConti.style.display = "none";
    // document.getElementById("ttt_introDiv").style.display = "block";

    document.getElementById("ttt_mainDiv").style.opacity = "0";
    window.setTimeout(() => {
        document.getElementById("ttt_mainDiv").style.display = "none";
        foConti.style.display = "none";
        document.getElementById('ttt_introDiv').style.display = 'block';
    },401);
    window.setTimeout(() => {
        foConti.style.opacity = "0";
        document.getElementById('ttt_introDiv').style.opacity = '1';
    },500)
}

/*    foConti.style.opacity = '0';
    document.getElementById("ttt_introDiv").style.opacity = "0";
    window.setTimeout(() => {
        document.getElementById("ttt_mainDiv").style.display = "block";
        foConti.style.display = "block";
        document.getElementById('ttt_introDiv').style.display = 'none';
    },401);
    window.setTimeout(() => {
        foConti.style.opacity = "1";
    },500) */



function Dontetlen(){
    vegeModal.children[0].textContent = 'Döntetlen';
    vegeModal.children[0].style.backgroundColor = 'gray';
    vegeModal.children[2].textContent = '';
    const ikon = document.createElement('span');
    ikon.className = 'fa-solid fa-handshake fa-4x';
    ikon.style.color = 'black';
    jelConti.appendChild(ikon);
    vegeGombok[0].textContent = 'Döntő meccs?';
    window.setTimeout(modalKi, 500);
    window.setTimeout(() => {
        vegeModal.children[0].style.opacity = '1';
    }, 1300);
    window.setTimeout(() => {
        vegeModal.children[1].style.opacity = '1';
    }, 1800);

    window.setTimeout(() => {
        vegeGombok.forEach(gomb => gomb.style.opacity = '1');
    }, 2300);

}



ujJatekGomb.addEventListener('click', UjJatek);