
class Editor {

    constructor() {
        this.nodos = [];
    }

    dibujar (){
        // Capa de fondo
        var colorPrevio = contexto.fillStyle;
        contexto.fillStyle="#fff";
        contexto.fillRect(0,0,900,500);
        contexto.fillStyle = colorPrevio;

        for(var i=0; i < this.nodos.length; i++) {
            this.nodos[i].dibujar();
        }   
    }
    
    dibujarNodoSeleccionado(nodo){
        // Nodo
        for(var i=0; i < this.nodos.length; i++){
            this.nodos[i].dibujarSeleccionado(false);
        }
        if ( nodo != null ) {
            nodo.dibujarSeleccionado(true);
        }
        this.dibujar();
    }
    

    auxPulsacionEnNodo(x,y){
        // no cae en ningun nodo
        for(var i=0; i < this.nodos.length; i++) {
            if ( this.nodos[i].contienePunto(x,y)){
                return this.nodos[i];
            }
        }
        return null;
    }
    
    comprobarMouseDown(x, y){
        var nodoEnQueCaeElClick = this.auxPulsacionEnNodo(x,y);
    
        // Crear un nuevo nodo
        if ( accion == ACCION_CREAR_NODO && nodoEnQueCaeElClick == null){
            var nuevoNodo = new Nodo(x + scrollX ,y + scrollY);
            this.nodos.push(nuevoNodo);
            nodoEnQueCaeElClick = nuevoNodo;
            globalNingunaAccionSeleccionada();
            globalActualizarNodoActivo(nodoEnQueCaeElClick);
      
        // Click normal en un nodo
        } else if (accion == ACCION_NO && nodoEnQueCaeElClick != null) {
    
            globalActualizarNodoActivo(nodoEnQueCaeElClick);
            
        // Seleccionar una zona "libre"
        } else if (accion == ACCION_NO && nodoEnQueCaeElClick == null ){
            accion = ACCION_SCROLL;
            scrollFijado = {x: x, y: y};    
            globalActualizarNodoActivo(null);
        }
    
        this.dibujarNodoSeleccionado(nodoEnQueCaeElClick);
    
    }
    
    
    
    comprobarMouseMove(x, y){
        // Hay scroll
        if ( accion == ACCION_SCROLL && scrollFijado != null ){
            scrollX += scrollFijado.x - x;
            scrollY += scrollFijado.y - y;
            scrollFijado = { x: x, y: y}; // Dejar el Scroll en el nuevo punto del ratón
            this.dibujar();
        }
    }

    comprobarMouseUp(x, y){
        scrollFijado = null;
        if ( accion == ACCION_SCROLL){
            globalNingunaAccionSeleccionada();
        }    
    }
}
