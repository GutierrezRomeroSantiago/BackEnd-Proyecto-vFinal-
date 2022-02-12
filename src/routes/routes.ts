import { Request, Response, Router } from 'express'
//import {Prendas, Pedidos} from '../model/schemas'
import { Prendas, iJoya, iCalzado, iAbrigo, iPrenda } from '../model/prenda'
import { Pedidos, tPedido, iNormal, iExpres, iPedido } from '../model/pedido'
import { db } from '../database/database'
import nodemailer from 'nodemailer'
import { Users } from '../model/users'
import { Prenda } from '../clases/prenda'
import { Abrigo } from '../clases/abrigo'
import { Calzado } from '../clases/calzado'
import { Joya } from '../clases/joya'
import { Pedido } from '../clases/pedido'
import { Normal } from '../clases/normal'
import { Expres } from '../clases/expres'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router() {
        return this._router
    }

    private getPrends = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async () => {
                const query = await Prendas.aggregate([
                    {
                        $lookup: {
                            from: 'pedidoxes',
                            localField: '_pedi',
                            foreignField: '_id',
                            as: "correspondiente"
                        }
                    }
                ])
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private getPedido = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
            .then(async () => {
                const query = await Pedidos.aggregate([
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "correspondencia"
                        }
                    }
                ])
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private getPrendita = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
            .then(async () => {
                const j = await Prendas.find({
                    _pedi: id,
                })
                res.json(j)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }


    private postPedido = async (req: Request, res: Response) => {
        const { _tipoPedido, _id, _precioBase, _diasAprox, _compania, _fechaEnvio, _paisSalida, _estado, _incremento, _impuesto, _material, _volumen, _proteccion } = req.body
        await db.conectarBD()
        const dSchema = {
            _id: _id,
            _tipoPedido: _tipoPedido,
            _precioBase: _precioBase,
            _diasAprox: _diasAprox,
            _compania: _compania,
            _fechaEnvio: _fechaEnvio,
            _paisSalida: _paisSalida,
            _estado: _estado,
            _incremento: _incremento,
            _impuesto: _impuesto,
            _material: _material,
            _volumen: _volumen,
            _proteccion: _proteccion,
        }
        const oSchema = new Pedidos(dSchema)
        console.log(oSchema)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private postPrenda = async (req: Request, res: Response) => {
        const { _tipoPrenda, _id, _precioXmayor, _precioPublico, _fechaCompra, _material, _paisFabric, _pedi, _manga, _cremallera, _cuello, _suela, _unidadesEnmercado, _calidad,
            _quilates, _peso } = req.body
        await db.conectarBD()
        console.log(_tipoPrenda)
        const dSchema = {
            _tipoPrenda: _tipoPrenda,
            _id: _id,
            _precioXmayor: _precioXmayor,
            _precioPublico: _precioPublico,
            _fechaCompra: _fechaCompra,
            _material: _material,
            _paisFabric: _paisFabric,
            _pedi: _pedi,
            _manga: _manga,
            _cremallera: _cremallera,
            _cuello: _cuello,
            _suela: _suela,
            _unidadesEnmercado: _unidadesEnmercado,
            _calidad: _calidad,
            _quilates: _quilates,
            _peso: _peso
        }
        const oSchema = new Prendas(dSchema)
        console.log(oSchema)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }


    private createUser = async (req: Request, res: Response) => {
        const { _user, _password } = req.body
        await db.conectarBD()
        const dSchema = {
            _user: _user,
            _password: _password,
        }
        const oSchema = new Pedidos(dSchema)
        console.log(oSchema)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private getPrenda = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
            .then(async () => {
                const j = await Prendas.findOne({
                    _id: id,
                })
                res.json(j)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }
    private getUnus = async (req: Request, res: Response) => {
        const { usuario } = req.params
        await db.conectarBD()
            .then(async () => {
                const j = await Users.findOne({
                    _usuario: usuario,
                })
                res.json(j)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private updatePedido = async (req: Request, res: Response) => {
        const { id } = req.params
        const { precioBase, diasAprox, compania, fechaenvio, paissalida, estado, incremento, impuesto, material, volumen } = req.body
        await db.conectarBD()
        await Pedidos.findOneAndUpdate({
            _id: id,
        }, {
            _id: id,
            _precioBase: precioBase,
            _diasAprox: diasAprox,
            _compania: compania,
            _fechaEnvio: fechaenvio,
            _paisSalida: paissalida,
            _estado: estado,
            _incremento: incremento,
            _impuesto: impuesto,
            _material: material,
            _volumen: volumen
        }, {
            new: true, // para retornar el documento después de que se haya aplicado la modificación
            runValidators: true
        }
        )
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }
    private updateLog = async (req: Request, res: Response) => {
        await db.conectarBD()
        const { usi, _usuario, _password } = req.params

        await db.conectarBD()
        await Users.findOneAndUpdate(
            { _usuario: usi },
            {
                _usuario: _usuario,
                _password: _password,

            }, {
            new: true,
            runValidators: true
        })
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private updateEst = async (req: Request, res: Response) => {
        await db.conectarBD()
        const { id, estado } = req.params
        console.log()
        let estado1: boolean
        if (estado == "true") {
            estado1 = false
        } else {
            estado1 = true
        }

        await db.conectarBD()
        await Pedidos.findOneAndUpdate(
            { _id: id },
            {
                _estado: estado1,

            }, {
            new: true,
            runValidators: true
        })
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }



    private deletePrenda = async (req: Request, res: Response) => {
        const { _id } = req.params
        await db.conectarBD()
        await Pedidos.findOneAndDelete(
            { _id: _id }
        )
        await Prendas.deleteMany({ _pedi: _id })
            .then((doc: any) => {
                if (doc == null) {
                    res.send(`No encontrado`)
                } else {
                    res.send('Borrado correcto: ' + doc)
                }
            })
            .catch((err: any) => res.send('Error: ' + err))
        db.desconectarBD()
    }

    private deletePedido = async (req: Request, res: Response) => {
        const { _id } = req.params
        await db.conectarBD()
        await Prendas.findOneAndDelete(
            { _id: _id }
        )
            .then((doc: any) => {
                if (doc == null) {
                    res.send(`No encontrado`)
                } else {
                    res.send('Borrado correcto: ' + doc)
                }
            })
            .catch((err: any) => res.send('Error: ' + err))
        db.desconectarBD()
    }


    private sendMail = async (req: Request, res: Response) => {
        const { _mail, _contenido } = req.body
        await db.conectarBD()
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'angularmailproyecto@gmail.com',
                pass: '123456789Uu'
            }
        });

        const mailOptions = {
            from: "angularmailproyecto@gmail.com",
            to: _mail,
            subject: "Enviado desde la rest api de Santiago Gutiérrez Romero",
            text: _contenido
        }

        console.log(mailOptions)
        transporter.sendMail(mailOptions)
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private validate = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async () => {
                const query = await Users.find(
                    {}
                )
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private delus = async (req: Request, res: Response) => {
        const { _usuario } = req.params
        await db.conectarBD()
        await Users.findOneAndDelete(
            { _usuario: _usuario }
        )
            .then((doc: any) => {
                if (doc == null) {
                    res.send(`No encontrado`)
                } else {
                    res.send('Borrado correcto: ' + doc)
                }
            })
            .catch((err: any) => res.send('Error: ' + err))
        db.desconectarBD()
    }

    private postUser = async (req: Request, res: Response) => {
        const { _usuario, _password } = req.body
        await db.conectarBD()
        const dSchema = {
            _usuario: _usuario,
            _password: _password
        }
        const oSchema = new Users(dSchema)
        console.log(oSchema)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private getTotales = async (req: Request, res: Response) => {
        const { id } = req.params
        let d: any
        let total1: number = 0
        let total2: number = 0
        let combo = new Array<Prenda>()
        let tmpPrenda: Prenda = new Prenda(0, 0, 0, d, "", "", 0)
        let countAN: number = 0
        let countJN: number = 0
        let countCA: number = 0

        let countAE: number = 0
        let countJE: number = 0
        let countCE: number = 0

        await db.conectarBD()
            .then(async () => {
                const query1 = await Pedidos.aggregate([
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "_correspondencia"
                        }
                    }
                ])

                for (let pedi of query1) {
                    //console.log(pedi._tipoPedido)
                    if (pedi._tipoPedido == "Normal") {
                        for (let hoe of pedi._correspondencia) {
                            //console.log(hoe._tipoPrenda)
                            if (hoe._tipoPrenda == "Abrigo") {
                                countAN = countAN + 1
                            }
                            if (hoe._tipoPrenda == "Joya") {
                                countJN = countJN + 1
                            }
                            if (hoe._tipoPrenda == "Calzado") {
                                countCA = countCA + 1
                            }
                        }
                    } else {
                        for (let hoe of pedi._correspondencia) {
                            //console.log(hoe._tipoPrenda)
                            if (hoe._tipoPrenda == "Abrigo") {
                                countAE = countAE + 1
                            }
                            if (hoe._tipoPrenda == "Joya") {
                                countJE = countJE + 1
                            }
                            if (hoe._tipoPrenda == "Calzado") {
                                countCE = countCE + 1
                            }
                        }
                    }
                }
                /*const dSchema = {
                    _totalAN: countAN,
                    _totalJN: countJN,
                    _totalCA: countCA,
                    _totalAE: countAE,
                    _totalJE: countJE,
                    _totalCE: countCE,
                }*/
                //res.json(dSchema)
                const query2 = await Pedidos.aggregate([
                    { $match: { _tipoPedido: "Normal" } },
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "_correspondencia"
                        }
                    }

                ])
                const query3 = await Pedidos.aggregate([
                    { $match: { _tipoPedido: "Expres" } },
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "_correspondencia"
                        }
                    }

                ])
                for (let peem of query2) {
                    for (let dPrenda of peem._correspondencia) {
                        if (dPrenda._tipoPrenda == "Abrigo") {
                            tmpPrenda = new Abrigo(
                                dPrenda._id,
                                dPrenda._precioXmayor,
                                dPrenda._precioPublico,
                                dPrenda._fechaCompra,
                                dPrenda._material,
                                dPrenda._paisFabric,
                                dPrenda._pedi,
                                dPrenda._manga,
                                dPrenda._cremallera,
                                dPrenda._cuello)
                        }
                        if (dPrenda._tipoPrenda == "Calzado") {
                            tmpPrenda = new Calzado(
                                dPrenda._id,
                                dPrenda._precioXmayor,
                                dPrenda._precioPublico,
                                dPrenda._fechaCompra,
                                dPrenda._material,
                                dPrenda._paisFabric,
                                dPrenda._pedi,
                                dPrenda._suela,
                                dPrenda._unidadesEnmercado,
                                dPrenda._calidad)
                        }
                        if (dPrenda._tipoPrenda == "Joya") {
                            tmpPrenda = new Joya(
                                dPrenda._id,
                                dPrenda._precioXmayor,
                                dPrenda._precioPublico,
                                dPrenda._fechaCompra,
                                dPrenda._material,
                                dPrenda._paisFabric,
                                dPrenda._pedi,
                                dPrenda._quilates,
                                dPrenda._peso)
                        }
                        //console.log(tmpPrenda)
                        let cant1 = tmpPrenda.precioXmayorPrenda()
                        let cant2 = tmpPrenda.precioFinalPrenda()
                        let fin = cant2 - cant1
                        total1 = total1 + fin

                    }

                }
                console.log(total1)
                for (let peem of query3) {
                    for (let dPrenda1 of peem._correspondencia) {
                        if (dPrenda1._tipoPrenda == "Abrigo") {
                            tmpPrenda = new Abrigo(
                                dPrenda1._id,
                                dPrenda1._precioXmayor,
                                dPrenda1._precioPublico,
                                dPrenda1._fechaCompra,
                                dPrenda1._material,
                                dPrenda1._paisFabric,
                                dPrenda1._pedi,
                                dPrenda1._manga,
                                dPrenda1._cremallera,
                                dPrenda1._cuello)
                        }
                        if (dPrenda1._tipoPrenda == "Calzado") {
                            tmpPrenda = new Calzado(
                                dPrenda1._id,
                                dPrenda1._precioXmayor,
                                dPrenda1._precioPublico,
                                dPrenda1._fechaCompra,
                                dPrenda1._material,
                                dPrenda1._paisFabric,
                                dPrenda1._pedi,
                                dPrenda1._suela,
                                dPrenda1._unidadesEnmercado,
                                dPrenda1._calidad)
                        }
                        if (dPrenda1._tipoPrenda == "Joya") {
                            tmpPrenda = new Joya(
                                dPrenda1._id,
                                dPrenda1._precioXmayor,
                                dPrenda1._precioPublico,
                                dPrenda1._fechaCompra,
                                dPrenda1._material,
                                dPrenda1._paisFabric,
                                dPrenda1._pedi,
                                dPrenda1._quilates,
                                dPrenda1._peso)
                        }
                        //console.log(tmpPrenda)
                        let cant1 = tmpPrenda.precioXmayorPrenda()
                        let cant2 = tmpPrenda.precioFinalPrenda()
                        let fin = cant2 - cant1
                        total2 = total2 + fin

                    }

                }
                console.log(total2)
                const dSchema = {
                    _totalAN: countAN,
                    _totalJN: countJN,
                    _totalCA: countCA,
                    _totalAE: countAE,
                    _totalJE: countJE,
                    _totalCE: countCE,
                    _total1: total1,
                    _total2: total2,
                }
                res.json(dSchema)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private getDiferencias = async (req: Request, res: Response) => {
        //const { id } = req.params
        let d: any
        let costo: number = 0
        let costoXM: number = 0
        let ventaFin: number = 0
        let dPedido: any
        let tmpPedido: any
        let tmpPrenda: Prenda = new Prenda(0, 0, 0, d, "", "", 0)


        await db.conectarBD()
            .then(async () => {

                const query = await Pedidos.aggregate([
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "_correspondencia"
                        }
                    }
                ])

                for (dPedido of query) {
                    if (dPedido._tipoPedido == "Normal") {
                        tmpPedido = new Normal(
                            dPedido._id,
                            dPedido._precioBase,
                            dPedido._diasAprox,
                            dPedido._compania,
                            dPedido._fechaEnvio,
                            dPedido._paisSalida,
                            dPedido._estado,
                            dPedido._incremento,
                            dPedido._impuesto)
                        for (let dPrenda of dPedido._correspondencia) {
                            if (dPrenda._tipoPrenda == "Abrigo") {
                                tmpPrenda = new Abrigo(
                                    dPrenda._id,
                                    dPrenda._precioXmayor,
                                    dPrenda._precioPublico,
                                    dPrenda._fechaCompra,
                                    dPrenda._material,
                                    dPrenda._paisFabric,
                                    dPrenda._pedi,
                                    dPrenda._manga,
                                    dPrenda._cremallera,
                                    dPrenda._cuello)
                            }
                            if (dPrenda._tipoPrenda == "Calzado") {
                                tmpPrenda = new Calzado(
                                    dPrenda._id,
                                    dPrenda._precioXmayor,
                                    dPrenda._precioPublico,
                                    dPrenda._fechaCompra,
                                    dPrenda._material,
                                    dPrenda._paisFabric,
                                    dPrenda._pedi,
                                    dPrenda._suela,
                                    dPrenda._unidadesEnmercado,
                                    dPrenda._calidad)
                            }
                            if (dPrenda._tipoPrenda == "Joya") {
                                tmpPrenda = new Joya(
                                    dPrenda._id,
                                    dPrenda._precioXmayor,
                                    dPrenda._precioPublico,
                                    dPrenda._fechaCompra,
                                    dPrenda._material,
                                    dPrenda._paisFabric,
                                    dPrenda._pedi,
                                    dPrenda._quilates,
                                    dPrenda._peso)

                            }
                            costoXM = costoXM + tmpPrenda.precioXmayorPrenda()
                            ventaFin = ventaFin + tmpPrenda.precioFinalPrenda()
                        }
                    } else {
                        tmpPedido = new Expres(
                            dPedido._id,
                            dPedido._precioBase,
                            dPedido._diasAprox,
                            dPedido._compania,
                            dPedido._fechaEnvio,
                            dPedido._paisSalida,
                            dPedido._estado,
                            dPedido._material,
                            dPedido._volumen,
                            dPedido._proteccion)
                        for (let dPrenda of dPedido._correspondencia) {
                            if (dPrenda._tipoPrenda == "Abrigo") {
                                tmpPrenda = new Abrigo(
                                    dPrenda._id,
                                    dPrenda._precioXmayor,
                                    dPrenda._precioPublico,
                                    dPrenda._fechaCompra,
                                    dPrenda._material,
                                    dPrenda._paisFabric,
                                    dPrenda._pedi,
                                    dPrenda._manga,
                                    dPrenda._cremallera,
                                    dPrenda._cuello)
                            }
                            if (dPrenda._tipoPrenda == "Calzado") {
                                tmpPrenda = new Calzado(
                                    dPrenda._id,
                                    dPrenda._precioXmayor,
                                    dPrenda._precioPublico,
                                    dPrenda._fechaCompra,
                                    dPrenda._material,
                                    dPrenda._paisFabric,
                                    dPrenda._pedi,
                                    dPrenda._suela,
                                    dPrenda._unidadesEnmercado,
                                    dPrenda._calidad)
                            }
                            if (dPrenda._tipoPrenda == "Joya") {
                                tmpPrenda = new Joya(
                                    dPrenda._id,
                                    dPrenda._precioXmayor,
                                    dPrenda._precioPublico,
                                    dPrenda._fechaCompra,
                                    dPrenda._material,
                                    dPrenda._paisFabric,
                                    dPrenda._pedi,
                                    dPrenda._quilates,
                                    dPrenda._peso)
                            }
                            //console.log(tmpPrenda) 
                            costoXM = costoXM + tmpPrenda.precioXmayorPrenda()
                            ventaFin = ventaFin + tmpPrenda.precioFinalPrenda()
                        }
                    }
                    costo = costo + tmpPedido.costoPedido()
                }
                console.log(costo)
                console.log(costoXM)
                console.log(ventaFin)

                const dSchema = {
                    _costo: costo,
                    _costoXM: costoXM,
                    _ventaFin: ventaFin,
                }
                res.json(dSchema)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }



    misRutas() {
        this._router.get('/prendap', this.getPrends),

        this._router.get('/listarprend/:id', this.getPrendita)

        this._router.get('/prenda/:id', this.getPrenda),

        this._router.get('/unus/:usuario', this.getUnus)

        this._router.post('/pedido', this.postPedido),

        this._router.post('/prendas', this.postPrenda),

        this._router.get('/pedidop', this.getPedido),

        this._router.put('/ped/:id', this.updatePedido),

        this._router.put('/actualizaUs/:usi/:_usuario/:_password', this.updateLog)

        this._router.put('/estadoUs/:id/:estado', this.updateEst)

        this._router.delete('/pedido/:_id', this.deletePrenda),

        this._router.delete('/prenda/:_id', this.deletePedido),

        this._router.post('/enviar', this.sendMail),

        this._router.get('/validar', this.validate),

        this._router.delete('/usout/:_usuario', this.delus),

        this._router.get('/grafico3', this.getTotales),

        this._router.get('/grafico4', this.getDiferencias)
        //this._router.post('/register', this.createUser),
        this._router.post('/register', this.postUser)
    }

}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router