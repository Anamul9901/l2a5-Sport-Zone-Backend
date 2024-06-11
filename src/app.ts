import cors from 'cors'
import express, { Application } from 'express'
import router from './app/routes'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

app.use('/api', router)

export default app
