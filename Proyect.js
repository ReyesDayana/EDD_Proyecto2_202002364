
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
        nodo.derecha=this.SRL(nodo.derecha)
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
                        '\t<td><button onclick="graficarmerkle(\''+nodo.pelicula+'\')">Alquilar</button></td>\n'+
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
        var regresar=[]
        if(nodo!=null){ 
            regresar+=this.BusquedaRecorrerInOrder(nodo.izquierda,buscar,comentario)
            if(buscar.toString()==nodo.id.toString()){
                nodo.comentarios.push(comentario)
                regresar=nodo.comentarios
                return regresar
            }
            regresar+=this.BusquedaRecorrerInOrder(nodo.derecha,buscar,comentario)
        }
        return regresar
    }
    InOrderPuntuacion(buscar,puntuacion){
        this.PuntuacionRecorrerInOrder(this.raiz,buscar,puntuacion)
    }
    PuntuacionRecorrerInOrder(nodo,buscar,puntuacion){
        if(nodo!=null){ 
            this.PuntuacionRecorrerInOrder(nodo.izquierda,buscar,puntuacion)
            if(buscar==nodo.id){
                nodo.star=puntuacion
            }
            this.PuntuacionRecorrerInOrder(nodo.derecha,buscar,puntuacion)
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
//Tabla Hash
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
        d3.select("#graficas").graphviz()

        .width(900)
        .height(500)
        .renderDot(escribirhash)
    }
}
//arbolmerkle
class NodoData{
    constructor(cliente,pelicula){
        this.cliente=cliente
        this.pelicula=pelicula
    }
}
class HashNodo{
    constructor(hash,contador){
        this.hash=hash
        this.izquierda=null
        this.derecha=null
        this.cuenta=contador
    }
}
class ArbolMerkle{
    constructor(){
        this.top=null
        this.size=0
        this.datablock=[]
        this.contador=0
    }
    add(cliente,pelicula){
        this.datablock[this.size]=new NodoData(cliente,pelicula)
        this.size++
    }
    creararbol(exp){
        this.top=new HashNodo(0,0)
        this.arbol(this.top,exp,1,1000000)
    }
    arbol(tmp,exp,cuenta,conta){
        if (exp > 0) {
            tmp.izquierda = new HashNodo(0,cuenta)
            tmp.derecha = new HashNodo(0,conta)
            cuenta++
            conta++
            this.arbol(tmp.izquierda, exp - 1,cuenta,conta+10000)
            this.arbol(tmp.derecha, exp - 1,cuenta+10000,conta)
          }
    }
    HashValores(tmp, n) {
        if (tmp != null) {
          this.HashValores(tmp.izquierda, n)
          this.HashValores(tmp.derecha, n)  
          if (tmp.izquierda == null && tmp.derecha == null) {
            tmp.izquierda = this.datablock[n-indexmerkle--]
            if(tmp.izquierda.cliente==1 && tmp.izquierda.pelicula==1){
                tmp.hash =sha256(""+1)
                tmp.izquierda.cliente=this.contador
                this.contador++
                tmp.izquierda.pelicula=this.contador
                this.contador++
            }else{
                tmp.hash =sha256(tmp.izquierda.cliente+" - "+tmp.izquierda.pelicula)
            }
          } else {
            tmp.hash = sha256(tmp.izquierda.hash+tmp.derecha.hash)
          }      
        }
      }
    auth() {
        var exp = 1
        while (Math.pow(2, exp) < this.datablock.length) {
          exp += 1
        }
        for (var i = this.datablock.length; i < Math.pow(2, exp); i++) {
          this.datablock.push(new NodoData(1,1))
        }
        indexmerkle = Math.pow(2, exp)
        this.creararbol(exp)
        this.HashValores(this.top, Math.pow(2, exp))
      }
      Graficar(){
        var graficarMerkle=""
        graficarMerkle+="digraph M { \n"
        graficarMerkle+='rankdir="BT" \n'
        graficarMerkle+="node[shape=circle] \n"
        graficarMerkle+="label= \"Arbol de Merkle\" \n"
        graficarMerkle+=this.escribirgraf(this.top)
        graficarMerkle+="} \n"
        console.log(graficarMerkle)
        d3.select("#graficamerkle").graphviz()
        .width(900)
        .height(500)
        .renderDot(graficarMerkle)
      }
      escribirgraf(tmp) {
        var escribirgraf=""
        if (tmp != null) {
          if (tmp.izquierda != null){
            if (tmp.izquierda instanceof NodoData) {
                var nodonom=tmp.izquierda.cliente.toString().replace(/\s+/g,"")
                var nodopel=tmp.izquierda.pelicula.toString().replace(/\s+/g,"")
                var nodoen=nodonom+nodopel
                var nombrehas=''+tmp.hash.substr(0,5)+tmp.cuenta+''
                if(tmp.izquierda.cliente+1==tmp.izquierda.pelicula){
                    escribirgraf +=nodoen+'[label=\"1\" shape=box]\n '
                    tmp.izquierda.cliente=1
                    tmp.izquierda.pelicula=1
                }else{
                    escribirgraf +=nodoen+'[label=\" nombre: '+tmp.izquierda.cliente+'\nPelicula: '+tmp.izquierda.pelicula+'\" shape=box]\n '
                }
               
                escribirgraf +='"'+nombrehas+'"[label=\"'+tmp.hash.substr(0,5)+'"]\n '
                escribirgraf += ''+nodoen+' -> "' +nombrehas+'"\n'
            }
          }
          if (tmp.izquierda instanceof HashNodo) {
            if (tmp.izquierda != null){
                var nombrehas=''+tmp.hash.substr(0,5)+tmp.cuenta+''
                var nombrehash=''+tmp.izquierda.hash.substr(0,5)+tmp.izquierda.cuenta+''
                escribirgraf +='"'+nombrehas+'"[label=\"'+tmp.hash.substr(0,5)+'"]\n '
                escribirgraf +='"'+nombrehash+'"[label=\"'+tmp.izquierda.hash.substr(0,5)+'"]\n '
                escribirgraf +='"'+nombrehash+'" -> "'+nombrehas+'"\n'
            } 
            if (tmp.derecha != null){
                var nombrehas=''+tmp.hash.substr(0,5)+tmp.cuenta+''
                var nombrehash=''+tmp.derecha.hash.substr(0,5)+tmp.derecha.cuenta+''
                escribirgraf +='"'+nombrehas+'"[label=\"'+tmp.hash.substr(0,5)+'"]\n '
                escribirgraf +='"'+nombrehash+'"[label=\"'+tmp.derecha.hash.substr(0,5)+'"]\n '
                escribirgraf +='"'+nombrehash+'" -> "'+nombrehas+'"\n'
            } 
          }
          escribirgraf+=this.escribirgraf(tmp.izquierda)
          escribirgraf+=this.escribirgraf(tmp.derecha)
        }
        return escribirgraf
      }
      Vaciar(){
          this.top = null
          this.datablock = []  
      }
}
//blockchain
class BloqueBC{
    constructor(id,tiempo,data,nonce,previoshash,rootmerkle,hash){
        this.id=id
        this.tiempo=tiempo
        this.data=data
        this.nonce=nonce
        this.previoshash=previoshash
        this.rootmerkle=rootmerkle
        this.hash=hash
    }
  }
  class NodoBC{
    constructor(bloque){
        this.bloque=bloque
        this.siguiente=null
        this.anterior=null
    }
  }
  class BC{
    constructor(){
        this.primero=null
        this.ultimo=null
        this.tamanio=0
    }
    
    CrearBloque(){
      var date = new Date(Date.now());
      var dia=""
      var fecha=""
      if(date.getDate()<=9){
        dia=0+""+date.getDate()
      }
      fecha=dia+"-"+date.getMonth()+1+"-"+date.getFullYear()+"-::"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
      var hashanterior = "";
      if(this.vacio()){
        hashanterior = "00"
      }else{
        hashanterior = this.ultimo.bloque.hash
      }
      merkle.auth()
      var datos= merkle.datablock;
      var guardar=""
      for (let i = nuevadata; i < datos.length; i++) {
        if(isNaN(datos[i].cliente)){
          guardar+=datos[i].pelicula+" - "+datos[i].cliente+"\n"
          nuevadata++
        } 
      }
      var rootmerkle = merkle.top.hash
      var nonce = 0;
      var hash = "";
      while(!hash.startsWith("00")){	
        hash = sha256(this.tamanio+date+hashanterior+rootmerkle+nonce);
        nonce += 1;
      } 
      var data = new BloqueBC(this.tamanio,fecha,guardar,nonce,hashanterior,rootmerkle,hash);
      this.Agregar(data)
    }
    Agregar(bloque){
      var nuevonodo=new NodoBC(bloque)
      if(this.primero==null){
        this.primero=nuevonodo
      }else{
        this.ultimo.siguiente=nuevonodo
        nuevonodo.anterior=this.ultimo
      }
      this.ultimo=nuevonodo
      this.tamanio++
    }
    vacio(){
          if(this.primero==null){
        return true
      }
      return false
      }
    Graficar(){
        var graficarblock=""
        var nodoblock=""
        var nodosiguienteblock=""
        graficarblock+="digraph B { \n"
        graficarblock+="node[shape=box] \n"
        graficarblock+="label= \"Blockchain\" \n"
        var auxiliar=this.primero
        while(auxiliar!=null){
            nodoblock = "bloque" + auxiliar.bloque.id
            graficarblock+= nodoblock + "[label=\"id: " + auxiliar.bloque.id+ "\n Hash: " + auxiliar.bloque.hash + "\n fecha: " + auxiliar.bloque.tiempo + "\n hash anterior: " + auxiliar.bloque.previoshash + "\n data: " + auxiliar.bloque.data + "\n rootmerkle: " + auxiliar.bloque.rootmerkle + "\n nonce: " + auxiliar.bloque.nonce + " \"] \n"
            auxiliar = auxiliar.siguiente
        }
      
        var aux = this.primero
        while (aux.siguiente != null) {
              nodoblock = "bloque" + aux.bloque.id
              nodosiguienteblock = "bloque" + aux.siguiente.bloque.id
              graficarblock += "{rank=same; " + nodoblock + " ->" + nodosiguienteblock + "}\n";
              aux = aux.siguiente
        }
        graficarblock += "}";
        console.log(graficarblock)
        d3.select("#bloockgrafica").graphviz()
        .width(900)
        .height(500)
        .renderDot(graficarblock)
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
            console.log("\tPrecio: "+peliculas[i].precion_Q)
            console.log("\tPaginas: "+peliculas[i].paginas)
            console.log("\tCategoria: "+peliculas[i].categoria)
            Peliculas.AgregarNodoAVL(peliculas[i].id_pelicula.toString(),peliculas[i].nombre_pelicula,peliculas[i].descripcion.toString().replace(/(\r|\n)+/g,""),peliculas[i].puntuacion_star,peliculas[i].precion_Q,peliculas[i].paginas,peliculas[i].categoria)
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
            Categorias.insertar(categorias[i].id_categoria,categorias[i].company)
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
    Categorias.GraficarTabla()
}
function SeccionPeliculas(){
    this.OcultarPelicula()
    this.OcultarActores()
    this.OcultarCategorias()
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
    this.OcultarCategorias()
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
    console.log(peliid.innerHTML)
    var user=ingreso.usernameusaurio.value
    var comenta=user+": "+coment
    var comentarios=Peliculas.BusquedaInOrder(peliid.innerHTML,comenta)
    var com=comentarios.split(",")
   var tabla=document.getElementById('tablacomentarios')
    tabla.innerHTML=""
    for (let i = 0; i < com.length; i++) {
        tabla.innerHTML+="<tr>\n"+
                        "\t<td>"+com[i]+"</td>\n"+
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
    this.OcultarCategorias()
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
function CuadroCategorias(){
    this.OcultarPeliculas()
    this.OcultarActores()
    this.OcultarPelicula()
    var cuadroactores=document.getElementById("categorias")
    cuadroactores.style.display="block"
    var tablacat=document.getElementById("tablacategorias")
    tablacat.innerHTML=""
    var recorrer=Categorias.tamanio
    for (let i = 0; i < recorrer; i++) {
        var auxiliar=Categorias.tabla[i].primero
        while(auxiliar!=null){
            tablacat.innerHTML+="<tr>\n"+
                     "\t<td>"+auxiliar.idcategoria+"</td>\n"+
                     "\t<td>"+auxiliar.company+"</td>\n"+
                    "</tr>\n"
            auxiliar=auxiliar.siguiente
        }
        
    }

}
function OcultarCategorias(){
    var cuadroactores=document.getElementById("categorias")
    cuadroactores.style.display="none"
}
function DescargarImagen() {
    var graf=document.getElementById("graficas")
    html2canvas(graf).then((canvas)=>{
        var imagen=canvas.toDataURL("image/png")
        var aux=document.createElement('a')
        aux.setAttribute("href",imagen)
        aux.setAttribute("download","grafica.png")
        aux.click()
        aux.remove()
    })
}
function Reset(){
    d3.select("#graficas").graphviz().resetZoom()
}
function graficarmerkle(pelicula){
    var nombre=ingreso.usernameusaurio.value
    merkle.add(nombre,pelicula)
    merkle.auth()
    merkle.Graficar()
}
function CuadroBlock(){
    var cuadroactores=document.getElementById("vistadmin")
    cuadroactores.style.display="none"
    var cuadroactores=document.getElementById("blockchain")
    cuadroactores.style.display="block"
    merkle.Graficar()
}
function Regresaradmin(){
    var cuadroactores=document.getElementById("blockchain")
    cuadroactores.style.display="none"
    var cuadroactores=document.getElementById("vistadmin")
    cuadroactores.style.display="block"
}
function CambiarTiempo(){
    var cambiartime=document.getElementById("tiempo")
    var time=cambiartime.value+""+0+""+0+""+0
    tiempo=parseInt(time)
    document.getElementById("tiempo").value=""
    crearbloques = setInterval(()=>{
        block.CrearBloque()  
        block.Graficar()
        merkle.Graficar()
    },tiempo)
    tiempo=10000
}
function Crear(){
    block.CrearBloque()
    block.Graficar()
}
var Usuarios = new ListaUsuarios()
Usuarios.AgregarUsuario(2354168452525,"Oscar Armin","EDD","edd@gmail.com","12345678","12345678",true)
var Actores=new ArbolBinario()
var Peliculas=new AVL()
var Categorias=new TablaHash()
var indexmerkle = 0
var merkle = new ArbolMerkle()
var block=new BC()
var tiempo = 300000
var nuevadata=0
var crearbloques = setInterval(()=>{
	block.CrearBloque()  
	block.Graficar()
    merkle.Graficar()
},tiempo)