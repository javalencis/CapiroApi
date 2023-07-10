import {Schema,model} from 'mongoose'


const garlandSchema = new Schema({
    bloque:{
        type:Number,
        require:true,
        trim:true
    },
    guirnalda:{
        type:Number,
        require:true,
        trim:true
    },
    estado:{
        type:String,
        require:true,
        trim:true
    },
    num_bombillas:{
        type:Number,
        require:true,
        trim:true
    },
    umbral:{
        type:Number,
        require:true,
        trim:true
    
    }
},{
    timestamps:true
})


export default model('Garland',garlandSchema)