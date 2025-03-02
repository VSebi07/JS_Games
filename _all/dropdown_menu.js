const kulso = document.getElementById('legordulos_menu_telefon');
const Lista = kulso.children[0];

var lathato = false;

function Eltuntetes(){
    if (lathato == true){
        
        for (let i = Lista.childElementCount - 1; i > 0; i--) {
            Lista.children[i].children[0].style.zIndex = `${0 + i}`;
            Lista.children[i].children[0].style.top = 0 + 'vh';
        }
        window.setTimeout(() => {
            kulso.style.opacity = '0';
            lathato = false;
        },400);
        window.setTimeout(() => {
            for (let i = 0; i < Lista.childElementCount; i++) {
                Lista.children[i].style.display = 'none';
            }
            document.getElementById('egesz_oldal').style.filter = "none";
        },701)
    }
}

function DropdownMenu(){    
    for (let i = 0; i < Lista.childElementCount; i++) {
        Lista.children[i].style.display = 'block';
    }
    window.setTimeout(() => {
        kulso.style.opacity = '1';
        if (!lathato) {
            document.getElementById('egesz_oldal').style.filter = "blur(20px)";
            for (let i = 0; i < Lista.childElementCount; i++) {
                Lista.children[i].children[0].style.zIndex = `${Lista.childElementCount - i}`;
                Lista.children[i].children[0].style.top = `${i*8}vh`;
            }
            window.setTimeout(() => {
                lathato = true;
                
            },700)
        }
        else {
            Eltuntetes();
        }
    },1)
}

window.addEventListener('click',Eltuntetes);