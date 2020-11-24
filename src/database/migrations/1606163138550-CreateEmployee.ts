import {MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey} from "typeorm";

export default class CreateEmployee1606163138550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(
        new Table({
          name: 'employees',
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
              name: 'role',
              type: 'varchar',
            },
            {
              name: 'department',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'phone',
              type: 'varchar',
            },
            {
              name: 'avatar',
              type: 'varchar',
            },
            {
              name: 'likes',
              type: 'int',
              default: 0,
            },
            {
              name: 'dislikes',
              type: 'int',
              default: 0,
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
    }




    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('employees');

    }

}
