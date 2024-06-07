
import { Request, Response } from "express"
import { Medico } from "../entity/Medico"
import { validate } from "class-validator"
import { AppDataSource } from "../data-source"
import Encryptacion  from "../utils/Encryptacion"

class MedicoController {
    
    //get all users
    static getAll = async (req :Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(Medico);
        const users = await userRepository.find();

        if(users.length > 0) {
            res.send(users)
        }else{
            res.status(404).json({message:'No existen usuarios'});
        }
    }

    static getByID= async (req:Request,res:Response) => {
        const {id} = req.params;
        const userRepository = AppDataSource.getRepository(Medico);

        try {
            const user = await userRepository.findOneOrFail({where: {Email: id}});
            res.send(user);
        }catch(error) {
            res.status(404).json({message:'No existen usuarios'});
        }
    }

    //Cretae new user
    static newUser= async (req:Request,res:Response) => {
        const {Nombre, Apellido, Email, Telefono,idEspecialidad} = req.body;
        const user = new Medico();
        console.log(req.body)
        
        user.Nombre = Nombre;
        user.Apellido = Apellido;
        user.Email = Email;
        user.Telefono = Telefono;
        user.idEspecialidad = idEspecialidad
        
        const errors = await validate(user);
        
        if(errors.length > 0) {
            return res.status(400).send(errors);
        }


        const userRepository = AppDataSource.getRepository(Medico);
        try {
           await userRepository.save(user);            
        }catch(error) {
            return res.status(409).json({message:'El usuario ya existe'});
        }

        //all ok
        return res.send('user create');
    }

    //Update user
    static editUser= async (req:Request,res:Response) => {
        let user;
        const {id} = req.params;
        const {Nombre, Apellido, Email, Telefono, Contrasenia, IdTipoUsuario} = req.body;
        
        const userRepository = AppDataSource.getRepository(Medico);

        //Try get user
        try {
            user = await userRepository.findOneOrFail({where:{Email: id}});
            user.Nombre = Nombre;
            user.Apellido = Apellido;
            user.Email = Email;
            user.Telefono = Telefono;
            user.Contraseña = Contrasenia;
            user.IdTipoUsuario = IdTipoUsuario;
        }catch(error) {
            return res.status(404).json({message:'No existen usuarios'});
        }

        const errors = await validate(user);
        
        if(errors.length > 0) {
            return res.status(400).send(errors);
        }

        //Try to save user
        try {
            await userRepository.save(user);
        }catch(error) {
            return res.status(409).json({message:'El usuario ya existe'});
        }

        res.status(201).json({message:'El usuario se actualizo correctamente'});
    }
}
export default MedicoController;