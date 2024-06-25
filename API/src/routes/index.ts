import { Router } from "express";

import auth from "./auth";
import usuarios from "./usuarios";
import medicos from "./medico"
import especialidades from "./medicoespecialidad" 
import turnos from "./tunos"

const routes = Router();

routes.use("/auth", auth);
routes.use("/usuarios", usuarios);
routes.use("/medicos",medicos);
routes.use("/especialidades",especialidades);
routes.use("/turnos",turnos);

export default routes