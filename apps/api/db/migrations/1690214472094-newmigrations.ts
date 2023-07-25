import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigrations1690214472094 implements MigrationInterface {
    name = 'Newmigrations1690214472094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange" ("id" SERIAL NOT NULL, "eth" numeric(10,2) NOT NULL DEFAULT '0', "usd" numeric(10,2) NOT NULL DEFAULT '0', "euro" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_cbd4568fcb476b57cebd8239895" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange"`);
    }

}
