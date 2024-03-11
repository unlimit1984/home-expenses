/*
 * Author: Vladimir Vysokomornyi
 */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConnectExpansesV2ToUsers1710106541801 implements MigrationInterface {
  name = 'ConnectExpansesV2ToUsers1710106541801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expense_v2" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "expense_v2" ADD CONSTRAINT "FK_9e9cc842817e0c4926313fa7452" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expense_v2" DROP CONSTRAINT "FK_9e9cc842817e0c4926313fa7452"`);
    await queryRunner.query(`ALTER TABLE "expense_v2" DROP COLUMN "userId"`);
  }
}
