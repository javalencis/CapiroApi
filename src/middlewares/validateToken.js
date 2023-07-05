import jwt from 'jsonwebtoken'

export const validateToken = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.json({
            status:false,
            message:"Error en la cabecera athorization"
        })
    }


    jwt.verify(token,process.env.KEY_SECRET_TOKEN,(error,data)=>{
        if(error){
            return res.json({
                status:false,
                message:"Autenticacion denegada"
            })
        }

        req.user = data
    })
    next()
}