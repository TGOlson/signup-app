/*
  Warnings:

  - You are about to drop the column `endTime` on the `SignupOption` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `SignupOption` table. All the data in the column will be lost.
  - Added the required column `hasTimeComponent` to the `SignupOption` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SignupOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "signupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "hasTimeComponent" BOOLEAN NOT NULL,
    "location" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SignupOption_signupId_fkey" FOREIGN KEY ("signupId") REFERENCES "Signup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SignupOption" ("createdAt", "date", "description", "id", "index", "location", "quantity", "signupId", "title", "updatedAt") SELECT "createdAt", "date", "description", "id", "index", "location", "quantity", "signupId", "title", "updatedAt" FROM "SignupOption";
DROP TABLE "SignupOption";
ALTER TABLE "new_SignupOption" RENAME TO "SignupOption";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
