/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `usuario`;

-- CreateTable
CREATE TABLE `Nutricionista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricula` INTEGER NOT NULL,
    `nome` VARCHAR(150) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `desativadoEm` DATETIME(3) NULL,

    UNIQUE INDEX `Nutricionista_matricula_key`(`matricula`),
    UNIQUE INDEX `Nutricionista_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
