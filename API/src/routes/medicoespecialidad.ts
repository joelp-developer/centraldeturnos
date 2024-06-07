import { Router } from "express";

import UserController from "../controller/MedicoEspecialidadController";

const routes = Router();

//Get all users
routes.get("/", UserController.getAll);

//get one user
routes.get("/:id", UserController.getByID);

//Cretae new user
routes.post("/", UserController.newUser);


export default routes;