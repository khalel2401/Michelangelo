/*
  Warnings:

  - You are about to drop the column `objetivoId` on the `valoraciones` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `valoraciones` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[autorId,trabajadorId]` on the table `valoraciones` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[autorId,eventoId]` on the table `valoraciones` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "valoraciones" DROP CONSTRAINT "valoraciones_autorId_fkey";

-- DropForeignKey
ALTER TABLE "valoraciones" DROP CONSTRAINT "valoraciones_eventoId_fkey";

-- DropIndex
DROP INDEX "valoraciones_autorId_rol_objetivoId_eventoId_key";

-- DropIndex
DROP INDEX "valoraciones_rol_objetivoId_idx";

-- AlterTable
ALTER TABLE "valoraciones" DROP COLUMN "objetivoId",
DROP COLUMN "rol",
ADD COLUMN     "trabajadorId" INTEGER,
ALTER COLUMN "comentario" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "valoraciones_trabajadorId_idx" ON "valoraciones"("trabajadorId");

-- CreateIndex
CREATE INDEX "valoraciones_eventoId_idx" ON "valoraciones"("eventoId");

-- CreateIndex
CREATE UNIQUE INDEX "valoraciones_autorId_trabajadorId_key" ON "valoraciones"("autorId", "trabajadorId");

-- CreateIndex
CREATE UNIQUE INDEX "valoraciones_autorId_eventoId_key" ON "valoraciones"("autorId", "eventoId");

-- AddForeignKey
ALTER TABLE "valoraciones" ADD CONSTRAINT "valoraciones_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valoraciones" ADD CONSTRAINT "valoraciones_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valoraciones" ADD CONSTRAINT "valoraciones_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
