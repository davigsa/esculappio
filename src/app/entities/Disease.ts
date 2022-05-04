import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('diseases')
class Disease {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    treatment: string

    @Column()
    symptoms: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date
}

export { Disease }
