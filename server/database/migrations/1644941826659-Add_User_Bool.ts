import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserBool1644941826659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'userProject',
      new TableColumn({
        name: 'leader',
        type: 'bool',
      }),
    );

    await queryRunner.dropColumn('userProject', 'contextId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('userProject', 'leader');

    await queryRunner.addColumn(
      'userProject',
      new TableColumn({
        name: 'contextId',
        type: 'string',
      }),
    );
  }
}
