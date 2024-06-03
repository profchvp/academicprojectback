import prismaClient from '../../prisma'
// Define o tipo enumerado para tipoUsuario
// Defina o ENUM dentro da classe CreateUserService
enum TipoUsuario {
    P = 'P', // Pessoa
    A = 'A' // Administrador
  }
import { hash } from 'bcryptjs'
interface UserRequest {
    email: string;
    nomeUsuario: string;
    tipoUsuario: string;
    senha: string;
}
class CreateUserService {
    async execute({ email, nomeUsuario, tipoUsuario, senha }: UserRequest) {
        // Verifica se o email foi enviado
        this.verifyEmail(email);
        // Verifica se o email já está cadastrado
        const userAlreadyExists = await this.checkIfUserExists(email);
        if (userAlreadyExists) {
            return { user: null, userAlreadyExists: true }; // Retorna informação sobre o usuário já existente
            
        }
        // Cria o novo usuário
         //fazer a criptografia aqui(hash)
         const senhaHash = await hash(senha, 8)
        const user = await prismaClient.user.create({
            data: {
                userID: email,
                nomeUsuario: nomeUsuario,
                tipoUsuario: tipoUsuario as TipoUsuario, // Garante que o tipo seja do ENUM correto
                senha: senhaHash
            },
            select:{
                userID:true,
                nomeUsuario:true,
                tipoUsuario:true,
            }
        })

        // Retorna o usuário criado e a informação sobre se o usuário já existia
        return { user, userAlreadyExists: false };
    }
    private async verifyEmail(email: string) {
        if (!email) {
            throw new Error("Email deve ser informado");
        }
        // Podemos adicionar outras validações de email, se necessário
    }
    private async checkIfUserExists(email: string) {
        const userExists = await prismaClient.user.findFirst({
            where: {
                userID: email
            }
        });
        return userExists !== null;
    }
}
export { CreateUserService }
