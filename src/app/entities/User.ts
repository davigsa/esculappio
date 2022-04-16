import { Column, CreateDateColumn, Entity, PrimaryColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcrypt from 'bcryptjs'

@Entity('users')
class User {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    surname: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    cpf: string

    @Column()
    telephone: string

    @Column('text')
    gender: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword () {
      this.password = bcrypt.hashSync(this.password, 8)
    }
}

export { User }
