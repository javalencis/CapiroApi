import Alert from '../models/alert.model.js'
import app from '../app.js'

export const findAlerts = async(req,res)=>{

    res.writeHead(200,{
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':'keep-alive'
    })

    const alerts = await Alert.find()
    res.write(`data: ${JSON.stringify(alerts)}\n\n`)
    app.on('alert',async()=>{
        const alerts = await Alert.find()
        res.write(`data: ${JSON.stringify(alerts)}\n\n`)
    })
  
}

export const updateAlert = async (req,res)=>{
    const {id,estado,edicion} = req.body
    const usuario = {
        _id: req.user.id,
        usuario: req.user.username,
        nombre:req.user.name
    }
    const alertUpdated = await Alert.findByIdAndUpdate(id,{estado,edicion,usuario},{
        new:true
    })
   
    app.emit('alert')

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
        app.emit('alert')
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