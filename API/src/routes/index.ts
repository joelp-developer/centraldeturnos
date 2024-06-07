import { Router } from "express";

import auth from "./auth";
import usuarios from "./usuarios";
import medicos from "./medico"
import especialidades from "./medicoespecialidad" 

const routes = Router();

routes.use("/auth", auth);
routes.use("/usuarios", usuarios);
routes.use("/medicos",medicos);
routes.use("/especialidades",especialidades);

export default routes