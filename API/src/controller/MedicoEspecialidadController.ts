
import { Request, Response } from "express"
import { MedicoEspecialidad } from "../entity/MedicoEspecialidad"
import { validate } from "class-validator"
import { AppDataSource } from "../data-source"

class MedicoEspecialidadController {
    
    //get all users
    static getAll = async (req :Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(MedicoEspecialidad);
        const users = await userRepository.find();

        if(users.length > 0) {
            res.send(users)
        }else{
            res.status(404).json({message:'No existen usuarios'});
        }
    }

    static getByID= async (req:Request,res:Response) => {
        const {id} = req.params;
        const userRepository = AppDataSource.getRepository(MedicoEspecialidad);

        try {
            const user = await userRepository.findOneOrFail({where: {idEspecialidad: parseInt( id)}});
            res.send(user);
        }catch(error) {
            res.status(404).json({message:'No existen usuarios'});
        }
    }

    //Cretae new user
    static newUser= async (req:Request,res:Response) => {
        const {Nombre, Apellido, Email, Telefono,idEspecialidad} = req.body;
        const user = new MedicoEspecialidad();
        console.log(req.body)
        
        user.Descripcion = Nombre;
        
        const errors = await validate(user);
        
        if(errors.length > 0) {
            return res.status(400).send(errors);
        }


        const userRepository = AppDataSource.getRepository(MedicoEspecialidad);
        try {
           await userRepository.save(user);            
        }catch(error) {
            return res.status(409).json({message:'El usuario ya existe'});
        }

        //all ok
        return res.send('user create');
    }
}
export default MedicoEspecialidadController;