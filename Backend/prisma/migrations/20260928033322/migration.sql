/*
  Warnings:

  - You are about to drop the column `abono` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `cantidadPersonas` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `confirmado` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `eventos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cotizacionId]` on the table `eventos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cotizacionId` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'externo';

-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "abono",
DROP COLUMN "cantidadPersonas",
DROP COLUMN "confirmado",
DROP COLUMN "nombre",
DROP COLUMN "tipo",
DROP COLUMN "valorTotal",
ADD COLUMN     "cotizacionId" INTEGER NOT NULL,
ADD COLUMN     "local" VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE "servicios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "descripcion" VARCHAR(200),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cotizaciones" (
    "id" SERIAL NOT NULL,
    "cantidadPersonas" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "abono" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "servicioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cotizaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT,
    "calificacion" INTEGER NOT NULL,
    "evento" TEXT NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contratacion" (
    "id" SERIAL NOT NULL,
    "idpersonal" INTEGER NOT NULL,
    "idevento" INTEGER NOT NULL,
    "fecha" TEXT,
    "salario" INTEGER NOT NULL,

    CONSTRAINT "Contratacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "eventos_cotizacionId_key" ON "eventos"("cotizacionId");

-- AddForeignKey
ALTER TABLE "cotizaciones" ADD CONSTRAINT "cotizaciones_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "servicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "cotizaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
