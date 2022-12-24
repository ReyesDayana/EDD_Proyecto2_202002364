class NodoAVL{
    constructor(id,pelicula,descripcion,star,precio,paginas,categoria){
        this.id=id
        this.pelicula=pelicula
        this.descripcion=descripcion
        this.star=star
        this.precio=precio
        this.paginas=paginas
        this.categoria=categoria
        this.izquierda=null
        this.derecha=null
        this.altura=0
    }
}
class AVL{
    constructor(){
        this.raiz=null
    }
    AgregarNodoAVL(id,pelicula,descripcion,star,precio,paginas,categoria){
        var nuevonodoavl=new NodoAVL(id,pelicula,descripcion,star,precio,paginas,categoria)
        if(this.raiz==null){
            this.raiz=nuevonodoavl
        }else{
            this.raiz=this.InsertarAVL(this.raiz,nuevonodoavl)
        }
    }
    InsertarAVL(actual,nodo){
        if(actual!=null){
            if(actual.id<nodo.id){
                actual.derecha=this.InsertarAVL(actual.derecha,nodo)

            }
        }
    }
    Altura(nodo){
        if(nodo!=null){
            return nodo.altura
        }
        return -1
    }
}