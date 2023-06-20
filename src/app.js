import express from 'express'
import garlandRoutes from './routes/garlands.routes.js'
import alertRoutes from './routes/alerts.routes.js'
const app = express()

app.use(express.json())

app.use('/api/garlands',garlandRoutes)
app.use('api/alerts',alertRoutes)
export default app
