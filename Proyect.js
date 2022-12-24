//LISTA SIMPLE
class NodoUsuario{
    constructor(dpi,nombre,usuario,correo,contra,telefono,administrador){
        this.dpi=dpi
        this.nombre=nombre
        this.usuario=usuario
        this.correo=correo
        this.contra=contra
        this.telefono=telefono
        this.administrador=administrador
        this.siguiente=null
    }
}
class ListaUsuarios{
    constructor(){
        this.primero=null
        this.ultimo=null
    }
    AgregarUsuario(dpi,nombre,usuario,correo,contra,telefono,administrador){
        var verificar=false
        var nuevousuario=new NodoUsuario(dpi,nombre,usuario,correo,contra,telefono,administrador)
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
        }
}
//ARBOL BINARIO
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
//LOGICA
//Log
function Login(){
    var cuadrologin=document.getElementById('login')
    var cuadroadmin=document.getElementById('vistadmin')
    var usuario=ingreso.usernameusaurio.value
    var contra=ingreso.contrausuario.value
    var admin=document.getElementById('checkadmin').checked
    var log=Usuarios.primero
    while(log!=null){
        if(log.usuario==usuario && log.contra==contra&& log.administrador==admin){
            cuadrologin.style.display="none"
            if(admin){
                cuadroadmin.style.display="block"
            }else{
               console.log("entrar usuario") 
            }
        }
        log=log.siguiente
    }
}
//Salir admin
function SalirAdmin(){
    var cuadrologin=document.getElementById('login')
    var cuadroadmin=document.getElementById('vistadmin')
    cuadrologin.style.display="block"
    cuadroadmin.style.display="none"
}
//Carga masivas
function LeerPeliculas(archivo){
    let file = archivo.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        var peliculas=JSON.parse(reader.result)
        for (let i = 0; i < peliculas.length; i++) {
            console.log("Información de la pelicula")
            console.log("\tID: "+peliculas[i].id_pelicula)
            console.log("\tPelicula: "+peliculas[i].nombre_pelicula)
            console.log("\tDescripcion: "+peliculas[i].descripcion)
            console.log("\tPuntuacion : "+peliculas[i].puntuacion_star)
            console.log("\tPrecio: "+peliculas[i].precio_Q)
            console.log("\tPaginas: "+peliculas[i].paginas)
            console.log("\tCategoria: "+peliculas[i].categoria)
        }
    };
    reader.onerror = function() {
      console.log(reader.error);
    };

}
function LeerClientes(archivo){
    let file = archivo.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        var clientes=JSON.parse(reader.result)
        for (let i = 0; i < clientes.length; i++) {
            console.log("Información del cleinte")
            console.log("\tDPI: "+clientes[i].dpi)
            console.log("\tNombre: "+clientes[i].nombre_completo)
            console.log("\tUser: "+clientes[i].nombre_usuario)
            console.log("\tCorreo: "+clientes[i].correo)
            console.log("\tContrasenia: "+clientes[i].contrasenia)
            console.log("\tTelefono: "+clientes[i].telefono)
        }
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
}
function LeerActores(){

}
function LeerCategorias(){

}
var Usuarios = new ListaUsuarios()
Usuarios.AgregarUsuario(2354168452525,"Oscar Armin","EDD","edd@gmail.com","12345678","12345678",true)
var Actores=new ArbolBinario()
