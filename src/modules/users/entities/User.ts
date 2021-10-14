import { v4 as uuidv4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
class User {
    @PrimaryColumn()
    id?: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    cpf!: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

    constructor () {
      if (!this.id) this.id = uuidv4()
    }
}

export { User }
