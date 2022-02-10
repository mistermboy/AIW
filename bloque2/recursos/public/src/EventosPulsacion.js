$('#canvas').mousedown(function(event){
    // Calcular la posición del click en el canvas (No en la página completa)
    click = procesarCoordenadas(event);
    editor.comprobarMouseDown(click.x, click.y);
})

$('#canvas').mousemove(function(event){
    click = procesarCoordenadas(event);
    editor.comprobarMouseMove(click.x, click.y);
})

$('#canvas').mouseup(function(event){
    click = procesarCoordenadas(event);
    editor.comprobarMouseUp(click.x, click.y);
})

function procesarCoordenadas(event){
    var rect = canvas.getBoundingClientRect();
    var escalado = canvas.clientWidth/900; // es igual en los 2 ejes,

    x = (event.clientX - rect.left)/escalado;
    y = (event.clientY - rect.top)/escalado;

    return { x: x, y: y}
}
