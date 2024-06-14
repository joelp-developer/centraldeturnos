import { Router } from "express";

import UserController from "../controller/UserController";

const routes = Router();

//Get all users
routes.get("/", UserController.getAll);

//get one user
routes.get("/:id", UserController.getByID);

//Cretae new user
routes.post("/", UserController.newUser);

//Update user
routes.put("/:id", UserController.editUser);

export default routes;
