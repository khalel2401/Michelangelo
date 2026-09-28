/*
  Warnings:

  - You are about to drop the `Articulo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehiculo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Articulo";

-- DropTable
DROP TABLE "Vehiculo";

-- CreateTable
CREATE TABLE "articulos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "enUso" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehiculos" (
    "id" SERIAL NOT NULL,
    "marca" VARCHAR(100) NOT NULL,
    "modelo" VARCHAR(100) NOT NULL,
    "patente" VARCHAR(100) NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "vehiculos_pkey" PRIMARY KEY ("id")
);
