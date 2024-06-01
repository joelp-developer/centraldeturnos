import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    username: "sa",
    password: "sa080393",
    database: "CentraldeTurnos",
    synchronize: false,
    logging: false,
    options: {
        encrypt: false, // Si estás utilizando Azure SQL, asegúrate de que esto esté en true
        trustServerCertificate: false // Acepta certificados auto-firmados
      },
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: [
        "src/migration/**/*.ts"
    ],
    subscribers: [
        "src/subscriber/**/*.ts"
    ]
})
