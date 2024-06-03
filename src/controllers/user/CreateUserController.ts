import { Request, response, Response } from "express";
import { CreateUserService } from '../../services/user/CreateUserService'
class CreateUserController {
    async handle(req: Request, res: Response) {
        const { email, nomeUsuario, tipoUsuario, senha } = req.body
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            email,
            nomeUsuario,
            tipoUsuario,
            senha
        });

        return res.json(user);
    }
}
export { CreateUserController }
