/*
  Warnings:

  - You are about to drop the column `servicioId` on the `cotizaciones` table. All the data in the column will be lost.
  - You are about to drop the column `local` on the `eventos` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'externo';

-- DropForeignKey
ALTER TABLE "cotizaciones" DROP CONSTRAINT "cotizaciones_servicioId_fkey";

-- AlterTable
ALTER TABLE "Personal" ALTER COLUMN "calificacion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "cotizaciones" DROP COLUMN "servicioId",
ADD COLUMN     "localId" INTEGER;

-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "local",
ADD COLUMN     "nombre" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "locales" ALTER COLUMN "disponibilidad" SET DEFAULT true;

-- CreateTable
CREATE TABLE "cotizaciones_servicios" (
    "id" SERIAL NOT NULL,
    "cotizacionId" INTEGER NOT NULL,
    "servicioId" INTEGER NOT NULL,

    CONSTRAINT "cotizaciones_servicios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cotizaciones" ADD CONSTRAINT "cotizaciones_localId_fkey" FOREIGN KEY ("localId") REFERENCES "locales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotizaciones_servicios" ADD CONSTRAINT "cotizaciones_servicios_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "cotizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotizaciones_servicios" ADD CONSTRAINT "cotizaciones_servicios_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "servicios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
