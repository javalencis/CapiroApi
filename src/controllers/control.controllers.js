import Control from '../models/control.model.js'
import client from '../mqtt/client.js'

export const saveControl = async (req, res) => {
    const {bloque} = req.body
    try {   

        await Control.updateMany({bloque},{$set:{reciente:false}})

        const dataControl = {...req.body,reciente:true}

        const newControl = new Control(dataControl);
        const savedControl = await newControl.save();
        const date = new Date();
        
        const controlEsp = {
            start_time: savedControl.hora_inicio,
            end_time: savedControl.hora_final,
            on_time: savedControl.tiempo_encendido,
            off_time: savedControl.tiempo_apagado,
            date: date.getTime()/1000
        }
       
        client.publish("capiro/"+bloque+"/control", JSON.stringify(controlEsp), (error) => {
            if (error) {

                console.log("No se pudo enviar el mensaje");
                console.log(error)
            } 
        })


        res.status(200).json({
            status: true,
            message: "control guardado con exito",
            data: savedControl
        })
    } catch (error) {
        res.json({
            status: false,
            message: "error almacenando datos",
        })
    }
}

