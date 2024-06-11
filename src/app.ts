import cors from 'cors'
import express, { Application } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middlwares/globalErrorHandler'
import notFound from './app/middlwares/notFound'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

app.use('/api', router)

app.use(globalErrorHandler);

//not Found
app.use(notFound);


export default app
