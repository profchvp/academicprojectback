import { NextFunction, Request, Response } from "express";

import { verify } from 'jsonwebtoken';

interface PayLoad {
    sub: string  //aqui fica o id do usuário
}
export function isAuthenticated(
    req: Request,
    res: Response,
    next: NewableFunction
) {
    //receber o TOKEN
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();//barra a requisição por falta de autorização
    }
    const [, token] = authToken.split(" ")

    try {
        //vamos validar o token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;
        //devolve o id do usuário, no "sub"
        //console.log("O usuário é: "+sub)
        //recuperar o ID do token e colocar dentro de uma variável "usuario_id" dentro do "req"
        //console.log(sub)
        req.user_id = sub;
        return next();
    } catch (err) {
        return res.status(401).end()
    }

}