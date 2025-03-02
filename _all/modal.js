const vegeModal = document.getElementById('win-modal');
const foConti = document.querySelector('.container-fluid');
const vegeGombok = document.querySelectorAll('.button-conti *');
const ujJatekGomb = vegeGombok[0];
const jelConti = document.getElementById('jel-conti');

function modalKi() {
    vegeModal.style.transform = 'scale(1)';
    foConti.style.filter = 'brightness(0.5) blur(10px)';
    foConti.style.backdropFilter = 'brightness(0.2)';
    window.setTimeout(() => {
        vegeModal.style.opacity = '1';
    },300)
}