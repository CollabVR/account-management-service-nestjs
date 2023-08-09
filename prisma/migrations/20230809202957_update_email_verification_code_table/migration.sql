/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `EmailVerificationCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationCode_email_key" ON "EmailVerificationCode"("email");
