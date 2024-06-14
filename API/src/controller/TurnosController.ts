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
        
    }

    //Update user
    static editUser= async (req:Request,res:Response) => {
        
    }
}
export default TurnosController;