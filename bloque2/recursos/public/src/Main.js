// Canvas y contexto del Canvas
var contexto = canvas.getContext("2d");

var editor;
var ACCION_NO = 0;
var ACCION_CREAR_NODO = 1;
var ACCION_SCROLL = 2;
var accion = ACCION_NO;

var nodoActivo = null;

var scrollX = 0;
var scrollY = 0;
var scrollFijado = null;


function iniciar() {
    editor = new Editor();
    editor.dibujar();
}

function globalNingunaAccionSeleccionada(){
    accion = ACCION_NO;
    $('#botonCrearNodo').removeClass();
    $('#botonCrearNodo').addClass('uk-button uk-button-default uk-margin-small-bottom');
}


function globalActualizarNodoActivo(nodo){
    if ( nodo != null) {
        console.log("Actualiza Nodo activo "+nodo.texto);
        nodoActivo = nodo;
        $('#nombreNodo').val(nodo.texto);
    } else {
        nodoActivo = null;
        $('#nombreNodo').val("");
    }
}


function clickBotonEditarPropiedadesNodo(){
    if (nodoActivo != null) {
        nodoActivo.texto = $('#nombreNodo').val();
        editor.dibujar();
    }
}


function activarCrearNodo(){
    accion = ACCION_CREAR_NODO;
    $('#botonCrearNodo').removeClass();
    $('#botonCrearNodo').addClass('uk-button uk-button-secondary uk-margin-small-bottom');
}
