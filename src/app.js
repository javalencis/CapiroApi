import express from 'express'
import cors from 'cors'
import garlandRoutes from './routes/garlands.routes.js'
import alertRoutes from './routes/alerts.routes.js'
import registerRoutes from './routes/registers.routes.js'
import userRoutes from './routes/user.routes.js'
import morgan from 'morgan'
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/garlands',garlandRoutes)
app.use('/api/alerts',alertRoutes)
app.use('/api/registers',registerRoutes)
app.use('/api/users',userRoutes)

export default app
