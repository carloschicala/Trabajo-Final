import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/user";
import jwt from 'jsonwebtoken'

export const newUser = async (req:Request, res:Response) => {
    
    // lo siguiente es desestructurar el req.body
    const { username, password } = req.body;

// Validamos si el usuario ya existe en la base de datos
const user = await User.findOne({ where: { username: username }});

if(user) {
    return res.status(400).json({
        msg: `Ya existe el usuario con el nombre ${username}`
    })
}

    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log(username, password);
    console.log(hashedPassword);
    console.log(req.body);

    try {
        //guardamos usuario en la base de datos
        await User.create({
        username: username,
        password: hashedPassword
    })

    res.json({
        //msg: 'New User',
        //body: req.body en lugar de esto como esta desestructurado y segun ECMAscript 6 puedo usar
        msg: `Usuario ${username} creado exitosamente !`
    })

} catch (error) {
    res.status(400).json({
        msg: 'Upps ocurrio un error' ,
        error
    })
}
    //
}

export const loginUser = async (req:Request, res:Response) => {
    
    const { username, password } = req.body;
    
    // Validamos si el usuario existe en la base de datos

    const user: any = await User.findOne({ where: { username: username }});

    if(!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base de datos`
        })
    }

    // Validamos password

    const passwordValid = await bcrypt.compare(password, user.password)
    if(!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecta`
        })
    }


    // Generamos token

    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123')

    //Si quiero que el jwt expire luego de un tiempo entonces reemplazo lo anterior por la siguiente linea comentada
    //const token = jwt.sign({username: username}, process.env.SECRET_KEY || 'pepito123', {expiresIn: '25000'} )

    res.json(token);
}