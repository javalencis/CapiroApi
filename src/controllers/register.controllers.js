import Register from '../models/register.model.js'


export const findRegisters = async(req,res) => {
    const registers = await Register.find()
    res.json(registers)
}


