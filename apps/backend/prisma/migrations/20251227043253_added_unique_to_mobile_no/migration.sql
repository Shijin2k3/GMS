/*
  Warnings:

  - A unique constraint covering the columns `[mobile_no]` on the table `member` will be added. If there are existing duplicate values, this will fail.
  - Made the column `mobile_no` on table `member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `member` MODIFY `mobile_no` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `member_mobile_no_key` ON `member`(`mobile_no`);
