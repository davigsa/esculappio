import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1634144985942 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'surname',
            type: 'varchar'
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'telephone',
            type: 'varchar'
          },
          {
            name: 'gender',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )

    await queryRunner.createTable(
      new Table({
        name: 'doctors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'crm',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'specialization',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'providerDoctor',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors')
    await queryRunner.dropTable('users')
    await queryRunner.query('DROP EXTENSION "uudi-ossp"')
  }
}
