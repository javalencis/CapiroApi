import Control from '../models/control.model.js'


export const saveControl = async (req, res) => {
    try {   

        await Control.updateMany({},{$set:{reciente:false}})

        const dataControl = {...req.body,reciente:true}

        const newControl = new Control(dataControl);
        const savedControl = await newControl.save();
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

