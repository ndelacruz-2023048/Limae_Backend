import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { limiter } from '../middlewares/rate.limit.js'

const configs = (app)=>{
    app.use(express.json())
        app.use(express.urlencoded({extended: false}))
        app.use(cors(
            {
                origin: ['http://localhost:5173','https://main.d20sfomf586tvk.amplifyapp.com/'],
                credentials: true,
            }
        ))
        app.use(helmet())
        app.use(morgan('dev'))
        app.use(limiter)
}

const routes = (app)=>{

}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(e){
        console.error('Server init failed', e)
    }
}