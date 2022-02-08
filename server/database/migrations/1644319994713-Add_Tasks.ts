import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddTasks1644319994713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            type: 'int',
          },
          {
            name: 'projectId',
            type: 'int',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'timeEstimate',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'boolean',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['projectId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'project',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }
}
