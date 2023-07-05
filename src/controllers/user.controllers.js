import { createAccessToken } from '../libs/jwt.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const register = async(req,res) =>{
    const {username,password,name,role} = req.body
    if(req.user.role !== 'admin'){
        return res.json({
            status:false,
            message:"Permiso denegado"
        })
    }


    try {
        const passwordHash = await bcrypt.hash(password,10)

        const newUser = new User({
            username,
            password:passwordHash,
            name,
            role
        })

        const userSaved = await newUser.save()

        res.status(200).json({
            status:true,
            message:"Usuario almacenado con exito",
            user:{
                username:userSaved.username,
                name:userSaved.name,
                role:userSaved.role,
                createdAt:userSaved.createdAt
            }
        })

    } catch (error) {
        res.json({
            status:false,
            message:"Error almacenando usuario",
            error
        })
    }
}
export const login = async(req,res) =>{
    const {username,password} = req.body

    try {
        const userFound = await User.findOne({username})

        const isMatch = await bcrypt.compare(password,userFound.password)
        if(!isMatch){
            return res.json({
                status:false,
                message:"Contraseña incorrecta"
            })
        }

        const token = await createAccessToken(
            {
                id:userFound._id,
                username:userFound.username,
                role:userFound.role
            })
        
        res.status(200).json({
            status:true,
            messaje:"Usuario encontrado",
            user:{
                id:userFound._id,
                username:userFound.username,
                role:userFound.role
            },
            token
        })

    } catch (error) {
        res.json({
            status:false,
            message:"Usuario o contraseña incorrecta",
            error
        })
        
    }
}
export const profile = async(req,res) =>{
    const userFound = await User.findById(req.user.id).select({password:0})

    if(!userFound){
        return res.json({
            status:false,
            message:"Usuario no encontrado",
            
        })
    }

    res.status(200).json({
        status:true,
        message:"Usuario encontrado",
        user:userFound
    })
}