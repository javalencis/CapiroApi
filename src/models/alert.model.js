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
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    estado: {
        type:Boolean,

        default:false,
        trim:true
    }
    ,
    usuario:{
        type:{
            _id:Schema.Types.ObjectId,
            usuario:String,
            nombre:String
        },
        ref: 'User',
        default:null
    }
}, {
    timestamps: true
}

)


export default model("Alert", alertSchema)