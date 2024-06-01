import { getRepository } from "typeorm";
import {  Request, Response } from "express";
import { Usuario } from "../entity/User";

class AuthController {
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if(!(email && password)) {
            return res.status(400).json({message:'username o password ar requeride'});
        }

        const userRepository = getRepository(Usuario);

        let user: Usuario;
        try {
            user = await userRepository.findOneOrFail({where: {Email: email}});
        }catch(error) {
            console.log(error)
            return res.status(400).json({message:'username o password incorrecto'});
        }

        res.send(user);
    };
}
export default AuthController;