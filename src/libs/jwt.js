import jwt from 'jsonwebtoken'

export const createAccessToken = async(payload) =>{
    return new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            process.env.KEY_SECRET_TOKEN,
            {
                expiresIn:"1d"
            }
            ,(err,token)=>{
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}