
import prismaClient from "../../prisma";
//
class DetailUserServices {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where:{
                userID:user_id
            },
            select:{
                userID:true,
                nomeUsuario:true,
                tipoUsuario:true
            }
        })
        //return {ok:true}
        return user;
    }
    

}
export { DetailUserServices }