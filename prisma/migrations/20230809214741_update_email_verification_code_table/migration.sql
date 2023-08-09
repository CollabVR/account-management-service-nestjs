/*
  Warnings:

  - You are about to drop the `EmailVerificationCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EmailVerificationCode";

-- CreateTable
CREATE TABLE "EmailVerification" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EmailVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_email_key" ON "EmailVerification"("email");
