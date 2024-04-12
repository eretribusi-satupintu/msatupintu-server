-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `pin` INTEGER NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `petugas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `subwilayah_id` INTEGER NOT NULL,

    UNIQUE INDEX `petugas_user_id_key`(`user_id`),
    INDEX `petugas_subwilayah_id_fkey`(`subwilayah_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wajib_retribusi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `nik` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `wajib_retribusi_user_id_key`(`user_id`),
    UNIQUE INDEX `wajib_retribusi_nik_key`(`nik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kabupaten` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kedinasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kabupaten_id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    INDEX `kedinasan_kabupaten_id_fkey`(`kabupaten_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_wilayah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kedinasan_id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    INDEX `sub_wilayah_kedinasan_id_fkey`(`kedinasan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `retribusi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kedinasan_id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    INDEX `retribusi_kedinasan_id_fkey`(`kedinasan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_retribusi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `retribusi_id` INTEGER NOT NULL,
    `kategori_nama` VARCHAR(191) NOT NULL,
    `jenis_tagihan` ENUM('MANUAL', 'HARIAN', 'MINGGUAN', 'BULANAN', 'TAHUNAN') NOT NULL,
    `harga` DOUBLE NOT NULL,

    INDEX `item_retribusi_retribusi_id_fkey`(`retribusi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kontrak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wajib_retribusi_id` INTEGER NOT NULL,
    `item_retribusi_id` INTEGER NOT NULL,
    `sub_wilayah_id` INTEGER NOT NULL,

    INDEX `kontrak_item_retribusi_id_fkey`(`item_retribusi_id`),
    INDEX `kontrak_sub_wilayah_id_fkey`(`sub_wilayah_id`),
    INDEX `kontrak_wajib_retribusi_id_fkey`(`wajib_retribusi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tagihan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kontrak_id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `total_harga` DOUBLE NOT NULL,
    `status` ENUM('NEW', 'REQUEST', 'VERIFIED') NOT NULL DEFAULT 'NEW',
    `invoice_id` VARCHAR(191) NOT NULL,
    `request_id` VARCHAR(191) NOT NULL,
    `virtualAccountId` INTEGER NULL,

    UNIQUE INDEX `tagihan_invoice_id_key`(`invoice_id`),
    UNIQUE INDEX `tagihan_request_id_key`(`request_id`),
    INDEX `tagihan_kontrak_id_fkey`(`kontrak_id`),
    INDEX `tagihan_virtualAccountId_fkey`(`virtualAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagihan_id` INTEGER NOT NULL,
    `invoice_number` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    UNIQUE INDEX `orders_tagihan_id_key`(`tagihan_id`),
    UNIQUE INDEX `orders_invoice_number_key`(`invoice_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagihan_id` INTEGER NOT NULL,
    `petugas_id` INTEGER NOT NULL,
    `metode_pembayaran` ENUM('CASH', 'VA', 'QRIS') NOT NULL,
    `status` ENUM('SUCCESS', 'WAITING', 'FAILED') NOT NULL,

    INDEX `Pembayaran_petugas_id_fkey`(`petugas_id`),
    INDEX `Pembayaran_tagihan_id_fkey`(`tagihan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `virtual_accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `virtual_account_number` VARCHAR(191) NOT NULL,
    `created_date` DATETIME(3) NOT NULL,
    `created_date_utc` DATETIME(3) NOT NULL,
    `expired_date` DATETIME(3) NOT NULL,
    `expired_date_utc` DATETIME(3) NOT NULL,
    `how_to_pay_api` VARCHAR(191) NOT NULL,
    `how_to_pay_page` VARCHAR(191) NOT NULL,
    `order_invoice` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `pembayaran_id` INTEGER NOT NULL,

    UNIQUE INDEX `virtual_accounts_order_invoice_key`(`order_invoice`),
    INDEX `virtual_accounts_pembayaran_id_fkey`(`pembayaran_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `petugas` ADD CONSTRAINT `petugas_subwilayah_id_fkey` FOREIGN KEY (`subwilayah_id`) REFERENCES `sub_wilayah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `petugas` ADD CONSTRAINT `petugas_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wajib_retribusi` ADD CONSTRAINT `wajib_retribusi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kedinasan` ADD CONSTRAINT `kedinasan_kabupaten_id_fkey` FOREIGN KEY (`kabupaten_id`) REFERENCES `kabupaten`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_wilayah` ADD CONSTRAINT `sub_wilayah_kedinasan_id_fkey` FOREIGN KEY (`kedinasan_id`) REFERENCES `kedinasan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `retribusi` ADD CONSTRAINT `retribusi_kedinasan_id_fkey` FOREIGN KEY (`kedinasan_id`) REFERENCES `kedinasan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_retribusi` ADD CONSTRAINT `item_retribusi_retribusi_id_fkey` FOREIGN KEY (`retribusi_id`) REFERENCES `retribusi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontrak` ADD CONSTRAINT `kontrak_item_retribusi_id_fkey` FOREIGN KEY (`item_retribusi_id`) REFERENCES `item_retribusi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontrak` ADD CONSTRAINT `kontrak_sub_wilayah_id_fkey` FOREIGN KEY (`sub_wilayah_id`) REFERENCES `sub_wilayah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontrak` ADD CONSTRAINT `kontrak_wajib_retribusi_id_fkey` FOREIGN KEY (`wajib_retribusi_id`) REFERENCES `wajib_retribusi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tagihan` ADD CONSTRAINT `tagihan_kontrak_id_fkey` FOREIGN KEY (`kontrak_id`) REFERENCES `kontrak`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_tagihan_id_fkey` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_petugas_id_fkey` FOREIGN KEY (`petugas_id`) REFERENCES `petugas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_tagihan_id_fkey` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `virtual_accounts` ADD CONSTRAINT `virtual_accounts_order_invoice_fkey` FOREIGN KEY (`order_invoice`) REFERENCES `orders`(`invoice_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `virtual_accounts` ADD CONSTRAINT `virtual_accounts_pembayaran_id_fkey` FOREIGN KEY (`pembayaran_id`) REFERENCES `pembayaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
