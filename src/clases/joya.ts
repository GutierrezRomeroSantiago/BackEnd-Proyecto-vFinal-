import { Prenda } from './prenda';

export class Joya extends Prenda {
  protected _quilates: number;
  protected _peso: number;
  constructor(
    id: number,
    precioXmayor: number,
    precioPublico: number,
    fechaCompra: Date,
    material: string,
    paisFabric: string,
    pedi: number,
    quilates: number,
    peso: number,
  ) {

    super(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi)
    this._quilates = quilates;
    this._peso = peso
  }
  //Metodos GET
  get quilates() {
    return this._quilates;
  }
  get peso() {
    return this._peso;
  }

  //Sobreescitura de los calculos propios de la subclase
  precioXmayorPrenda(): number {
    let xMayorPrenda: number
    let materiaX: string
    materiaX = this._material
    let quilX: number
    let pesX: number
    let precioGOX: number = 52
    let precioGPX: number = 1.2
    let precioVISX: number = 0.22

    xMayorPrenda = super.precioXmayorPrenda()
    pesX = this._peso
    quilX = this._quilates
    materiaX = this._material

    if (materiaX == "Oro") {
      xMayorPrenda = xMayorPrenda + pesX * precioGOX
      if (quilX < 25) {
        xMayorPrenda = xMayorPrenda * 0.85
      }
    } else if (materiaX == "Plata") {
      xMayorPrenda = xMayorPrenda + pesX * precioGPX
      if (quilX < 22) {
        xMayorPrenda = xMayorPrenda * 0.70
      }
    } else {
      xMayorPrenda = xMayorPrenda + pesX * precioVISX
    }
    return xMayorPrenda
  }

  precioFinalPrenda(): number {
    let precioFinal: number
    let materia: string
    let quil: number
    let pes: number
    let precioGO: number = 52
    let precioGP: number = 1.2
    let precioVIS: number = 0.22

    pes = this._peso
    quil = this._quilates
    materia = this._material
    precioFinal = super.precioFinalPrenda()


    if (materia == "Oro") {
      precioFinal = precioFinal + pes * precioGO
      if (quil < 25) {
        precioFinal = precioFinal * 0.90
      }
    } else if (materia == "Plata") {
      precioFinal = precioFinal + pes * precioGP
      if (quil < 22) {
        precioFinal = precioFinal * 0.75
      }
    } else {
      precioFinal = precioFinal + pes * precioVIS
    }
    return precioFinal
  }

}