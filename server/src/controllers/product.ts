import { Request, Response } from "express";
import { Product } from "../models/product";

export const getProducts = async (req: Request, res: Response) => {
    //const {username} = req.body;
    console.log(req.body);
    const listProducts = await Product.findAll();

////res.json({    msg: "Get Products"},(listProducts));

res.json(listProducts);
}
////////////////////////////////////////////

export const newProduct = async (req:Request, res:Response) => {
    
    // lo siguiente es desestructurar el req.body
    const { name, description } = req.body;

    console.log(name, description, req.body);

    try {
        //guardamos usuario en la base de datos
        await Product.create({
        name: name,
        description: description
    })

    res.json({
        //msg: 'New User',
        //body: req.body en lugar de esto como esta desestructurado y segun ECMAscript 6 puedo usar
        msg: `Comentario del usuario:  ${name} creado exitosamente !`
    })

} catch (error) {
    res.status(400).json({
        msg: 'Upps ocurrio un error' ,
        error
    })
}
    //
}
