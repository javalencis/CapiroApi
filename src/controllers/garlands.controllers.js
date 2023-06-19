import Garland from '../models/garland.model.js'

export const findGarlands = async (req,res) =>{
    try {     
        const garlands = await Garland.find()
        res.json(garlands)
    } catch (error) {
        console.log(error)
    }
}
export const createGarland =async (req,res) =>{
    const newGarland = new Garland(req.body)
    const garlandSaved = await newGarland.save()
    res.json(garlandSaved)
}

export const updateGarland =async (req,res) =>{
    const idGarland =  req.params.id
    const garlandUpdated = await Garland.findByIdAndUpdate(idGarland,req.body,{
        new:true
    })
    res.json(garlandUpdated)
}
export const deleteGarland = async(req,res) =>{
    const garlandDelete = await Garland.findByIdAndDelete(req.params.id)
    res.json(garlandDelete)
}