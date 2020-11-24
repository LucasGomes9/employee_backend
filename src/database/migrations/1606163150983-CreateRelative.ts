import {MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey} from "typeorm";

export default class CreateRelative1606163150983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'relatives',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'birthday',
              type: 'bigint',
            },
            {
              name: 'relationship',
              type: 'int',
            },
            {
              name: 'avatar',
              type: 'varchar',
            },
            {
              name: 'employee_id',
              type: 'uuid',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'relatives',
        new TableForeignKey({
          columnNames: ['employee_id'],
          referencedTableName: 'employees',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('relatives');

    }

}
