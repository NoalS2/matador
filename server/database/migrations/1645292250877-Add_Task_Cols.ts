import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTaskCols1645292250877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'task',
      new TableColumn({
        name: 'title',
        type: 'text',
      }),
    );

    await queryRunner.addColumn(
      'task',
      new TableColumn({
        name: 'userId',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('task', 'title');

    await queryRunner.dropColumn('task', 'userId');
  }
}
