import app from './app.js'
import {connectDB} from './db.js'
import './mqtt/client.js'

connectDB()
app.listen(3000,()=>{
    console.log("Server on port",3000)
})
