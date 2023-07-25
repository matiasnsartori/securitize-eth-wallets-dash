import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigrations1690215058062 implements MigrationInterface {
    name = 'Newmigrations1690215058062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange" ("id" SERIAL NOT NULL, "eth" numeric(10,2) NOT NULL DEFAULT '0', "usd" numeric(10,2) NOT NULL DEFAULT '0', "euro" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_cbd4568fcb476b57cebd8239895" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "favorite" boolean NOT NULL, "isOld" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_90a731b6fcd4463da9fbdf02a7e" UNIQUE ("name"), CONSTRAINT "UQ_1dcc9f5fd49e3dc52c6d2393c53" UNIQUE ("address"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "exchange"`);
    }

}
