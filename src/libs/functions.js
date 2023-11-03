import Alert from '../models/alert.model.js'
import app from '../app.js'
export const generateAlert = async (messageReceive, garland) => {

    if (messageReceive.lectura < garland.umbral) {

        const newAlert = new Alert({
            bloque: messageReceive.bloque,
            guirnalda: messageReceive.guirnalda,
            descripcion: "problema en guirnalda"

        })
        await newAlert.save()
        app.emit('alert')
        return true
    }
    return false
}

export const generateAlertBlocks = async (messageReceive) => {
    const newAlert = new Alert({
        bloque: messageReceive.bloque,
        descripcion: "Problema bloque"
    })
    await newAlert.save()
    app.emit('alert')


}