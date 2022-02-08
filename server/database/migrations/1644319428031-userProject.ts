import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class userProject1644319428031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userProject',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            type: 'int',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'projectId',
            type: 'int',
          },
          {
            name: 'contextId',
            type: 'text',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'userProject',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'userProject',
      new TableForeignKey({
        columnNames: ['projectId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'project',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userProject');
  }
}
