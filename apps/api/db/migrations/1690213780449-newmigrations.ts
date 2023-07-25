import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigrations1690213780449 implements MigrationInterface {
    name = 'Newmigrations1690213780449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "favorite" boolean NOT NULL, "isOld" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_90a731b6fcd4463da9fbdf02a7e" UNIQUE ("name"), CONSTRAINT "UQ_1dcc9f5fd49e3dc52c6d2393c53" UNIQUE ("address"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
