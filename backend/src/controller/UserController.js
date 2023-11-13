import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET
async function getUsers(req,res) {
    const users = await User.find();

    try{
        return res.status(200).json(users);
    }catch(err){
        return res.status(500).json({ msg: "Erro ao resgatar: "+ err})
    }
};   

// POST
async function createUser(req,res) {
  
    const {username,password,email} = req.body;

    // Verificar se o EMAIL já está em uso
    const sameEmail = await User.findOne({email});
    if(sameEmail){
        return res.status(400).json({msg:"Esse email já está em uso"})
    }
    
    // Verificar se o USERNAME já está em uso
    const sameUsername = await User.findOne({username});
    if(sameUsername){
        return res.status(400).json({msg: "Esse username já está em uso"})
    }

    // Verificar se o PASSWORD já está em uso 
    const samePassword = await User.findOne({password});
    if(samePassword){
        return res.status(400).json({msg: "Esse password já está em uso"})
    }

    try{
        const newUser = await User.create({email,username,password});
        return res.status(201).json({msg:"Usuario criado com sucesso."})
    }
    catch(error){
        return res.status(500).json({msg:"Não foi possivel criar usuario erro: "+ error})
    }
};  

// DELETE
async function deleteUser(req,res) {
    const id = req.params.id;

    try{
    await User.findByIdAndDelete({_id:id})
    return res.status(200).json({ msg: "Usuário deletado com sucesso!" })
    }
    catch(err){
        return res.status(400).json({ msg: "Usuário não deletado erro: " + err})
    }
};


// ROTA DE LOGIN //
async function loginUser(req, res) {
    const SECRET_KEY = process.env.SECRET_KEY;

    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      // Verificar se ele existe
      if (!user) {
        return res.status(404).json({ msg: "Email não encontrado" });
      }
  
      // Procurar Password pelo Password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(404).json({ msg: "Credencial Inválida" });
      }
  
      // Gerar token JWT se o login for autenticado
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        SECRET_KEY,
        {
          expiresIn: "1hr", // duração do token
        }
      );
  
      // Retornar token no JSON de Resposta com mensagem de sucesso
      return res.status(200).json({ msg: "Login realizado com sucesso", token, user_id: user._id });
    } catch (error) {
      res.status(500).json({ msg: "Erro no servidor " + error });
    }
  }
  

async function getUsersLogin(req,res){
    const users = await User.find();
    
    try{
        return res.status(200).json({msg:"GET REALIZADO COM SUCESSO: "+ users})
    }
    catch(error){
        console.log("Não foi possivel fazer o GET, erro: " + error)
    }
};



export{getUsers, createUser, deleteUser}; //Usuarios
export{loginUser,getUsersLogin} //Login