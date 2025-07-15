-- CreateTable
CREATE TABLE `_EtudiantClasse` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EtudiantClasse_AB_unique`(`A`, `B`),
    INDEX `_EtudiantClasse_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EtudiantClasse` ADD CONSTRAINT `_EtudiantClasse_A_fkey` FOREIGN KEY (`A`) REFERENCES `Classe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtudiantClasse` ADD CONSTRAINT `_EtudiantClasse_B_fkey` FOREIGN KEY (`B`) REFERENCES `Etudiant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
