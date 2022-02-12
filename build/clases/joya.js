"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joya = void 0;
const prenda_1 = require("./prenda");
class Joya extends prenda_1.Prenda {
    constructor(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi, quilates, peso) {
        super(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi);
        this._quilates = quilates;
        this._peso = peso;
    }
    //Metodos GET
    get quilates() {
        return this._quilates;
    }
    get peso() {
        return this._peso;
    }
    //Sobreescitura de los calculos propios de la subclase
    precioXmayorPrenda() {
        let xMayorPrenda;
        let materiaX;
        materiaX = this._material;
        let quilX;
        let pesX;
        let precioGOX = 52;
        let precioGPX = 1.2;
        let precioVISX = 0.22;
        xMayorPrenda = super.precioXmayorPrenda();
        pesX = this._peso;
        quilX = this._quilates;
        materiaX = this._material;
        if (materiaX == "Oro") {
            xMayorPrenda = xMayorPrenda + pesX * precioGOX;
            if (quilX < 25) {
                xMayorPrenda = xMayorPrenda * 0.85;
            }
        }
        else if (materiaX == "Plata") {
            xMayorPrenda = xMayorPrenda + pesX * precioGPX;
            if (quilX < 22) {
                xMayorPrenda = xMayorPrenda * 0.70;
            }
        }
        else {
            xMayorPrenda = xMayorPrenda + pesX * precioVISX;
        }
        return xMayorPrenda;
    }
    precioFinalPrenda() {
        let precioFinal;
        let materia;
        let quil;
        let pes;
        let precioGO = 52;
        let precioGP = 1.2;
        let precioVIS = 0.22;
        pes = this._peso;
        quil = this._quilates;
        materia = this._material;
        precioFinal = super.precioFinalPrenda();
        if (materia == "Oro") {
            precioFinal = precioFinal + pes * precioGO;
            if (quil < 25) {
                precioFinal = precioFinal * 0.90;
            }
        }
        else if (materia == "Plata") {
            precioFinal = precioFinal + pes * precioGP;
            if (quil < 22) {
                precioFinal = precioFinal * 0.75;
            }
        }
        else {
            precioFinal = precioFinal + pes * precioVIS;
        }
        return precioFinal;
    }
}
exports.Joya = Joya;
