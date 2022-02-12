"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expres = void 0;
const pedido_1 = require("./pedido");
class Expres extends pedido_1.Pedido {
    constructor(id, precioBase, diasAprox, compania, fechaEnvio, paisSalida, estado, material, volumen, proteccion) {
        super(id, precioBase, diasAprox, compania, fechaEnvio, paisSalida, estado);
        this._material = material;
        this._volumen = volumen;
        this._proteccion = proteccion;
    }
    //Metodos GET
    get material() {
        return this._material;
    }
    get volumen() {
        return this._volumen;
    }
    get proteccion() {
        return this._proteccion;
    }
    costoPedido() {
        let costo;
        let mat;
        let vol;
        let protec;
        mat = this._material;
        vol = this._volumen;
        protec = this._proteccion;
        costo = super.costoPedido();
        if (protec == true) {
            costo = costo + 5;
        }
        if (vol > 15) {
            costo = costo + 5;
        }
        if (mat == "Carton") {
            costo = costo + 5;
        }
        return costo;
    }
}
exports.Expres = Expres;
