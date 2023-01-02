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
		var rootmerkle = merkle.top.hash
        merkle.clear();
		var nonce = 0;
		var hash = "";
		while(!hash.startsWith("00")){	
			hash = sha256(this.size+date+hashanterior+rootmerkle+nonce);
			nonce += 1;
		} 
		var data = new BloqueBC(this.size,fecha,datos,nonce,hashanterior,rootmerkle,hash);
		this.insert(data)
    }
}
var prueba=new BC()
prueba.CrearBloque()