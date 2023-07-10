import Garland from '../models/garland.model.js'
import app from '../app.js'
export const findGarlands = async (req, res) => {

    res.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        'Connection':'keep-alive'
    })

    const garlands = await Garland.find()
    res.write(`data: ${JSON.stringify(garlands)}\n\n`)

    app.on('garland',async()=>{
        const garlands = await Garland.find()
        res.write(`data: ${JSON.stringify(garlands)}\n\n`)
    })


}
export const createGarland = async (req, res) => {

    try {

        const newGarland = new Garland(req.body)

        const garlandSaved = await newGarland.save()
        res.status(200).json({
            status: true,
            message: "Guirnalda creada con exito",
            garland: garlandSaved
        })
    } catch (error) {
        res.json({
            status: false,
            message: "La guirnalda no pudo ser creada",
            error
        })
    }
}

export const updateGarland = async (req, res) => {

    try {

        const idGarland = req.params.id
        const garlandUpdated = await Garland.findByIdAndUpdate(idGarland, req.body, {
            new: true
        })
        app.emit('garland')
        res.status(200).json({

            status: true,
            message: "Guirnalda actualizada",
            garland: garlandUpdated
        })
    } catch (error) {
        res.json({

            status: false,
            message: "La guirnalda no pudo ser actualizada",
            error
        })
    }
}
export const deleteGarland = async (req, res) => {
    const garlandDelete = await Garland.findByIdAndDelete(req.params.id)
    res.json(garlandDelete)
}