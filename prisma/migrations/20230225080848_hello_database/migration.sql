-- CreateTable
CREATE TABLE `Prediction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `input` JSON NULL,
    `output` JSON NULL,
    `error` VARCHAR(191) NULL,
    `logs` VARCHAR(191) NULL,
    `version` VARCHAR(191) NULL,

    UNIQUE INDEX `Prediction_uuid_key`(`uuid`),
    UNIQUE INDEX `Prediction_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
