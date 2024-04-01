import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUserTable1711907385759 implements MigrationInterface {
  name = 'AddRoleToUserTable1711907385759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
