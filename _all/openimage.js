const nagyContiDeNemFoconti = document.querySelector('.container');
const nagykep = document.getElementById('teljes-kepernyos-kep');
const kepConti = nagykep.children[0];
const fsBezar = document.getElementById('fullscreen-bezar');
const szabalyKepek = document.querySelectorAll('.jatekszabaly img');
const kartyaLeirasok = document.querySelectorAll('#szabalyok p');
const leiras = document.getElementById('leiras');

function nagykepMegjelenit(){
    nagykep.style.display = 'block';
    nagyContiDeNemFoconti.style.filter = 'brightness(0.05)';
    nagyContiDeNemFoconti.style.backdropFilter = 'brightness(0.05)';
    nagykep.style.transform = 'scale(1)';  
    document.body.style.overflowY = 'hidden';
}

szabalyKepek.forEach(kep => { 
    kep.addEventListener('click', function(){
        
        for (let i = 0; i < szabalyKepek.length; i++){
            if (szabalyKepek[i] == kep){
                var index = i
            }
        }
        
        
        leiras.textContent = kartyaLeirasok[index].textContent;
        nagykepMegjelenit();
        const aktKep = document.createElement('img');
        aktKep.src = kep.getAttribute('src');
        aktKep.setAttribute('id', 'nagy-kep');
        kepConti.appendChild(aktKep);
        window.setTimeout(() => {
            aktKep.style.transform = 'scale(1)';
        },400);
        window.setTimeout(() => {
            leiras.style.opacity = '1';
        },750);
        
    });

});

function nagykepBezar(){
    document.getElementById('nagy-kep').remove();
    nagykep.style.transform = 'scale(0)';
    nagyContiDeNemFoconti.style.filter = 'brightness(1)';
    nagyContiDeNemFoconti.style.backdropFilter = 'brightness(1)';
    document.body.style.overflowY = 'auto';
    nagykep.style.display = 'none';
    leiras.style.opacity = '0';
}

fsBezar.addEventListener('click', nagykepBezar);