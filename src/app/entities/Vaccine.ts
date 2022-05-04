import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

import { Disease } from './Disease'

@Entity('vaccines')
class Vaccine {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    laboratory: string

    @OneToOne(type => Disease)
    @JoinColumn({ name: 'disease_id' })
    user: Disease;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date
}

export { Vaccine }
