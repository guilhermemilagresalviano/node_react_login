import { Router } from "express";
import { getUsers,createUser,deleteUser} from "./controller/UserController.js";
import {loginUser,getUsersLogin} from "./controller/UserController.js";

const routes = Router();

// Rotas e Delete Usuarios
routes.get('/users', getUsers);
routes.delete('/users/:id', deleteUser);

// Create 
routes.post('/register', createUser);


// Rota Login 
routes.post('/login', loginUser);
routes.get('/api/users', getUsersLogin);


export default routes;


