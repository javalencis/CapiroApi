import { Schema,model } from "mongoose";


const controlSchema = new Schema({
    hora_inicio: {
        type: String,
        default: "00:00"
    },
    hora_final: {
        type: String,
        default: "00:00"

    },
    tiempo_encendido:{
        type:Number,
        default:0,
    },
    tiempo_apagado:{
        type:Number,
        default:0
    },
    reciente:{
        type:Boolean,
        default:false
    },
    bloque:{
        type:Number,
        ref:'Block',
        required:true
    }
},
{
    timestamps:true
}
)

export default model('Control',controlSchema)
