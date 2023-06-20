import express from 'express'
import cors from 'cors'
import garlandRoutes from './routes/garlands.routes.js'
import alertRoutes from './routes/alerts.routes.js'
import registerRoutes from './routes/registers.routes.js'


const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/garlands',garlandRoutes)
app.use('/api/alerts',alertRoutes)
app.use('/api/registers',registerRoutes)


export default app
