import {MigrationInterface, QueryRunner} from "typeorm";

export class init1652969365294 implements MigrationInterface {
    name = 'init1652969365294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."mails_type_enum" AS ENUM('SIGN_UP_CODE', 'WHITELISTED', 'HELLO_MESSAGE')
        `);
        await queryRunner.query(`
            CREATE TABLE "mails" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "version" integer NOT NULL DEFAULT '1',
                "email" character varying NOT NULL,
                "is_sent" boolean NOT NULL DEFAULT false,
                "is_sending" boolean NOT NULL DEFAULT false,
                "type" "public"."mails_type_enum" NOT NULL,
                "params" jsonb NOT NULL DEFAULT '[]',
                CONSTRAINT "PK_218248d7dfe1b739f06e2309349" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "refresh_tokens" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "version" integer NOT NULL DEFAULT '1',
                "user_id" character varying NOT NULL,
                "is_revoked" boolean NOT NULL DEFAULT false,
                "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "restore_password" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "version" integer NOT NULL DEFAULT '1',
                "email" character varying NOT NULL,
                "verification_code" character varying NOT NULL,
                "send_code_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "confirmed" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_053bcb8aaa0c9de6183bcee888b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."users_status_enum" AS ENUM(
                'EMAIL_VERIFICATION_PENDING',
                'ACTIVE',
                'BLOCKED'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "version" integer NOT NULL DEFAULT '1',
                "email" character varying NOT NULL,
                "verification_code" character varying NOT NULL,
                "send_code_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "password" character varying NOT NULL,
                "status" "public"."users_status_enum" NOT NULL DEFAULT 'EMAIL_VERIFICATION_PENDING',
                CONSTRAINT "index_email" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "restore_password"
        `);
        await queryRunner.query(`
            DROP TABLE "refresh_tokens"
        `);
        await queryRunner.query(`
            DROP TABLE "mails"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."mails_type_enum"
        `);
    }

}
