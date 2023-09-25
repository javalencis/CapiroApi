import Block from '../models/block.model.js'
import client from '../mqtt/client.js'

export const findBlocks = async (req, res) => {

    try {

        const blocks = await Block.find()

        res.status(200).json({
            status:true,
            message:"Bloques encontrados",
            blocks
        })
    } catch (error) {
        res.json({
            status:false,
            message:'No se encontraron bloques',
            error
        })
    }


}

export const saveBlock = async(req,res) =>{
    const {bloque} = req.body
    try {

        const foundBlock = await Block.findOne({bloque})
        if(foundBlock){
            return res.json({
                status:false,
                message:"El bloque ya se encuentra almacenado"
            })
        }

        const newBlock = new Block(req.body)

        const blockSaved = await newBlock.save()
        res.status(200).json({
            status: true,
            message: "Bloque creado con exito",
            block: blockSaved
        })
    } catch (error) {
        res.json({
            status: false,
            message: "El bloque no pudo ser creado",
            error
        })
    }
}

export const updateBlock = async (req, res) => {

    try {

        const {bloque} = req.body

        const blockUpdated = await Block.findOneAndUpdate({bloque}, req.body, {
            new: true
        })
        const controlEsp = {
            start_time : blockUpdated.hora_inicio,
            end_time: blockUpdated.hora_final,
            on_time : blockUpdated.tiempo_encendido,
            off_time: blockUpdated.tiempo_apagado 
        }
        client.publish('capiro/bloques/control',JSON.stringify(controlEsp),(error)=>{
            console.log("No se pudo enviar el mensaje");
            console.log(error)
        })
        res.status(200).json({

            status: true,
            message: "Bloque actualizado",
            block:blockUpdated
        })
    } catch (error) {
        res.json({

            status: false,
            message: "el bloque no pudo ser actualizado",
            error
        })
    }
}