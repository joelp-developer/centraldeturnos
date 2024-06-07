import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Medico{
    @PrimaryGeneratedColumn()
    idMedico: number

    @Column()
    Nombre: string

    @Column()
    Apellido: string
    
    @Column()
    Email: string

    @Column()
    Telefono: string

    @Column()
    idEspecialidad: number
}