"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Normal = void 0;
const pedido_1 = require("./pedido");
class Normal extends pedido_1.Pedido {
    constructor(id, precioBase, diasAprox, compania, fechaEnvio, paisSalida, estado, incremento, impuesto) {
        super(id, precioBase, diasAprox, compania, fechaEnvio, paisSalida, estado);
        this._incremento = incremento;
        this._impuesto = impuesto;
    }
    //Metodos GET
    get incremento() {
        return this._incremento;
    }
    get impuesto() {
        return this._impuesto;
    }
    costoPedido() {
        let costo;
        let imp;
        let incre;
        imp = this._impuesto;
        incre = this._incremento;
        costo = super.costoPedido();
        costo = costo + imp + incre;
        return costo;
    }
}
exports.Normal = Normal;
