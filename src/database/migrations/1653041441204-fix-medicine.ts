import {MigrationInterface, QueryRunner} from "typeorm";

export class fixMedicine1653041441204 implements MigrationInterface {
    name = 'fixMedicine1653041441204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "medicine" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "medicine" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "medicine"
            ADD "product_name" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "medicine" DROP COLUMN "product_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "medicine"
            ADD "image" boolean NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "medicine"
            ADD "title" character varying NOT NULL
        `);
    }

}
