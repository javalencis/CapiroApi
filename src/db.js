import mongoose from 'mongoose'


export async function connectDB() {
    try { 
        await mongoose.connect('mongodb://127.0.0.1:27017/capirodb')
        console.log('>> DB is connected')
    } catch (error) {
        console.log(error)
    }
}