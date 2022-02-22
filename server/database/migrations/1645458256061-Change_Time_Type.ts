import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeTimeType1645458256061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('task', 'timeEstimate');

    await queryRunner.addColumn(
      'task',
      new TableColumn({
        name: 'timeEstimate',
        type: 'text',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('task', 'timeEstimate');

    await queryRunner.addColumn(
      'task',
      new TableColumn({
        name: 'timeEstimate',
        type: 'int',
      }),
    );
  }
}
