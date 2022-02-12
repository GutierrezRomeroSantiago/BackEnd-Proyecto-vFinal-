"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Abrigo = void 0;
const prenda_1 = require("./prenda");
class Abrigo extends prenda_1.Prenda {
    constructor(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi, manga, cremallera, cuello) {
        super(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi);
        this._manga = manga;
        this._cremallera = cremallera;
        this._cuello = cuello;
    }
    //Metodos GET
    get manga() {
        return this._manga;
    }
    get cremallera() {
        return this._cremallera;
    }
    get cuello() {
        return this._cuello;
    }
    precioXmayorPrenda() {
        let xMayorPrenda;
        let materiaX;
        materiaX = this._material;
        let cremalleraX;
        cremalleraX = this._cremallera;
        xMayorPrenda = super.precioXmayorPrenda();
        if (materiaX == "Algodon") {
            xMayorPrenda = xMayorPrenda + 1;
            if (cremalleraX == true) {
                xMayorPrenda = xMayorPrenda + 3;
            }
            else {
                xMayorPrenda = xMayorPrenda - 0.5;
            }
        }
        else if (materiaX == "Cuero") {
            xMayorPrenda = xMayorPrenda + 4;
            if (cremalleraX == true) {
                xMayorPrenda = xMayorPrenda + 4;
            }
            else {
                xMayorPrenda = xMayorPrenda - 2;
            }
        }
        else {
            xMayorPrenda = xMayorPrenda + 1;
            if (cremalleraX == true) {
                xMayorPrenda = xMayorPrenda + 1;
            }
            else {
                xMayorPrenda = xMayorPrenda - 0.5;
            }
        }
        return xMayorPrenda;
    }
    precioFinalPrenda() {
        let precioFinal;
        let materia;
        let mang;
        let crema;
        let cue;
        cue = this._cuello;
        crema = this._cremallera;
        mang = this._manga;
        materia = this._material;
        precioFinal = super.precioFinalPrenda();
        if ((mang == "corto") && (cue == "corto")) {
            precioFinal = precioFinal - 5;
            if (crema == false) {
                precioFinal = precioFinal - 5;
            }
        }
        else {
            precioFinal = precioFinal + 15;
            if (materia == "Cuero") {
                precioFinal = precioFinal + 15;
            }
            else {
                precioFinal = precioFinal + 5;
            }
        }
        return precioFinal;
    }
}
exports.Abrigo = Abrigo;
