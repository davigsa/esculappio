import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'

import { Disease } from './Disease'
import { User } from './User'

@Entity('patients')
class Patient {
    @PrimaryColumn()
    id: string

    @Column({ nullable: true })
    observation: string

    @OneToOne(type => User)
    @JoinTable({ name: 'user_id' })
    user: User;

    @ManyToMany(type => Disease, { nullable: true })
    @JoinTable()
    diseases: Disease[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date
}

export { Patient }
