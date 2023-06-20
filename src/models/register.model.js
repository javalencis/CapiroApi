import {Schema,model} from 'mongoose'

const registerSchema = new Schema({
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
    lectura_analogica:{
        type:Number,
        require:true
    }

},
    {
        timestamps:true
    }
)


export default model('Register',registerSchema)