import express from "express";
import dbConnect from "./database/db.js";
import routes from "./routes.js";
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers','*');
  app.use(cors());
  next();
}); 

app.use(express.json());
app.use(routes);
app.use(morgan('dev'));
dotenv.config(); 




//BANCO DE DADOS E SERVIDOR
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log("Banco de dados e Servidor Conectados! " + port);
    });
  })
  .catch((error) => console.log(error));
