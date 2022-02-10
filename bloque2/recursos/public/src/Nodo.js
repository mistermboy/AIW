class Nodo {

    constructor(x, y) {
        this.imagen = cacheImagenes["nodo"];

        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
        this.texto = "nombre nodo";
    }
    
    contienePunto(pX, pY){
        if ( pY >= this.y - this.alto/2 - scrollY &&
            pY <= this.y + this.alto/2 - scrollY &&
            pX <= this.x + this.ancho/2 - scrollX &&
            pX >= this.x - this.ancho/2 - scrollX){
            return true;
        }
        return false;
    }
    
    dibujar (){
        contexto.drawImage(this.imagen,
            this.x - this.imagen.width/2 - scrollX,
            this.y - this.imagen.height/2 - scrollY);
    
        contexto.textAlign = 'center';
        contexto.font = "20px Arial";
        contexto.fillText(this.texto, this.x - scrollX, this.y - scrollY);
    }
    

    dibujarSeleccionado(seleccionado){
        if ( seleccionado ){
            this.imagen = cacheImagenes["nodoActivo"];
        } else {
            this.imagen = cacheImagenes["nodo"];
        }
    }



}
