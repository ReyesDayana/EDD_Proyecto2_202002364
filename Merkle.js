
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
        while (Math.pow(2, exp) < this.size) {
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
var indexmerkle = 0
var merkle = new ArbolMerkle()
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
    console.log("QUE ES ESTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    console.log(nuevadata)
    console.log(datos.length)
      for (let i = nuevadata; i < datos.length; i++) {
        if(isNaN(datos[i].cliente)){
          guardar+=datos[i].pelicula+" - "+datos[i].cliente+"\n"
        } 
        nuevadata=nuevadata+1
      }
    var rootmerkle = merkle.top.hash
    merkle.Vaciar()
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
  }
}
var block=new BC()
var tiempo = 10000
var nuevadata=0
var as = setInterval(()=>{

	block.CrearBloque();  
	console.log(block)
	
},tiempo)
function mostrar(){
  block.Graficar()
}