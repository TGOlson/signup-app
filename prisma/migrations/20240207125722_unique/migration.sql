/*
  Warnings:

  - A unique constraint covering the columns `[signupOptionId,userId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[signupId,index]` on the table `SignupOption` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participant_signupOptionId_userId_key" ON "Participant"("signupOptionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SignupOption_signupId_index_key" ON "SignupOption"("signupId", "index");
