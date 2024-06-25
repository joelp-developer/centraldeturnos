import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    idUsuario: number

    @Column()
    Nombre: string

    @Column()
    Apellido: string

    @Column()
    Email: string

    @Column()
    Telefono: string
    
    @Column()
    Contraseña: string

    @Column()
    IdTipoUsuario: number
}
