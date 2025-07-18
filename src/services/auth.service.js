import jwt from 'jsonwebtoken';
import 'dotenv/config';
import * as authorization from "../models/auth.model.js"

const secret_key = process.env.JWT_SECRET_KEY;

const default_user = {
    id: '12345',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    rol: 'admin' 
};

export const generateToken = (userData) => {
  const user = {id: userData.id, email: userData.email};
  const expiration = { expiresIn: '1h' };
  return jwt.sign(user, secret_key, expiration);
}

export async function login(email, password) {
  try{
    if (authorization.validateUser(email,password)) {
      const token = generateToken(default_user);
      return token;
    } else {
      return null;
    }
  }catch(error){
    console.log("Error en el login del usuario " + error )
    throw error;
  }
  
}

export async function register(email, password) {
  try{
   return authorization.createUser(email,password);
  }catch(error){
    console.log("Error en el login del usuario " + error )
    throw error;
  }
  
}

