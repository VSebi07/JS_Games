function RemoveArrayElementByIndex(array, index){
    var lista = []
    for (i = 0; i < array.length; i++){
        if (i !== parseInt(index)){
            lista.push(array[i])
        }
    }
    return lista
}

function GetRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function ParallaxHatter(hatter){
    window.addEventListener('scroll', function(){
        hatter.style.backgroundPositionY = `${window.scrollY * .25}%`;
    })
}