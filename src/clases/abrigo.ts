import { Prenda } from './prenda';

export class Abrigo extends Prenda {
  private _manga: string;
  private _cremallera: boolean;
  private _cuello: string;
  constructor(
    id: number,
    precioXmayor: number,
    precioPublico: number,
    fechaCompra: Date,
    material: string,
    paisFabric: string,
    pedi: number,
    manga: string,
    cremallera: boolean,
    cuello: string) {

    super(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi)
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
  precioXmayorPrenda(): number {
    let xMayorPrenda: number
    let materiaX: string
    materiaX = this._material
    let cremalleraX: boolean
    cremalleraX = this._cremallera
    xMayorPrenda = super.precioXmayorPrenda()

    if (materiaX == "Algodon") {
      xMayorPrenda = xMayorPrenda + 1
      if (cremalleraX == true) {
        xMayorPrenda = xMayorPrenda + 3
      } else {
        xMayorPrenda = xMayorPrenda - 0.5
      }
    } else if (materiaX == "Cuero") {
      xMayorPrenda = xMayorPrenda + 4
      if (cremalleraX == true) {
        xMayorPrenda = xMayorPrenda + 4
      } else {
        xMayorPrenda = xMayorPrenda - 2
      }
    } else {
      xMayorPrenda = xMayorPrenda + 1
      if (cremalleraX == true) {
        xMayorPrenda = xMayorPrenda + 1
      } else {
        xMayorPrenda = xMayorPrenda - 0.5
      }
    }
    return xMayorPrenda
  }

  precioFinalPrenda(): number {
    let precioFinal: number
    let materia: string
    let mang: string
    let crema: boolean
    let cue: string

    cue = this._cuello
    crema = this._cremallera
    mang = this._manga
    materia = this._material
    precioFinal = super.precioFinalPrenda()

    if ((mang == "corto") && (cue == "corto")) {
      precioFinal = precioFinal - 5
      if (crema == false) {
        precioFinal = precioFinal - 5
      }
    } else {
      precioFinal = precioFinal + 15
      if (materia == "Cuero") {
        precioFinal = precioFinal + 15
      } else {
        precioFinal = precioFinal + 5
      }
    }
    return precioFinal
  }


}