import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('MedicoEspecialidad')
export class MedicoEspecialidad{

    @PrimaryGeneratedColumn()
    idEspecialidad: number

    @Column()
    Descripcion: string
}