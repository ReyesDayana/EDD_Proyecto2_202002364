const { exec } = require('node:child_process')
var fs = require('fs')
class NodoListaHash{
    constructor(idcategoria,company){
        this.idcategoria=idcategoria
        this.company=company
        this.siguiente=null
    }
}
class ListaHash{
    constructor(){
        this.primero=null
        this.tam=0
    }
    AgregarLista(idcategoria,company){
        this.tam+=1
        var nuevonodo=new NodoListaHash(idcategoria,company)
        nuevonodo.siguiente=this.primero
        this.primero=nuevonodo
        
    }
    Vacia(){
        if(this.tam==0){
            return true
        }
        return false
    }
    ImprimirLista(){
        var aux=this.primero
        while(aux!=null){
            console.log("\tId: "+aux.idcategoria+" company: "+aux.company)
            aux=aux.siguiente
        }
    }
}
class TablaHash{
    constructor(){
        this.ocupacion=0
        this.tamanio=20
        this.tabla=[]
        for (let i = 0; i < this.tamanio; i++) {
            this.tabla[i]=new ListaHash()
            
        }
    }
    insertar(idcategoria,company){
        var index=idcategoria%this.tamanio
        if(this.tabla[index].Vacia()){
            this.ocupacion+=1
        }
        this.tabla[index].AgregarLista(idcategoria,company)
        this.rehash()
    }
    rehash(){
        var ocup=this.ocupacion/this.tamanio
        if(ocup>0.75){
            var auxiliar=this.tabla
            var auxtamanio=this.tamanio
            this.tamanio=this.ocupacion*5
            this.tabla=[]
            for (let i = 0; i < this.tamanio; i++) {
                this.tabla[i]=new ListaHash()
            }
            this.ocupacion=0
            for (let y = 0; y < auxtamanio; y++) {
                if(!auxiliar[y].Vacia()){
                    var nodo=auxiliar[y].primero
                    while(nodo!=null){
                        this.insertar(nodo.idcategoria,nodo.company)
                        nodo=nodo.siguiente
                    }
                }
                
            }
        }
    }
    ImprimirTabla(){
        console.log("ocp "+this.ocupacion)
        for (let i = 0; i < this.tamanio; i++) {
            console.log("index tabla: "+i)
            this.tabla[i].ImprimirLista()
        }
    }
    GraficarTabla(){
        var escribirhash=""
        escribirhash+="digraph T { \n"
        escribirhash+="node[shape=box] \n"
        escribirhash+="label= \"Tabla Hash\" \n"
        for (let i = 0; i < this.tamanio; i++) {
            escribirhash+="nodop"+i+"[label=\" indice: "+i+"\"]\n"
            var auxiliar=this.tabla[i].primero
            while(auxiliar!=null){
                var nodonombre="nodo"+auxiliar.idcategoria
                escribirhash+=nodonombre+"[label=\" ID: "+auxiliar.idcategoria+"\nCompany: "+auxiliar.company+"\"]\n"
                auxiliar=auxiliar.siguiente
            }
        }
        for (let i = 0; i < this.tamanio; i++) {
            if(i!=this.tamanio-1){
                escribirhash+="nodop"+i+" -> nodop"+(i+1)+"\n"
            }
            var auxiliar=this.tabla[i].primero
            while(auxiliar!=null){
                var nodonombre="nodo"+auxiliar.idcategoria
                if(auxiliar==this.tabla[i].primero){
                    escribirhash+="{ rank=same nodop"+i+" -> "+nodonombre+"}\n"
                }
                if(auxiliar.siguiente!=null){
                    var nodonombresiguiente="nodo"+auxiliar.siguiente.idcategoria
                    escribirhash+="{ rank=same "+ nodonombre+" -> "+nodonombresiguiente+"}\n"
                }
                
                auxiliar=auxiliar.siguiente
            }
        }
        escribirhash+="}\n"
        fs.writeFile("Tabla.dot", escribirhash, function(err) {
            if (err) {
            return console.log(err);
            }
        exec("dot -Tpng Tabla.dot -o Tabla.png ");
        });
    }
}
var prueba=new TablaHash()
prueba.insertar(1,"valemadres")
prueba.insertar(2,"quiene")
prueba.insertar(20,"valemadres")
prueba.insertar(17,"valemadres")
prueba.insertar(21,"valemadres")
prueba.ImprimirTabla()
prueba.GraficarTabla()
