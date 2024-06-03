import { TipoUsuario } from "@prisma/client";
import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string;
    senha: string;
}

class AuthUserService {
    async execute({ email, senha }: AuthRequest) {
        //verificar se usuario existe
        const user = await prismaClient.user.findFirst({
            where: {
                userID: email
            }
        })
        if (!user) {
            throw new Error("User/Password invalido")
        }
        //precisamos verificar a senha (Lembrete: está criptografada)
        const passwordMatch = await compare(senha, user.senha)

        if (!passwordMatch){
            throw new Error("User ou Password invalido(s)")
        }
        //gerar o TOKEN para o usuário
        const token = sign(
            {
                email:user.userID
            },
            process.env.JWT_SECRET,
            {
                subject: user.userID,
                expiresIn:'30d'
            }
        )
        return {
            id:user.userID,
            nomeUsuario:user.nomeUsuario,
            TipoUsuario:user.tipoUsuario,
            token:token
         }


    }
}
export { AuthUserService }

