import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Turnos {

    @PrimaryGeneratedColumn()
    idTurno: number

    @Column()
    Fecha: string

    @Column()
    Hora: string

    @Column()
    IdUsuario: number

    @Column()
    idMedico: number
    
    @Column()
    Estado: string

}
