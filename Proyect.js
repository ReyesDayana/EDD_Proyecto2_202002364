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
        d3.select("#graficas").graphviz()
        .width(900)
        .height(500)
        .renderDot(graficarlista)
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
            }else if(nodo.dni>dni){
                nodo.izquierda= this.Insertar(dni,nombre,correo,descripcion,nodo.izquierda)
            }else{
                console.log("no se puede agregar")
            }
        }
        return nodo
    }
    PreOrder(){
        var recorrido=this.RecorrerPreOrder(this.raiz)
        return recorrido
    }
    RecorrerPreOrder(nodo){
        var escribir=""
        if(nodo!=null){
            escribir+="\n"
            escribir+=
                    "<tr>\n"+
                        "\t<td>"+nodo.dni+"</td>\n"+
                        "\t<td>"+nodo.nombre+"</td>\n"+
                        "\t<td>"+nodo.correo+"</td>\n"+
                        "\t<td>"+nodo.descripcion+" estrellas</td>\n"+
                    "</tr>\n"
            escribir+="\n"
            var izquierda=this.RecorrerPreOrder(nodo.izquierda)
            if(izquierda!=undefined){
                escribir+=izquierda
            }
            var derecha=this.RecorrerPreOrder(nodo.derecha)
            if(derecha!=undefined){
                escribir+=derecha
            }
        }
        return escribir
    }
    InOrder(){
        var recorrido=this.RecorrerInOrder(this.raiz)
        return recorrido
    }
    RecorrerInOrder(nodo){
        var escribir=""
        if(nodo!=null){
            var izquierda=this.RecorrerInOrder(nodo.izquierda)
            if(izquierda!=undefined){
                escribir+=izquierda
            }
            escribir+=
                    "<tr>\n"+
                        "\t<td>"+nodo.dni+"</td>\n"+
                        "\t<td>"+nodo.nombre+"</td>\n"+
                        "\t<td>"+nodo.correo+"</td>\n"+
                        "\t<td>"+nodo.descripcion+" estrellas</td>\n"+
                    "</tr>\n"
            escribir+="\n"
            var derecha=this.RecorrerInOrder(nodo.derecha)
            if(derecha!=undefined){
                escribir+=derecha
            }
        }
        return escribir
    }
    PostOrder(){
        var recorrido=this.RecorrerPostOrder(this.raiz)
        return recorrido
    }
    RecorrerPostOrder(nodo){
        var escribir=""
        if(nodo!=null){
            var izquierda=this.RecorrerPostOrder(nodo.izquierda)
            if(izquierda!=undefined){
                escribir+=izquierda
            }
            var derecha=this.RecorrerPostOrder(nodo.derecha)
            if(derecha!=undefined){
                escribir+=derecha
            }
            escribir+=
                    "<tr>\n"+
                        "\t<td>"+nodo.dni+"</td>\n"+
                        "\t<td>"+nodo.nombre+"</td>\n"+
                        "\t<td>"+nodo.correo+"</td>\n"+
                        "\t<td>"+nodo.descripcion+" estrellas</td>\n"+
                    "</tr>\n"
            escribir+="\n"
        }
        return escribir
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
        d3.select("#graficas").graphviz()
        .width(900)
        .height(500)
        .renderDot(graficarbinario)

    }
    EscribirNodos(nodo){
        var escribirnodosbinario=""
        var nodobinario=""
        var nodobinarionombre=""
        if(nodo!=null){
            nodobinarionombre=nodo.nombre.replace(/\s+/g,"")
            nodobinario="nodob"+nodo.dni+nodobinarionombre
            escribirnodosbinario+=nodobinario+"[label=\" Artista: "+nodo.nombre+"\nDni: "+nodo.dni+"\"]\n";
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
//Arbol avl
class NodoAVL{
    constructor(id,pelicula,descripcion,star,precio,paginas,categoria){
        this.id=id
        this.pelicula=pelicula
        this.descripcion=descripcion
        this.star=star
        this.precio=precio
        this.paginas=paginas
        this.categoria=categoria
        this.comentarios=[]
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
    InOrder(){
        var recorrido=this.RecorrerInOrder(this.raiz)
        return recorrido
    }
    RecorrerInOrder(nodo){
        var escribir=""
        if(nodo!=null){

            var izquierda=this.RecorrerInOrder(nodo.izquierda)
            if(izquierda!=undefined){
                escribir+=izquierda
            }
            escribir+="\n"
            escribir+=
                    "<tr>\n"+
                        "\t<td>"+nodo.pelicula+"</td>\n"+
                        "\t<td>"+nodo.descripcion+"</td>\n"+
                        "\t<td>"+nodo.precio+"</td>\n"+
                        "\t<td>"+nodo.star+" estrellas</td>\n"+
                        '\t<td><button onclick="SeccionPelicula(\''+nodo.id+'\',\''+nodo.pelicula+'\',\''+nodo.descripcion+'\',\''+nodo.star+'\',\''+nodo.precio+'\',\''+nodo.comentarios+'\')">Ver informacion</button></td>\n'+
                        "\t<td><button>Alquilar</button></td>\n"+
                    "</tr>\n"
            escribir+="\n"
            var derecha=this.RecorrerInOrder(nodo.derecha)
            if(derecha!=undefined){
                escribir+=derecha
            }
        }
        return escribir
    }
    BusquedaInOrder(buscar,comentario){
        var regreso=this.BusquedaRecorrerInOrder(this.raiz,buscar,comentario)
        return regreso
    }
    BusquedaRecorrerInOrder(nodo,buscar,comentario){
        if(nodo!=null){ 
            this.BusquedaRecorrerInOrder(nodo.izquierda)
            if(buscar==nodo.id){
                nodo.comentarios.push(comentario)
                return nodo.comentarios
            }
            this.BusquedaRecorrerInOrder(nodo.derecha)
        }
        return "noseencontro"
    }
    InOrderPuntuacion(buscar,puntuacion){
        this.PuntuacionRecorrerInOrder(this.raiz,buscar,puntuacion)
    }
    PuntuacionRecorrerInOrder(nodo,buscar,puntuacion){
        if(nodo!=null){ 
            this.PuntuacionRecorrerInOrder(nodo.izquierda)
            if(buscar==nodo.id){
                nodo.star=puntuacion
            }
            this.PuntuacionRecorrerInOrder(nodo.derecha)
        }
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
        d3.select("#graficas").graphviz()
        .width(900)
        .height(500)
        .renderDot(graficaravl)

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
//LOGICA
//Log
function Login(){
    var cuadrologin=document.getElementById('login')
    var cuadroadmin=document.getElementById('vistadmin')
    var navusuario=document.getElementById('navuser')
    var cuadripel=document.getElementById('peliculas')
    var cuadrouser=document.getElementById('usuario')
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
               navusuario.style.display="block"
               cuadripel.style.display="block"
               cuadrouser.style.display="block"
               this.SeccionPeliculas()
            }
        }
        log=log.siguiente
    }
}
//Registro
function Registro(){
    var mensaje=document.getElementById('mnsje')
    var cuadrologin=document.getElementById('login')
    var cuadroregs=document.getElementById('registro')
    cuadrologin.style.display="none"
    cuadroregs.style.display="block"
    mensaje.style.display="none"
}
function RegresarLog(){
    var cuadrologin=document.getElementById('login')
    var cuadroregs=document.getElementById('registro')
    cuadrologin.style.display="block"
    cuadroregs.style.display="none"
}
function Registrar(){
    var nc=registar.nombreregistro.value
    var user=registar.usernameregistro.value
    var correo=registar.correoregistro.value
    var dpi=registar.dpi.value
    var telefonoregistro=registar.Telefono.value
    var contraregistro=registar.contrareg.value
    Usuarios.AgregarUsuario(dpi,nc,user,correo,contraregistro,telefonoregistro,false)
    Usuarios.Imprimir()
    mensaje.style.display="block"
    
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
            Peliculas.AgregarNodoAVL(peliculas[i].id_pelicula,peliculas[i].nombre_pelicula,peliculas[i].descripcion,peliculas[i].puntuacion_star,peliculas[i].precio_Q,peliculas[i].paginas,peliculas[i].categoria)
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
            Usuarios.AgregarUsuario(clientes[i].dpi,clientes[i].nombre_completo,clientes[i].nombre_usuario,clientes[i].correo,clientes[i].contrasenia,clientes[i].telefono,false)
        }
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
}
function LeerActores(archivo){
    let file = archivo.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        var actores=JSON.parse(reader.result)
        for (let i = 0; i < actores.length; i++) {
            console.log("Información del cleinte")
            console.log("\tDNI: "+actores[i].dni)
            console.log("\tNombre: "+actores[i].nombre_actor)
            console.log("\tCorreo: "+actores[i].correo)
            console.log("\tdescripcion: "+actores[i].descripcion)
            Actores.AgregarArbol(actores[i].dni,actores[i].nombre_actor,actores[i].correo,actores[i].descripcion)
        }
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
}
function LeerCategorias(archivo){
    let file = archivo.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        var categorias=JSON.parse(reader.result)
        for (let i = 0; i < categorias.length; i++) {
            console.log("Información del cleinte")
            console.log("\tID: "+categorias[i].id_categoria)
            console.log("\tCompañia: "+categorias[i].company)
        }
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
}
//Mostrar Graficas
function MostrarPeliculas(){
    Peliculas.GraficarAVL()
}
function MostrarClientes(){
    Usuarios.GraficarLista()
}
function MostrarActores(){
    Actores.GraficarArbol()
}
function MostrarCategorias(){

}
function SeccionPeliculas(){
    this.OcultarPelicula()
    this.OcultarActores()
    var cuadripel=document.getElementById('peliculas')
    cuadripel.style.display="block"
    var tablapeli=document.getElementById('tabladepeliculas')
    tablapeli.innerHTML=""
    tablapeli.innerHTML+=Peliculas.InOrder()
}
function OcultarPeliculas(){
    var cuadripel=document.getElementById('peliculas')
    cuadripel.style.display="none"
}
function SalirUsuario(){
    var cuadrologin=document.getElementById('login')
    var nav=document.getElementById('usuario')
    cuadrologin.style.display="block"
    nav.style.display="none"

}
function SeccionPelicula(id,pelicula,descripcion,puntuacion,precio,comentarios){
    this.OcultarPeliculas()
    this.OcultarActores()
    var idpeli=document.getElementById('idpel')
    idpeli.innerHTML=id
    var pel=document.getElementById('pelicula')
    pel.style.display="block"
    var titulo=document.getElementById('titulopel')
    titulo.innerHTML=pelicula
    var des=document.getElementById('descripcionpel')
    des.innerHTML="<b>Descripcion: </b>"+descripcion
    var punt=document.getElementById('puntuacion')
    punt.innerHTML="<b>Puntuacion: </b>"+puntuacion+" estrellas"
    var price=document.getElementById('precio')
    price.innerHTML="<b>Precio: </b>"+precio
    var tabla=document.getElementById('tablacomentarios')
    var coments=comentarios.split(",")
    tabla.innerHTML=""
    for (let i = 0; i < coments.length; i++) {
        tabla.innerHTML+="<tr>\n"+
                        "\t<td>"+coments[i]+"</td>\n"+
                    "</tr>\n"
    }

}
function AgregarComentario(){
    var comenta=document.getElementById("comentario")
    var coment=comenta.value
    var peliid=document.getElementById("idpel")
    var user=ingreso.usernameusaurio.value
    var comenta=user+": "+coment
    var comentarios=Peliculas.BusquedaInOrder(peliid.innerHTML,comenta)
    var tabla=document.getElementById('tablacomentarios')
    tabla.innerHTML=""
    for (let i = 0; i < comentarios.length; i++) {
        tabla.innerHTML+="<tr>\n"+
                        "\t<td>"+comentarios[i]+"</td>\n"+
                    "</tr>\n"
    }
    document.getElementById("comentario").value=""
}
function RegresarPeliculas(){
    var pel=document.getElementById('pelicula')
    pel.style.display="none"
    this.SeccionPeliculas()
}
function OcultarPelicula(){
    var pel=document.getElementById('pelicula')
    pel.style.display="none"
    
}
function ModificarEstrellas(){
    var punt=document.getElementById("estrellas")
    var star=punt.value
    var peliid=document.getElementById("idpel")
    Peliculas.InOrderPuntuacion(peliid.innerHTML,star)
    var puntua=document.getElementById('puntuacion')
    puntua.innerHTML="<b>Puntuacion: </b>"+star+" estrellas"
    document.getElementById("estrellas").value=""
}
function MostrarcuadroActores(){
    this.OcultarPelicula()
    this.OcultarPeliculas()
    var cuadroactores=document.getElementById("actores")
    cuadroactores.style.display="block"
    var tablaactores=document.getElementById("tabladeactores")
    tablaactores.innerHTML=""
    tablaactores.innerHTML=Actores.PreOrder()
}
function InOrderActores(){
    var tablaactores=document.getElementById("tabladeactores")
    tablaactores.innerHTML=""
    tablaactores.innerHTML=Actores.InOrder()
}
function PostOrderActores(){
    var tablaactores=document.getElementById("tabladeactores")
    tablaactores.innerHTML=""
    tablaactores.innerHTML=Actores.PostOrder()
}
function OcultarActores(){
    var cuadroactores=document.getElementById("actores")
    cuadroactores.style.display="none"
}
var Usuarios = new ListaUsuarios()
Usuarios.AgregarUsuario(2354168452525,"Oscar Armin","EDD","edd@gmail.com","12345678","12345678",true)
Usuarios.AgregarUsuario(3533294870101,"dayana","dayana","dayana@gmail.com","dayana","12345678",false)
var Actores=new ArbolBinario()
var Peliculas=new AVL()
Peliculas.AgregarNodoAVL("2","hbrvh","dkfhvbjhdfbvjhfb",3,480,12,"nose")
