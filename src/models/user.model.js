import {Schema,model} from 'mongoose'


const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        require:true,
        trim:true
    },
    name:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true,
    },
    role:String,

},
{
    timestamps:true
})

export default model('User',userSchema)