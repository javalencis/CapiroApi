import Alert from '../models/alert.model.js'

export const findAlerts = async(req,res)=>{
    //Falta modificar para hacer Server-sent events
    try {
        const alerts = await Alert.find()
        res.json(alerts)
    } catch (error) {
        console.log(error)
    }
}

export const updateAlert = async (req,res)=>{
    const {id,estado} = req.body
    const user = {
        _id: req.user.id,
        usuario: req.user.username,
        nombre:req.user.name
    }
    const alertUpdated = await Alert.findByIdAndUpdate(id,{estado,user},{
        new:true
    })

    res.status(200).json({
        status:true,
        message:"Alerta actualizada",
        alerta:alertUpdated
    })
    
}
export const createAlert = async(req,res)=>{
  
    try {
        const newAlert = new Alert(req.body)
        const alertSaved = await newAlert.save()
        res.status(200).json({
            status:true,
            message:"Alerta agregada",
            alerta:alertSaved
        })
    } catch (error) {
        res.json({
            status:false,
            message:"Alerta no pudo ser agregada",
            error
        })
    }
}   