import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'

import { User } from './User'

@Entity('doctors')
class Doctor {
    @PrimaryColumn()
    id: string

    @Column({ unique: true })
    crm: string

    @Column()
    specialization: string

    @OneToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date
}

export { Doctor }
