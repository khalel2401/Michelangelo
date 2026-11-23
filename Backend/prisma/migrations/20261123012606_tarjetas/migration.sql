-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'externo';

-- CreateTable
CREATE TABLE "tarjetas" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "fechaVencimiento" TEXT NOT NULL,
    "titular" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "tarjetas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tarjetas" ADD CONSTRAINT "tarjetas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
