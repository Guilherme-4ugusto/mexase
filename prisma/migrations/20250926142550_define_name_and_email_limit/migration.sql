/*
  Warnings:

  - You are about to alter the column `nome` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `nome` VARCHAR(150) NOT NULL,
    MODIFY `email` VARCHAR(254) NOT NULL;
