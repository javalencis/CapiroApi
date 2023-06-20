import Alert from '../models/alert.model.js'

export const findAlerts = async(req,res)=>{
    try {
        const alerts = await Alert.find()
        res.json(alerts)
    } catch (error) {
        console.log(error)
    }
}

export const updateAlert = async (req,res)=>{
    const alertUpdated = await Alert.findByIdAndUpdate(req.params.id,req.body.estado,{
        new:true
    })
    res.json(alertUpdated)
    
}
