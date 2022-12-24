const { exec } = require('node:child_process')
var fs = require('fs')
class NodoArbolBinario{
    constructor(dni,nombre,correo,descripcion){
        this.dni=dni
        this.nombre=nombre
        this.correo=correo
        this.descripcion=descripcion
        this.izquierda=null
        this.derecha=null
    }
}
class ArbolBinario{
    constructor(){
        this.raiz=null
        this.contador=0
    }
    AgregarArbol(dni,nombre,correo,descripcion){
        this.raiz=this.Insertar(dni,nombre,correo,descripcion,this.raiz)
    }
    Insertar(dni,nombre,correo,descripcion,nodo){
        if(nodo==null){
            var nuevonodo=new NodoArbolBinario(dni,nombre,correo,descripcion)
            return nuevonodo
        }else{
            if(nodo.dni<dni){
                nodo.derecha= this.Insertar(dni,nombre,correo,descripcion,nodo.derecha)
            }else{
                nodo.izquierda= this.Insertar(dni,nombre,correo,descripcion,nodo.izquierda)
            }
        }
        return nodo
    }
    PreOrder(){
        this.RecorrerPreOrder(this.raiz)
    }
    RecorrerPreOrder(nodo){
        if(nodo!=null){
            console.log(nodo.dni)
            this.RecorrerPreOrder(nodo.izquierda)
            this.RecorrerPreOrder(nodo.derecha)
        }
    }
    InOrder(){
        this.RecorrerInOrder(this.raiz)
    }
    RecorrerInOrder(nodo){
        if(nodo!=null){
            this.RecorrerPreOrder(nodo.izquierda)
            console.log(nodo.dni)
            this.RecorrerPreOrder(nodo.derecha)
        }
        
    }
    PostOrder(){
        this.RecorrerPostOrder(this.raiz)
    }
    RecorrerPostOrder(nodo){
        if(nodo!=null){
            this.RecorrerPreOrder(nodo.izquierda)
            this.RecorrerPreOrder(nodo.derecha)
            console.log(nodo.dni)
        }
    }
    GraficarArbol(){
        var graficarbinario=""
        graficarbinario+="digraph A { \n"
        graficarbinario+="node[shape=circle] \n"
        graficarbinario+="label= \"Arbol Binario\" \n"
        graficarbinario+=this.EscribirNodos(this.raiz)
        graficarbinario+="\n";
        graficarbinario+= this.EscribirEnlaces(this.raiz);
        graficarbinario+="\n}"
        console.log(graficarbinario)
        fs.writeFile("Lista.dot", graficarbinario, function(err) {
            if (err) {
            return console.log(err);
            }
        exec("dot -Tpng Lista.dot -o Lista.png ");
        });

    }
    EscribirNodos(nodo){
        var escribirnodosbinario=""
        var nodobinario=""
        var nodobinarionombre=""
        if(nodo!=null){
            nodobinarionombre=nodo.nombre.replace(/\s+/g,"")
            nodobinario="nodob"+nodo.dni+nodobinarionombre
            escribirnodosbinario+=nodobinario+"[label=\" Artista: "+nodo.nombre+"\nDni: "+nodo.dni+"\nDescripcion: "+nodo.descripcion+"\"]\n";
            if(nodo.derecha!=null && nodo.izquierda==null){  
                escribirnodosbinario+=this.contador+'[label="izquierda" shape=box]\n'  
                escribirnodosbinario+=nodobinario+' -> '+this.contador
                this.contador++
            }
            escribirnodosbinario+=this.EscribirNodos(nodo.izquierda)
            escribirnodosbinario+=this.EscribirNodos(nodo.derecha)
        }
        return escribirnodosbinario
    }
    EscribirEnlaces(nodo){
        var escribirbinarioenlaces=""
        if(nodo!=null){
            escribirbinarioenlaces+=this.EscribirEnlaces(nodo.izquierda)
            escribirbinarioenlaces+=this.EscribirEnlaces(nodo.derecha)
            if(nodo.izquierda!=null){
                var izquierdanombre=nodo.izquierda.nombre.replace(/\s+/g,"")
                var nombrenodoenlace=nodo.nombre.replace(/\s+/g,"")
                var nombreizquierda="nodob"+nodo.izquierda.dni+izquierdanombre
                var nodobinarioenlace="nodob"+nodo.dni+nombrenodoenlace
                escribirbinarioenlaces+=nodobinarioenlace+" -> "+nombreizquierda+"\n"
            }

            if(nodo.derecha!=null){
                var derechanombre=nodo.derecha.nombre.replace(/\s+/g,"")
                var nombrenodoenlace=nodo.nombre.replace(/\s+/g,"")
                var nombrederecha="nodob"+nodo.derecha.dni+derechanombre
                var nodobinarioenlace="nodob"+nodo.dni+nombrenodoenlace
                escribirbinarioenlaces+=nodobinarioenlace+" -> "+nombrederecha+"\n"
            }
            if(nodo.derecha==null && nodo.izquierda!=null){
                var nombrenodoenlace=nodo.nombre.replace(/\s+/g,"")
                var nodobinarioenlace="nodob"+nodo.dni+nombrenodoenlace
                escribirbinarioenlaces+=this.contador+'[label="derecha" shape=box]\n'
                escribirbinarioenlaces+=nodobinarioenlace+' -> '+this.contador
                this.contador++
            }
            
        }
        return escribirbinarioenlaces
    }
}
var prueba=new ArbolBinario()
prueba.AgregarArbol(126,"dayana","dayana","nose")
prueba.AgregarArbol(122,"dayana","dayana","nose")
prueba.AgregarArbol(121,"dayana","dayana","nose")
prueba.AgregarArbol(123,"dayana","dayana","nose")
prueba.AgregarArbol(151,"dayana","dayana","nose")
prueba.AgregarArbol(180,"dayana","dayana","nose")
prueba.AgregarArbol(127,"dayana","dayana","nose")
prueba.AgregarArbol(112,"dayana","dayana","nose")
prueba.AgregarArbol(143,"dayana","dayana","nose")
prueba.AgregarArbol(125,"dayana","dayana","nose")
console.log("Preo Orden")
prueba.PreOrder()
console.log("In Orden")
prueba.InOrder()
console.log("Post Orden")
prueba.PostOrder()
console.log("codgio")
prueba.GraficarArbol()