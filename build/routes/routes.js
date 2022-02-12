"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
//import {Prendas, Pedidos} from '../model/schemas'
const prenda_1 = require("../model/prenda");
const pedido_1 = require("../model/pedido");
const database_1 = require("../database/database");
const nodemailer_1 = __importDefault(require("nodemailer"));
const users_1 = require("../model/users");
const prenda_2 = require("../clases/prenda");
const abrigo_1 = require("../clases/abrigo");
const calzado_1 = require("../clases/calzado");
const joya_1 = require("../clases/joya");
const normal_1 = require("../clases/normal");
const expres_1 = require("../clases/expres");
class Routes {
    constructor() {
        this.getPrends = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield prenda_1.Prendas.aggregate([
                    {
                        $lookup: {
                            from: 'pedidoxes',
                            localField: '_pedi',
                            foreignField: '_id',
                            as: "correspondiente"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getPedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield pedido_1.Pedidos.aggregate([
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "correspondencia"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getPrendita = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield prenda_1.Prendas.find({
                    _pedi: id,
                });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.postPedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _tipoPedido, _id, _precioBase, _diasAprox, _compania, _fechaEnvio, _paisSalida, _estado, _incremento, _impuesto, _material, _volumen, _proteccion } = req.body;
            yield database_1.db.conectarBD();
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
            };
            const oSchema = new pedido_1.Pedidos(dSchema);
            console.log(oSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.postPrenda = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _tipoPrenda, _id, _precioXmayor, _precioPublico, _fechaCompra, _material, _paisFabric, _pedi, _manga, _cremallera, _cuello, _suela, _unidadesEnmercado, _calidad, _quilates, _peso } = req.body;
            yield database_1.db.conectarBD();
            console.log(_tipoPrenda);
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
            };
            const oSchema = new prenda_1.Prendas(dSchema);
            console.log(oSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _user, _password } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _user: _user,
                _password: _password,
            };
            const oSchema = new pedido_1.Pedidos(dSchema);
            console.log(oSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.getPrenda = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield prenda_1.Prendas.findOne({
                    _id: id,
                });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getUnus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { usuario } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const j = yield users_1.Users.findOne({
                    _usuario: usuario,
                });
                res.json(j);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.updatePedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { precioBase, diasAprox, compania, fechaenvio, paissalida, estado, incremento, impuesto, material, volumen } = req.body;
            yield database_1.db.conectarBD();
            yield pedido_1.Pedidos.findOneAndUpdate({
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
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updateLog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            const { usi, _usuario, _password } = req.params;
            yield database_1.db.conectarBD();
            yield users_1.Users.findOneAndUpdate({ _usuario: usi }, {
                _usuario: _usuario,
                _password: _password,
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.updateEst = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            const { id, estado } = req.params;
            console.log();
            let estado1;
            if (estado == "true") {
                estado1 = false;
            }
            else {
                estado1 = true;
            }
            yield database_1.db.conectarBD();
            yield pedido_1.Pedidos.findOneAndUpdate({ _id: id }, {
                _estado: estado1,
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.deletePrenda = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            yield database_1.db.conectarBD();
            yield pedido_1.Pedidos.findOneAndDelete({ _id: _id });
            yield prenda_1.Prendas.deleteMany({ _pedi: _id })
                .then((doc) => {
                if (doc == null) {
                    res.send(`No encontrado`);
                }
                else {
                    res.send('Borrado correcto: ' + doc);
                }
            })
                .catch((err) => res.send('Error: ' + err));
            database_1.db.desconectarBD();
        });
        this.deletePedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            yield database_1.db.conectarBD();
            yield prenda_1.Prendas.findOneAndDelete({ _id: _id })
                .then((doc) => {
                if (doc == null) {
                    res.send(`No encontrado`);
                }
                else {
                    res.send('Borrado correcto: ' + doc);
                }
            })
                .catch((err) => res.send('Error: ' + err));
            database_1.db.desconectarBD();
        });
        this.sendMail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _mail, _contenido } = req.body;
            yield database_1.db.conectarBD();
            const transporter = nodemailer_1.default.createTransport({
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
            };
            console.log(mailOptions);
            transporter.sendMail(mailOptions)
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.validate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield users_1.Users.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.delus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _usuario } = req.params;
            yield database_1.db.conectarBD();
            yield users_1.Users.findOneAndDelete({ _usuario: _usuario })
                .then((doc) => {
                if (doc == null) {
                    res.send(`No encontrado`);
                }
                else {
                    res.send('Borrado correcto: ' + doc);
                }
            })
                .catch((err) => res.send('Error: ' + err));
            database_1.db.desconectarBD();
        });
        this.postUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _usuario, _password } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _usuario: _usuario,
                _password: _password
            };
            const oSchema = new users_1.Users(dSchema);
            console.log(oSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.getTotales = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let d;
            let total1 = 0;
            let total2 = 0;
            let combo = new Array();
            let tmpPrenda = new prenda_2.Prenda(0, 0, 0, d, "", "", 0);
            let countAN = 0;
            let countJN = 0;
            let countCA = 0;
            let countAE = 0;
            let countJE = 0;
            let countCE = 0;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query1 = yield pedido_1.Pedidos.aggregate([
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "_correspondencia"
                        }
                    }
                ]);
                for (let pedi of query1) {
                    //console.log(pedi._tipoPedido)
                    if (pedi._tipoPedido == "Normal") {
                        for (let hoe of pedi._correspondencia) {
                            //console.log(hoe._tipoPrenda)
                            if (hoe._tipoPrenda == "Abrigo") {
                                countAN = countAN + 1;
                            }
                            if (hoe._tipoPrenda == "Joya") {
                                countJN = countJN + 1;
                            }
                            if (hoe._tipoPrenda == "Calzado") {
                                countCA = countCA + 1;
                            }
                        }
                    }
                    else {
                        for (let hoe of pedi._correspondencia) {
                            //console.log(hoe._tipoPrenda)
                            if (hoe._tipoPrenda == "Abrigo") {
                                countAE = countAE + 1;
                            }
                            if (hoe._tipoPrenda == "Joya") {
                                countJE = countJE + 1;
                            }
                            if (hoe._tipoPrenda == "Calzado") {
                                countCE = countCE + 1;
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
                const query2 = yield pedido_1.Pedidos.aggregate([
                    { $match: { _tipoPedido: "Normal" } },
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "_correspondencia"
                        }
                    }
                ]);
                const query3 = yield pedido_1.Pedidos.aggregate([
                    { $match: { _tipoPedido: "Expres" } },
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "_correspondencia"
                        }
                    }
                ]);
                for (let peem of query2) {
                    for (let dPrenda of peem._correspondencia) {
                        if (dPrenda._tipoPrenda == "Abrigo") {
                            tmpPrenda = new abrigo_1.Abrigo(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._manga, dPrenda._cremallera, dPrenda._cuello);
                        }
                        if (dPrenda._tipoPrenda == "Calzado") {
                            tmpPrenda = new calzado_1.Calzado(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._suela, dPrenda._unidadesEnmercado, dPrenda._calidad);
                        }
                        if (dPrenda._tipoPrenda == "Joya") {
                            tmpPrenda = new joya_1.Joya(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._quilates, dPrenda._peso);
                        }
                        //console.log(tmpPrenda)
                        let cant1 = tmpPrenda.precioXmayorPrenda();
                        let cant2 = tmpPrenda.precioFinalPrenda();
                        let fin = cant2 - cant1;
                        total1 = total1 + fin;
                    }
                }
                console.log(total1);
                for (let peem of query3) {
                    for (let dPrenda1 of peem._correspondencia) {
                        if (dPrenda1._tipoPrenda == "Abrigo") {
                            tmpPrenda = new abrigo_1.Abrigo(dPrenda1._id, dPrenda1._precioXmayor, dPrenda1._precioPublico, dPrenda1._fechaCompra, dPrenda1._material, dPrenda1._paisFabric, dPrenda1._pedi, dPrenda1._manga, dPrenda1._cremallera, dPrenda1._cuello);
                        }
                        if (dPrenda1._tipoPrenda == "Calzado") {
                            tmpPrenda = new calzado_1.Calzado(dPrenda1._id, dPrenda1._precioXmayor, dPrenda1._precioPublico, dPrenda1._fechaCompra, dPrenda1._material, dPrenda1._paisFabric, dPrenda1._pedi, dPrenda1._suela, dPrenda1._unidadesEnmercado, dPrenda1._calidad);
                        }
                        if (dPrenda1._tipoPrenda == "Joya") {
                            tmpPrenda = new joya_1.Joya(dPrenda1._id, dPrenda1._precioXmayor, dPrenda1._precioPublico, dPrenda1._fechaCompra, dPrenda1._material, dPrenda1._paisFabric, dPrenda1._pedi, dPrenda1._quilates, dPrenda1._peso);
                        }
                        //console.log(tmpPrenda)
                        let cant1 = tmpPrenda.precioXmayorPrenda();
                        let cant2 = tmpPrenda.precioFinalPrenda();
                        let fin = cant2 - cant1;
                        total2 = total2 + fin;
                    }
                }
                console.log(total2);
                const dSchema = {
                    _totalAN: countAN,
                    _totalJN: countJN,
                    _totalCA: countCA,
                    _totalAE: countAE,
                    _totalJE: countJE,
                    _totalCE: countCE,
                    _total1: total1,
                    _total2: total2,
                };
                res.json(dSchema);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getDiferencias = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //const { id } = req.params
            let d;
            let costo = 0;
            let costoXM = 0;
            let ventaFin = 0;
            let dPedido;
            let tmpPedido;
            let tmpPrenda = new prenda_2.Prenda(0, 0, 0, d, "", "", 0);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield pedido_1.Pedidos.aggregate([
                    {
                        $lookup: {
                            from: 'prendaxes',
                            localField: '_id',
                            foreignField: '_pedi',
                            as: "_correspondencia"
                        }
                    }
                ]);
                for (dPedido of query) {
                    if (dPedido._tipoPedido == "Normal") {
                        tmpPedido = new normal_1.Normal(dPedido._id, dPedido._precioBase, dPedido._diasAprox, dPedido._compania, dPedido._fechaEnvio, dPedido._paisSalida, dPedido._estado, dPedido._incremento, dPedido._impuesto);
                        for (let dPrenda of dPedido._correspondencia) {
                            if (dPrenda._tipoPrenda == "Abrigo") {
                                tmpPrenda = new abrigo_1.Abrigo(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._manga, dPrenda._cremallera, dPrenda._cuello);
                            }
                            if (dPrenda._tipoPrenda == "Calzado") {
                                tmpPrenda = new calzado_1.Calzado(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._suela, dPrenda._unidadesEnmercado, dPrenda._calidad);
                            }
                            if (dPrenda._tipoPrenda == "Joya") {
                                tmpPrenda = new joya_1.Joya(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._quilates, dPrenda._peso);
                            }
                            costoXM = costoXM + tmpPrenda.precioXmayorPrenda();
                            ventaFin = ventaFin + tmpPrenda.precioFinalPrenda();
                        }
                    }
                    else {
                        tmpPedido = new expres_1.Expres(dPedido._id, dPedido._precioBase, dPedido._diasAprox, dPedido._compania, dPedido._fechaEnvio, dPedido._paisSalida, dPedido._estado, dPedido._material, dPedido._volumen, dPedido._proteccion);
                        for (let dPrenda of dPedido._correspondencia) {
                            if (dPrenda._tipoPrenda == "Abrigo") {
                                tmpPrenda = new abrigo_1.Abrigo(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._manga, dPrenda._cremallera, dPrenda._cuello);
                            }
                            if (dPrenda._tipoPrenda == "Calzado") {
                                tmpPrenda = new calzado_1.Calzado(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._suela, dPrenda._unidadesEnmercado, dPrenda._calidad);
                            }
                            if (dPrenda._tipoPrenda == "Joya") {
                                tmpPrenda = new joya_1.Joya(dPrenda._id, dPrenda._precioXmayor, dPrenda._precioPublico, dPrenda._fechaCompra, dPrenda._material, dPrenda._paisFabric, dPrenda._pedi, dPrenda._quilates, dPrenda._peso);
                            }
                            //console.log(tmpPrenda) 
                            costoXM = costoXM + tmpPrenda.precioXmayorPrenda();
                            ventaFin = ventaFin + tmpPrenda.precioFinalPrenda();
                        }
                    }
                    costo = costo + tmpPedido.costoPedido();
                }
                console.log(costo);
                console.log(costoXM);
                console.log(ventaFin);
                const dSchema = {
                    _costo: costo,
                    _costoXM: costoXM,
                    _ventaFin: ventaFin,
                };
                res.json(dSchema);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/prendap', this.getPrends),
            this._router.get('/listarprend/:id', this.getPrendita);
        this._router.get('/prenda/:id', this.getPrenda),
            this._router.get('/unus/:usuario', this.getUnus);
        this._router.post('/pedido', this.postPedido),
            this._router.post('/prendas', this.postPrenda),
            this._router.get('/pedidop', this.getPedido),
            this._router.put('/ped/:id', this.updatePedido),
            this._router.put('/actualizaUs/:usi/:_usuario/:_password', this.updateLog);
        this._router.put('/estadoUs/:id/:estado', this.updateEst);
        this._router.delete('/pedido/:_id', this.deletePrenda),
            this._router.delete('/prenda/:_id', this.deletePedido),
            this._router.post('/enviar', this.sendMail),
            this._router.get('/validar', this.validate),
            this._router.delete('/usout/:_usuario', this.delus),
            this._router.get('/grafico3', this.getTotales),
            this._router.get('/grafico4', this.getDiferencias);
        //this._router.post('/register', this.createUser),
        this._router.post('/register', this.postUser);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;
