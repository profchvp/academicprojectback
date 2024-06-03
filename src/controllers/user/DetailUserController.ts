import { Request, Response } from "express";
import {DetailUserServices} from '../../services/user/DetailUserServices';

class DetailUserController{
async handle(req:Request, res:Response){

    const user_id = req.user_id;
 //   console.log("ID do USER: " ,user_id)

    const detailUserService = new DetailUserServices();

    const user = await detailUserService.execute(user_id);

    return res.json(user);
}
}

export {DetailUserController}
