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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const {username} = req.body;
    console.log(req.body);
    const listProducts = yield product_1.Product.findAll();
    ////res.json({    msg: "Get Products"},(listProducts));
    res.json(listProducts);
});
exports.getProducts = getProducts;
////////////////////////////////////////////
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // lo siguiente es desestructurar el req.body
    const { name, description } = req.body;
    console.log(name, description, req.body);
    try {
        //guardamos usuario en la base de datos
        yield product_1.Product.create({
            name: name,
            description: description
        });
        res.json({
            //msg: 'New User',
            //body: req.body en lugar de esto como esta desestructurado y segun ECMAscript 6 puedo usar
            msg: `Comentario del usuario:  ${name} creado exitosamente !`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        });
    }
    //
});
exports.newProduct = newProduct;
