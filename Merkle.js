
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
            tmp.izquierda = this.datablock[n-index--]
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
        index = Math.pow(2, exp)
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
      
}
var index = 0
var merkle = new ArbolMerkle()
function mostrar(){
    merkle.add(1,1)
    merkle.auth()
    console.log(merkle)
    merkle.Graficar()
}

