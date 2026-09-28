-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'externo';

-- CreateTable
CREATE TABLE "valoraciones" (
    "id" SERIAL NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'cliente',
    "objetivoId" INTEGER NOT NULL,
    "autorId" INTEGER NOT NULL,
    "eventoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "valoraciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "valoraciones_rol_objetivoId_idx" ON "valoraciones"("rol", "objetivoId");

-- CreateIndex
CREATE UNIQUE INDEX "valoraciones_autorId_rol_objetivoId_eventoId_key" ON "valoraciones"("autorId", "rol", "objetivoId", "eventoId");

-- AddForeignKey
ALTER TABLE "valoraciones" ADD CONSTRAINT "valoraciones_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valoraciones" ADD CONSTRAINT "valoraciones_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
