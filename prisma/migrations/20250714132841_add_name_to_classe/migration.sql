-- CreateTable
CREATE TABLE `Classe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `matiere` VARCHAR(191) NOT NULL,
    `niveau` VARCHAR(191) NOT NULL,
    `horaire` VARCHAR(191) NOT NULL,
    `enseignantId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Classe` ADD CONSTRAINT `Classe_enseignantId_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
