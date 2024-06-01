
import { Request, Response } from "express"
import { Usuario } from "../entity/User"
import { validate } from "class-validator"
import { AppDataSource } from "../data-source"

class UserController {
    
    //get all users
    static getAll = async (req :Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(Usuario);
        const users = await userRepository.find();

        if(users.length > 0) {
            res.send(users)
        }else{
            res.status(404).json({message:'No existen usuarios'});
        }
    }

    static getByID= async (req:Request,res:Response) => {
        const {id} = req.params;
        const userRepository = AppDataSource.getRepository(Usuario);

        try {
            const user = await userRepository.findOneOrFail({where: {Email: id}});
            res.send(user);
        }catch(error) {
            res.status(404).json({message:'No existen usuarios'});
        }
    }

    //Cretae new user
    static newUser= async (req:Request,res:Response) => {
        const {Nombre, Apellido, Email, Telefono, Contrasenia, IdTipoUsuario} = req.body;
        const user = new Usuario();

        user.Nombre = Nombre;
        user.Apellido = Apellido;
        user.Email = Email;
        user.Telefono = Telefono;
        user.Contraseña = Contrasenia;
        user.IdTipoUsuario = IdTipoUsuario;
        
        const errors = await validate(user);
        
        if(errors.length > 0) {
            return res.status(400).send(errors);
        }

        //Hash password


        const userRepository = AppDataSource.getRepository(Usuario);
        try {
            const newUser = await userRepository.save(user);
            res.send(newUser);
        }catch(error) {
            res.status(409).json({message:'El usuario ya existe'});
        }

        //all ok
        res.send('user create');
    }

    //Update user
    static editUser= async (req:Request,res:Response) => {
        let user;
        const {id} = req.params;
        const {Nombre, Apellido, Email, Telefono, Contrasenia, IdTipoUsuario} = req.body;
        
        const userRepository = AppDataSource.getRepository(Usuario);

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
export default UserController;