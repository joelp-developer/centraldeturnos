import * as express from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"
import * as cors from "cors"
import helmet from "helmet"



const PORT = process.env.PORT || 3000



AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();;

    //middelwares
    app.use(cors());
    app.use(helmet());

    app.use(express.json());

    //routes
    app.use(routes);

    // start express server
    app.listen(PORT,()=>console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`));

}).catch(error => console.log(error))
