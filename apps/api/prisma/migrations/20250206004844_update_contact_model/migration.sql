/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE contact_id_seq;
ALTER TABLE "Contact" ADD COLUMN     "message" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('contact_id_seq');
ALTER SEQUENCE contact_id_seq OWNED BY "Contact"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_key" ON "Contact"("id");
