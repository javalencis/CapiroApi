import { Schema, model } from 'mongoose'


const blockSchema = new Schema({
    bloque: {
        type: Number,
        unique:true,
        require: true
    },
    estado: {
        type: String,
        enum: ['on', 'off', 'warning'],
        default: 'off'
    }
}, {
    timestamps: true
})

export default model('Block', blockSchema)