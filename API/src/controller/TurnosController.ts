import { Request, Response } from "express";
import { Turnos } from "../entity/Turnos";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/User";
import { Medico } from "../entity/Medico";
class TurnosController {
  //get all users
  static getAll = async (req: Request, res: Response) => {
    const turnosRepository = AppDataSource.getRepository(Turnos);
    const turnos = await turnosRepository.find();

    if (turnos.length > 0) {
      res.send(turnos);
    } else {
      res.status(404).json({ message: "No existen turnos" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const turnosRepository = AppDataSource.getRepository(Turnos);

    try {
      const turno = await turnosRepository.find({ where: { Fecha: id } });
      res.send(turno);
    } catch (error) {
      res.status(404).json({ message: "No existen usuarios" });
    }
  };

  static newTurno = async (req: Request, res: Response) => {
    const { Fecha, Hora, idUsuario, idMedico, Estado } = req.body;
    const turno = new Turnos();
    turno.Fecha = Fecha;
    turno.Hora = Hora;
    turno.IdUsuario = idUsuario;
    turno.idMedico = idMedico;
    turno.Estado = Estado;

    const tunosRepository = AppDataSource.getRepository(Turnos);
    try {
      await tunosRepository.save(turno);
    } catch (error) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    //all ok
    return res.send("turno create");
  };

  //Update user
  static editUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado } = req.body;
    console.log(id);
    console.log(estado);

    const turnosRepository = AppDataSource.getRepository(Turnos);
    try {
      await turnosRepository.update(id, { Estado: estado });
    } catch (error) {
      return res.status(409).json({ message: "El turnocon error" });
    }
    return res.send("turno update");
  };

  // get all turnos por id
  static getAllTurnosByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const turnosRepository = AppDataSource.getRepository(Turnos);
    const usuariosRepository = AppDataSource.getRepository(Usuario);
    const medicoRepository = AppDataSource.getRepository(Medico);
    try {
      const userId = parseInt(id, 10);

      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ message: "El ID del usuario debe ser un número" });
      }

      const turnos = await turnosRepository.find({
        where: { IdUsuario: userId },
      });

      if (turnos.length === 0) {
        return res
          .status(404)
          .json({ message: "No existen turnos para este usuario" });
      }

      // Obtener nombres de usuarios para cada turno
      const turnosConNombre = await Promise.all(
        turnos.map(async (turno) => {
          const usuario = await usuariosRepository.findOne({
            where: { idUsuario: turno.IdUsuario },
          });

          const medico = await medicoRepository.findOne({
            where: {
              idMedico: turno.idMedico,
            },
          });
          return {
            ...turno,
            nombreUsuario: usuario
              ? usuario.Nombre + " " + usuario.Apellido
              : "Desconocido",
            nombreMedico: medico
              ? medico.Nombre + " " + medico.Apellido
              : "Desconocido",
          };
        })
      );

      res.send(turnosConNombre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
}
export default TurnosController;
