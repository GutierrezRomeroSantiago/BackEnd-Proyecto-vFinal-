import { Prenda } from './prenda';

export class Calzado extends Prenda {
  protected _suela: string;
  protected _unidadesEnmercado: number;
  protected _calidad: string;
  constructor(
    id: number,
    precioXmayor: number,
    precioPublico: number,
    fechaCompra: Date,
    material: string,
    paisFabric: string,
    pedi: number,
    suela: string,
    unidadesEnmercado: number,
    calidad: string) {

    super(id, precioXmayor, precioPublico, fechaCompra, material, paisFabric, pedi)
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

  precioXmayorPrenda(): number {
    let xMayorPrenda: number
    let materiaX: string
    materiaX = this._material
    let unidadesX: number
    unidadesX = this._unidadesEnmercado
    let calidadX: string
    calidadX = this._calidad
    let suelaX = this._suela
    let preciogomaX: number = 2
    let preciosinteticaX: number = 1
    xMayorPrenda = super.precioXmayorPrenda()

    if (calidadX == "Alto") {
      xMayorPrenda = xMayorPrenda * 1.10
      if (suelaX == "Goma") {
        xMayorPrenda = xMayorPrenda + preciogomaX
      } else {
        xMayorPrenda = xMayorPrenda + preciosinteticaX
      }
    } else {
      xMayorPrenda = xMayorPrenda * 1.05
      if (suelaX == "Goma") {
        xMayorPrenda = xMayorPrenda + preciogomaX
      } else {
        xMayorPrenda = xMayorPrenda + preciosinteticaX
      }
    }
    if (unidadesX < 50) {
      xMayorPrenda = xMayorPrenda * 1.15
    }
    return xMayorPrenda
  }


  precioFinalPrenda(): number {
    let precioFinal: number
    let unidades: number
    let cali: string
    let suel: string
    let preciogoma: number = 10
    let preciosintetica: number = 5


    cali = this._calidad
    unidades = this._unidadesEnmercado
    suel = this._suela
    precioFinal = super.precioFinalPrenda()


    if (cali == "Alto") {
      precioFinal = precioFinal * 2
      if (suel == "Goma") {
        precioFinal = precioFinal + preciogoma
      } else {
        precioFinal = precioFinal + preciosintetica
      }
    } else {
      precioFinal = precioFinal * 0.75
      if (suel == "Goma") {
        precioFinal = precioFinal + preciogoma
      } else {
        precioFinal = precioFinal + preciosintetica
      }
    }
    if (unidades < 50) {
      precioFinal = precioFinal * 1.25
    }
    return precioFinal
  }


}