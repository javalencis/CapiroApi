import app from './app.js'
import {connectDB} from './db.js'
import {config} from 'dotenv'
import './mqtt/client.js'
config()
connectDB()
app.listen(process.env.PORT,()=>{
    console.log("Server on port",process.env.PORT)
})
