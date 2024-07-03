import { Router } from "express";
import TurnosController from "../controller/TurnosController";

const routes = Router();

//Get all users
routes.get("/", TurnosController.getAll);

//get one user
routes.get("/:id", TurnosController.getByID);

//Cretae new user
routes.post("/", TurnosController.newTurno);

//Update user
routes.put("/:id", TurnosController.editUser);

routes.get("/allTurnos/:id", TurnosController.getAllTurnosByID);

export default routes;
