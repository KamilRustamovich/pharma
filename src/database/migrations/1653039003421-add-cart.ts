import {MigrationInterface, QueryRunner} from "typeorm";

export class addCart1653039003421 implements MigrationInterface {
    name = 'addCart1653039003421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "medicine" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "version" integer NOT NULL DEFAULT '1',
                "title" character varying NOT NULL,
                "price" integer NOT NULL,
                "image" boolean NOT NULL,
                "slug" character varying NOT NULL,
                "media_url" character varying NOT NULL DEFAULT '',
                "media_name" character varying NOT NULL DEFAULT '',
                "cart_id" uuid,
                CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cart" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "version" integer NOT NULL DEFAULT '1',
                "title" character varying NOT NULL,
                "total_price" character varying NOT NULL,
                CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "cart_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb" UNIQUE ("cart_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "medicine"
            ADD CONSTRAINT "FK_07ee4bf928bed8eae105bb70d8b" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb"
        `);
        await queryRunner.query(`
            ALTER TABLE "medicine" DROP CONSTRAINT "FK_07ee4bf928bed8eae105bb70d8b"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "cart_id"
        `);
        await queryRunner.query(`
            DROP TABLE "cart"
        `);
        await queryRunner.query(`
            DROP TABLE "medicine"
        `);
    }

}
