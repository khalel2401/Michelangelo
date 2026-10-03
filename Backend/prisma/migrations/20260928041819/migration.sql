/*
  Warnings:

  - You are about to drop the column `idevento` on the `Contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `idpersonal` on the `Contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `evento` on the `Personal` table. All the data in the column will be lost.
  - Added the required column `id_evento` to the `Contratacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_personal` to the `Contratacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contratacion" DROP COLUMN "idevento",
DROP COLUMN "idpersonal",
ADD COLUMN     "id_evento" INTEGER NOT NULL,
ADD COLUMN     "id_personal" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "evento";

-- AddForeignKey
ALTER TABLE "Contratacion" ADD CONSTRAINT "Contratacion_id_personal_fkey" FOREIGN KEY ("id_personal") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contratacion" ADD CONSTRAINT "Contratacion_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
