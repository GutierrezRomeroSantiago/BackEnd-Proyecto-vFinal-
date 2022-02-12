"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calzado = void 0;
const prenda_1 = require("./prenda");
class Calzado extends prenda_1.Prenda {
    constructor(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi, suela, unidadesEnmercado, calidad) {
        super(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi);
        this._suela = suela;
        this._unidadesEnmercado = unidadesEnmercado;
        this._calidad = calidad;
    }
    //Metodos GET
    get suela() {
        return this._suela;
    }
    get unidadesEnmercado() {
        return this._unidadesEnmercado;
    }
    get calidad() {
        return this._calidad;
    }
    precioXmayorPrenda() {
        let xMayorPrenda;
        let materiaX;
        materiaX = this._material;
        let unidadesX;
        unidadesX = this._unidadesEnmercado;
        let calidadX;
        calidadX = this._calidad;
        let suelaX = this._suela;
        let preciogomaX = 2;
        let preciosinteticaX = 1;
        xMayorPrenda = super.precioXmayorPrenda();
        if (calidadX == "Alto") {
            xMayorPrenda = xMayorPrenda * 1.10;
            if (suelaX == "Goma") {
                xMayorPrenda = xMayorPrenda + preciogomaX;
            }
            else {
                xMayorPrenda = xMayorPrenda + preciosinteticaX;
            }
        }
        else {
            xMayorPrenda = xMayorPrenda * 1.05;
            if (suelaX == "Goma") {
                xMayorPrenda = xMayorPrenda + preciogomaX;
            }
            else {
                xMayorPrenda = xMayorPrenda + preciosinteticaX;
            }
        }
        if (unidadesX < 50) {
            xMayorPrenda = xMayorPrenda * 1.15;
        }
        return xMayorPrenda;
    }
    precioFinalPrenda() {
        let precioFinal;
        let unidades;
        let cali;
        let suel;
        let preciogoma = 10;
        let preciosintetica = 5;
        cali = this._calidad;
        unidades = this._unidadesEnmercado;
        suel = this._suela;
        precioFinal = super.precioFinalPrenda();
        if (cali == "Alto") {
            precioFinal = precioFinal * 2;
            if (suel == "Goma") {
                precioFinal = precioFinal + preciogoma;
            }
            else {
                precioFinal = precioFinal + preciosintetica;
            }
        }
        else {
            precioFinal = precioFinal * 0.75;
            if (suel == "Goma") {
                precioFinal = precioFinal + preciogoma;
            }
            else {
                precioFinal = precioFinal + preciosintetica;
            }
        }
        if (unidades < 50) {
            precioFinal = precioFinal * 1.25;
        }
        return precioFinal;
    }
}
exports.Calzado = Calzado;
