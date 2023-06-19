import express from 'express'
import garlandRoutes from './routes/garlands.routes.js'

const app = express()

app.use(express.json())

app.use('/api/garland',garlandRoutes)

export default app
