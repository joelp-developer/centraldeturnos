
import { Request, Response } from "express"
import { Usuario } from "../entity/User"
import { validate } from "class-validator"
import { AppDataSource } from "../data-source"
import Encryptacion  from "../utils/Encryptacion"

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
        user.Contraseña = await Encryptacion.encriptar(Contrasenia);
        user.IdTipoUsuario = IdTipoUsuario;
        
        const errors = await validate(user);
        
        if(errors.length > 0) {
            return res.status(400).send(errors);
        }


        const userRepository = AppDataSource.getRepository(Usuario);
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
        const {Nombre, Apellido, Email, Telefono, Contraseña, IdTipoUsuario} = req.body;
        
        const userRepository = AppDataSource.getRepository(Usuario);
        
        //Try get user
        try {
            user = await userRepository.findOneOrFail({where:{Email: id}});
            
            user.Nombre = Nombre != undefined  ? Nombre : user.Nombre;
            user.Apellido = Apellido != undefined ? Apellido : user.Apellido;
            user.Email = Email != undefined? Email : user.Email;
            user.Telefono = Telefono != undefined ? Telefono : user.Telefono;
            user.Contraseña =  Contraseña != undefined ? await Encryptacion.encriptar(Contraseña) : user.Contraseña;
            user.IdTipoUsuario = IdTipoUsuario != undefined ? IdTipoUsuario : user.IdTipoUsuario;
        }catch(error) {
            console.log(error);
            return res.status(404).json({message:'No existen usuarios'});
        }
        
        const errors = await validate(user);
        
        if(errors.length > 0) {
            return res.status(400).send(errors);
        }
        //Try to save user
        try {
            await userRepository
            .createQueryBuilder()
            .update(Usuario)
            .set({
              Nombre: user.Nombre,
              Apellido: user.Apellido,
              Email: user.Email,
              Telefono: user.Telefono,
              Contraseña: user.Contraseña,
              IdTipoUsuario: user.IdTipoUsuario
              // No incluir idUsuario en la lista de campos a actualizar
            })
            .where('Email = :email', { email: id })
            .execute();
        }catch(error) {
            console.log(error);
            return res.status(409).json({message:'El usuario ya existe'});

        }

        res.status(201).json({message:'El usuario se actualizo correctamente'});
    }
}
export default UserController;