
// Lista de recursos a precargar
var imagenes = {
    nodo : "res/nodo.png",
    nodoActivo : "res/nodoActivo.png",
};

var cacheImagenes = new Object();
var rutasImagenes = Object.values(imagenes);
var nombresImagenes = Object.keys(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    cacheImagenes[nombresImagenes[indice]] = imagenCargar;
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciar();
        }
    }
}
