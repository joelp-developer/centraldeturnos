import { Request, Response } from "express"
import { Turnos } from "../entity/Turnos";
import { AppDataSource } from "../data-source";


class TurnosController {
    
    //get all users
    static getAll = async (req :Request, res: Response) => {
        const turnosRepository = AppDataSource.getRepository(Turnos);
        const turnos = await turnosRepository.find();

        if(turnos.length > 0) {
            res.send(turnos)
        }else{
            res.status(404).json({message:'No existen turnos'});
        }
        
    }

    static getByID= async (req:Request,res:Response) => {
        const {id} = req.params;
        const turnosRepository = AppDataSource.getRepository(Turnos);

        try {
            const turno = await turnosRepository.find({where: {Fecha: id}});
            res.send(turno);
        }catch(error) {
            res.status(404).json({message:'No existen usuarios'});
        }
    }

    
    static newTurno= async (req:Request,res:Response) => {
        const {Fecha, Hora,idUsuario,idMedico,Estado} = req.body;
        const turno = new Turnos();        
        turno.Fecha = Fecha;
        turno.Hora = Hora;
        turno.IdUsuario = idUsuario;
        turno.idMedico = idMedico;
        turno.Estado = Estado;
        
        const tunosRepository = AppDataSource.getRepository(Turnos);
        try {
           await tunosRepository.save(turno);            
        }catch(error) {
            return res.status(409).json({message:'El usuario ya existe'});
        }

        //all ok
        return res.send('turno create');
    }

    //Update user
    static editUser= async (req:Request,res:Response) => {
        
    }
}
export default TurnosController;