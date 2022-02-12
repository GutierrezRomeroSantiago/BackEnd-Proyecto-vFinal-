export class Prenda {
    protected _id: number;
    protected _precioXmayor: number;
    protected _precioPublico: number;
    private _fechaCompra: Date;
    protected _material: string;
    private _paisFabric: string;
    private _pedi: number;

    constructor(
        id: number,
        precioXmayor: number, 
        precioPublico: number, 
        fechaCompra:Date, 
        material:string, 
        paisFabric:string,
        pedi:number) {
        
        this._id = id;
        this._precioXmayor = precioXmayor;
        this._precioPublico = precioPublico;
        this._fechaCompra = fechaCompra;
        this._material = material;
        this._paisFabric = paisFabric;
        this._pedi = pedi;
    }
    
    // Metodos GET
get id() { 
    return this._id;
}
get precioXmayor() {
    return this._precioXmayor;
}
get precioPublico() {
    return this._precioPublico;
}
get fechaCompra() {
    return this._fechaCompra;
}
get material() {
    return this._material
}
get paisFabric() {
    return this._paisFabric;
}
get pedi() {
    return this._pedi;
}

// Calculos correspondientes a la clase PRENDA:

    // Calculo para conocer el precio al por mayor de cada prenda

    precioXmayorPrenda(): number {
        let xMayorPrenda: number
        xMayorPrenda = this._precioXmayor*1.08
        return xMayorPrenda
    }
    
        // Calculo para modificar el precio de los productos en función de su pais de origen
        // si el pais de origen es diferente a España se aplicara una cantidad de IVA mayor
    
    precioFinalPrenda(): number {
        let precioFinal: number
    
        if (this._paisFabric == "España") {
            precioFinal=this._precioPublico*1.21
        } else {
            precioFinal=this._precioPublico*1.30
        }
        return precioFinal
        }


}