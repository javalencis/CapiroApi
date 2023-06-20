import { Schema, model } from 'mongoose'

const alertSchema = new Schema({
    bloque: {
        type: Number,
        require: true,
        trim: true
    },
    guirnalda: {
        type: Number,
        require: true,
        trim: true
    },
    alerta: {
        type: String,
        require: true,
        trim: true
    },
    estado: {
        type:Boolean,
        require:true,
        default:false,
        trim:true
    }
}, {
    timestamps: true
}

)


export default model("Alert", alertSchema)