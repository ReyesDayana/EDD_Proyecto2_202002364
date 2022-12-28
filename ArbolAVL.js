const { exec } = require('node:child_process')
var fs = require('fs')
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
        this.contador=0
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
                if(this.Altura(actual.derecha)-this.Altura(actual.izquierda)==2){
                     if(nodo.id > actual.derecha.id){
                        actual=this.SRR(actual);
                    }else{
                        actual = this.DRR(actual);
                    }
                }
            }else if(actual.id>nodo.id){
                actual.izquierda=this.InsertarAVL(actual.izquierda,nodo)
                if(this.Altura(actual.derecha)-this.Altura(actual.izquierda)==-2){
                     if(nodo.id < actual.izquierda.id){ 
                        actual = this.SRL(actual);
                    }else{ 
                        actual = this.DRL(actual);
                    }
                }
            }else{
                console.log("Ya existe un nodo con este id, no se puede insertar")
            }
            actual.altura = this.Maxima(this.Altura(actual.derecha),this.Altura(actual.izquierda))+1
            return actual
        }else{
            actual=nodo
            return actual
        }
    }
    Altura(nodo){
        if(nodo!=null){
            return nodo.altura
        }
        return -1
    }
    Maxima(auno,ados){
        if(ados>=auno){
            return ados
        }else{
            return auno
        }
    }
    //simple derecha
    SRR(nodo){
        var auxiliar=nodo.derecha
        nodo.derecha=auxiliar.izquierda
        auxiliar.izquierda=nodo
        nodo.altura = this.Maxima(this.Altura(nodo.izquierda),this.Altura(nodo.derecha)) +1
        auxiliar.altura = this.Maxima(nodo.altura,this.Altura(nodo.der))+1
        return auxiliar
    }
    SRL(nodo){
        var auxiliar=nodo.izquierda
        nodo.izquierda=auxiliar.derecha
        auxiliar.derecha=nodo
        nodo.altura = this.Maxima(this.Altura(nodo.derecha),this.Altura(nodo.izquierda)) +1
        auxiliar.altura = this.Maxima(nodo.altura,this.Altura(nodo.izquierda))+1
        return auxiliar
    }
    //doble por la derecha
    DRR(nodo){
        nodo.derecha=SRL(nodo.derecha)
        return this.SRR(nodo)
    }
    DRL(nodo){
        nodo.izquierda=this.SRR(nodo.izquierda)
        return this.SRL(nodo)
    }
    GraficarAVL(){
        var graficaravl=""
        graficaravl+="digraph A { \n"
        graficaravl+="node[shape=circle] \n"
        graficaravl+="label= \"Arbol AVL\" \n"
        graficaravl+=this.EscribirNodos(this.raiz)
        graficaravl+="\n";
        graficaravl+= this.EscribirEnlaces(this.raiz);
        graficaravl+="\n}"
        console.log(graficaravl)
        fs.writeFile("Avl.dot", graficaravl, function(err) {
            if (err) {
            return console.log(err);
            }
        exec("dot -Tpng Avl.dot -o Avl.png ");
        });

    }
    EscribirNodos(nodo){
        var escribirnodosavl=""
        var nodoavl=""
        var nodoavlnombre=""
        if(nodo!=null){
            nodoavlnombre=nodo.pelicula.replace(/\s+/g,"")
            nodoavl="nodoa"+nodo.id+nodoavlnombre
            escribirnodosavl+=nodoavl+"[label=\" ID: "+nodo.id+"\nPelicula: "+nodo.pelicula+"\nPrecio: "+nodo.precio+"\"]\n";
            if(nodo.derecha!=null && nodo.izquierda==null){  
                escribirnodosavl+=this.contador+'[label="izquierda" shape=box]\n'  
                escribirnodosavl+=nodoavl+' -> '+this.contador
                this.contador++
            }
            escribirnodosavl+=this.EscribirNodos(nodo.izquierda)
            escribirnodosavl+=this.EscribirNodos(nodo.derecha)
        }
        return escribirnodosavl
    }
    EscribirEnlaces(nodo){
        var escribiravlenlaces=""
        if(nodo!=null){
            escribiravlenlaces+=this.EscribirEnlaces(nodo.izquierda)
            escribiravlenlaces+=this.EscribirEnlaces(nodo.derecha)
            if(nodo.izquierda!=null){
                var izquierdanombre=nodo.izquierda.pelicula.replace(/\s+/g,"")
                var nombrenodoenlace=nodo.pelicula.replace(/\s+/g,"")
                var nombreizquierda="nodoa"+nodo.izquierda.id+izquierdanombre
                var nodoavlenlace="nodoa"+nodo.id+nombrenodoenlace
                escribiravlenlaces+=nodoavlenlace+" -> "+nombreizquierda+"\n"
            }

            if(nodo.derecha!=null){
                var derechanombre=nodo.derecha.pelicula.replace(/\s+/g,"")
                var nombrenodoenlace=nodo.pelicula.replace(/\s+/g,"")
                var nombrederecha="nodoa"+nodo.derecha.id+derechanombre
                var nodoavlenlace="nodoa"+nodo.id+nombrenodoenlace
                escribiravlenlaces+=nodoavlenlace+" -> "+nombrederecha+"\n"
            }
            if(nodo.derecha==null && nodo.izquierda!=null){
                var nombrenodoenlace=nodo.pelicula.replace(/\s+/g,"")
                var nodoavlenlace="nodoa"+nodo.id+nombrenodoenlace
                escribiravlenlaces+=this.contador+'[label="derecha" shape=box]\n'
                escribiravlenlaces+=nodoavlenlace+' -> '+this.contador
                this.contador++
            }
            
        }
        return escribiravlenlaces
    }
}
var prueba=new AVL()
prueba.AgregarNodoAVL(1,"nose","que",4,3.50,15,"cualquiera")
prueba.AgregarNodoAVL(2,"nose","que",4,3.50,15,"cualquiera")
prueba.AgregarNodoAVL(3,"nose","que",4,3.50,15,"cualquiera")
prueba.AgregarNodoAVL(4,"nose","que",4,3.50,15,"cualquiera")
prueba.AgregarNodoAVL(5,"nose","que",4,3.50,15,"cualquiera")
prueba.GraficarAVL()