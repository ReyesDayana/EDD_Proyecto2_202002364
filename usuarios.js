const { exec } = require('node:child_process')
var fs = require('fs')
class NodoUsuario{
    constructor(dpi,nombre,usuario,correo,contra,telefono){
        this.dpi=dpi
        this.nombre=nombre
        this.usuario=usuario
        this.correo=correo
        this.contra=contra
        this.telefono=telefono
        this.siguiente=null
    }
}
class ListaUsuarios{
    constructor(){
        this.primero=null
        this.ultimo=null
    }
    AgregarUsuario(dpi,nombre,usuario,correo,contra,telefono){
        var verificar=false
        var nuevousuario=new NodoUsuario(dpi,nombre,usuario,correo,contra,telefono)
        if(this.primero==null){
            this.primero=nuevousuario
            this.ultimo=nuevousuario
        }else{
            var auxiliar=this.primero
            while(auxiliar!=null){
                if(auxiliar.usuario==usuario){
                    verificar=true
                    break
                }
                auxiliar=auxiliar.siguiente
            }
            if(verificar==false){
                this.ultimo.siguiente=nuevousuario
                this.ultimo=nuevousuario
            } 
        }
        
    }
    Imprimir(){
        var aux=this.primero
        while(aux!=null){
            console.log("usuario: "+aux.nombre+" username: "+aux.usuario)
            aux=aux.siguiente
        }
    }
    GraficarLista(){
        var graficarlista=""
        var nodusuario=""
        var nodosiguienteusuario=""
        graficarlista+="digraph G { \n"
        graficarlista+="node[shape=box] \n"
        graficarlista+="label= \"Usuarios\" \n"
        var auxiliar=this.primero
        while(auxiliar!=null){
            nodusuario = "usuario" + auxiliar.usuario
            graficarlista = graficarlista + nodusuario + "[label=\"Usuario: " + auxiliar.usuario+ "\n password: " + auxiliar.contra + "\n nombre: " + auxiliar.nombre + "\n telefono: " + auxiliar.telefono + "\n DPI: " + auxiliar.dpi + " \"] \n"
            auxiliar = auxiliar.siguiente
        }
    
        var aux = this.primero
        while (aux.siguiente != null) {
            nodusuario = "usuario" + aux.usuario;
            nodosiguienteusuario = "usuario" + aux.siguiente.usuario;
            graficarlista = graficarlista + "{rank=same; " + nodusuario + " ->" + nodosiguienteusuario + "}\n";
            aux = aux.siguiente;
        }
        graficarlista += "}";
        fs.writeFile("Lista.dot", graficarlista, function(err) {
            if (err) {
            return console.log(err);
            }
        exec("dot -Tpng Lista.dot -o Lista.png ");
        });
        }
}
