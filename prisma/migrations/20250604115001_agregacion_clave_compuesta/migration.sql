-- CreateTable
CREATE TABLE `categoria` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colores` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `valor` VARCHAR(255) NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `descuentos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `fecha_desde` DATE NULL,
    `fecha_hasta` DATE NULL,
    `descripcion` VARCHAR(255) NULL,
    `promocion_precio` DOUBLE NULL,
    `tiempo_desde` TIME(6) NULL,
    `tiempo_hasta` TIME(6) NULL,
    `nombre` VARCHAR(255) NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_factura` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `monto` DOUBLE NULL,
    `cantidad` INTEGER NULL,
    `subtotal` DOUBLE NULL,
    `precio_unitario` DOUBLE NULL,
    `factura_id` BIGINT NULL,
    `producto_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    INDEX `FKt42rg2ha5kdrb6t1v35dwn27x`(`producto_id`),
    INDEX `FKucgyfvfujw8g2tt3c6fdkxai`(`factura_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalles` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(255) NULL,
    `tamaño` VARCHAR(255) NULL,
    `estado` BIT(1) NULL,
    `stock` INTEGER NULL,
    `precio_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    UNIQUE INDEX `UKsvdfehjnhso84dt19drc78y4i`(`precio_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direccion` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `codigo_postal` INTEGER NULL,
    `numero` INTEGER NULL,
    `calle` VARCHAR(255) NULL,
    `user_id` BIGINT NULL,
    `localidad_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    INDEX `FKbrm0ogdtkt096len14mgaaau7`(`localidad_id`),
    INDEX `FKsevgdua41k9nn1k7hhglxgixa`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factura` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `fecha_compra` DATE NULL,
    `total` DOUBLE NULL,
    `usuario_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,
    `direccion_comprador` VARCHAR(255) NULL,
    `dni_comprador` VARCHAR(255) NULL,
    `nombre_comprador` VARCHAR(255) NULL,

    INDEX `FK5jh2f7cvry6vwq6ats5otr065`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagenes` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NULL,
    `imagen_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    INDEX `FKhyoquja2ddcnew4324heh2qtl`(`imagen_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `localidad` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `provincia_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    INDEX `FK37mbpxuicwnbo878s9djjgr39`(`provincia_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pais` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `precios` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `precio_compra` DOUBLE NULL,
    `precio_venta` DOUBLE NULL,
    `descuento_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    UNIQUE INDEX `UK6kn3rbbqx5evkg21lq05s9mk9`(`descuento_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto_color` (
    `id_producto` BIGINT NOT NULL,
    `id_color` BIGINT NOT NULL,

    INDEX `FK9fqsiaminn90o8833iwk8c4rt`(`id_producto`),
    INDEX `FKiploq42bp9nej4mo98mi5ps1a`(`id_color`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto_talle` (
    `id_producto` BIGINT NOT NULL,
    `id_talle` BIGINT NOT NULL,

    INDEX `FKanbnfi0vfike3y3n3vj1a8f2i`(`id_producto`),
    INDEX `FKmnfm4pj8o4xblnh003d9spypf`(`id_talle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `tipo_producto` TINYINT NULL,
    `sexo` VARCHAR(255) NULL,
    `categoria_id` BIGINT NULL,
    `precio_id` BIGINT NULL,
    `imagen_id` BIGINT NULL,
    `descripcion` VARCHAR(255) NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `activo` BIT(1) NOT NULL DEFAULT true,

    UNIQUE INDEX `UKiui74lcrybsvvnqgbv2ubx8ge`(`precio_id`),
    UNIQUE INDEX `UK1tktbgm379pqd9mnb6jyalbvm`(`imagen_id`),
    INDEX `FKpg3xiei77fmdbpx20n8i9txs6`(`categoria_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provincia` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `pais_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    INDEX `FKm4s599988w0v1q1nw6dyo5t2m`(`pais_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `talla` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `talla` VARCHAR(255) NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `nombre` VARCHAR(255) NULL,
    `contrasenia` VARCHAR(255) NOT NULL,
    `usuario` TINYINT NULL,
    `direccion_id` BIGINT NULL,
    `talla_id` BIGINT NULL,
    `activo` BIT(1) NOT NULL DEFAULT true,

    UNIQUE INDEX `usuarios_dni_key`(`dni`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    INDEX `FKca4tgd5e0gnem264iqbtm41up`(`direccion_id`),
    INDEX `FKrbctt49dyt3gnixokbmn35nc4`(`talla_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalle_factura` ADD CONSTRAINT `FKt42rg2ha5kdrb6t1v35dwn27x` FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `detalle_factura` ADD CONSTRAINT `FKucgyfvfujw8g2tt3c6fdkxai` FOREIGN KEY (`factura_id`) REFERENCES `factura`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `detalles` ADD CONSTRAINT `FKc8oetbck5raimawexmts4m0p1` FOREIGN KEY (`precio_id`) REFERENCES `precios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `direccion` ADD CONSTRAINT `FKbrm0ogdtkt096len14mgaaau7` FOREIGN KEY (`localidad_id`) REFERENCES `localidad`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `direccion` ADD CONSTRAINT `FKsevgdua41k9nn1k7hhglxgixa` FOREIGN KEY (`user_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `factura` ADD CONSTRAINT `FK5jh2f7cvry6vwq6ats5otr065` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `imagenes` ADD CONSTRAINT `FKhyoquja2ddcnew4324heh2qtl` FOREIGN KEY (`imagen_id`) REFERENCES `detalles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `localidad` ADD CONSTRAINT `FK37mbpxuicwnbo878s9djjgr39` FOREIGN KEY (`provincia_id`) REFERENCES `provincia`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `precios` ADD CONSTRAINT `FKc4kat1n0tjfind4uxefxleueo` FOREIGN KEY (`descuento_id`) REFERENCES `descuentos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `producto_color` ADD CONSTRAINT `FK9fqsiaminn90o8833iwk8c4rt` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `producto_color` ADD CONSTRAINT `FKiploq42bp9nej4mo98mi5ps1a` FOREIGN KEY (`id_color`) REFERENCES `colores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `producto_talle` ADD CONSTRAINT `FKanbnfi0vfike3y3n3vj1a8f2i` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `producto_talle` ADD CONSTRAINT `FKmnfm4pj8o4xblnh003d9spypf` FOREIGN KEY (`id_talle`) REFERENCES `talla`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `FK8y54fd89l9sc6wnnano8synuk` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `FKah37frhi5ab0uf605umis1m37` FOREIGN KEY (`precio_id`) REFERENCES `precios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `FKpg3xiei77fmdbpx20n8i9txs6` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `provincia` ADD CONSTRAINT `FKm4s599988w0v1q1nw6dyo5t2m` FOREIGN KEY (`pais_id`) REFERENCES `pais`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `FKca4tgd5e0gnem264iqbtm41up` FOREIGN KEY (`direccion_id`) REFERENCES `direccion`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `FKrbctt49dyt3gnixokbmn35nc4` FOREIGN KEY (`talla_id`) REFERENCES `talla`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
