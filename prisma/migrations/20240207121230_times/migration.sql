/*
  Warnings:

  - You are about to drop the column `email` on the `Participant` table. All the data in the column will be lost.
  - Made the column `userId` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SignupOption" ADD COLUMN "endTime" INTEGER;
ALTER TABLE "SignupOption" ADD COLUMN "location" TEXT;
ALTER TABLE "SignupOption" ADD COLUMN "startTime" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "signupOptionId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "comment" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Participant_signupOptionId_fkey" FOREIGN KEY ("signupOptionId") REFERENCES "SignupOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("comment", "createdAt", "firstName", "id", "lastName", "quantity", "signupOptionId", "updatedAt", "userId") SELECT "comment", "createdAt", "firstName", "id", "lastName", "quantity", "signupOptionId", "updatedAt", "userId" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "firstName", "id", "lastName", "updatedAt") SELECT "createdAt", "email", "firstName", "id", "lastName", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
