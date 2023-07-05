import mongoose from 'mongoose'


export async function connectDB() {
    try { 
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('>> DB is connected')
    } catch (error) {
        console.log(error)
    }
}