import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePatientsDiseasesVaccines1651070297746 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diseases',
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
            name: 'treatment',
            type: 'varchar'
          },
          {
            name: 'symptoms',
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
        name: 'vaccines',
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
            name: 'laboratory',
            type: 'varchar'
          },
          {
            name: 'disease_id',
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
            name: 'providerVaccine',
            referencedTableName: 'diseases',
            referencedColumnNames: ['id'],
            columnNames: ['disease_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )

    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'diseases',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'providerPatient',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'providerPatientDiseases',
            referencedTableName: 'diseases',
            referencedColumnNames: ['id'],
            columnNames: ['diseases'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients')
    await queryRunner.dropTable('vaccines')
    await queryRunner.dropTable('diseases')
  }
}
