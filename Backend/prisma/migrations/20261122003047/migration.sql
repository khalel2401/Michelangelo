-- AlterTable
ALTER TABLE "articulos" ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "cotizaciones_articulos" (
    "id" SERIAL NOT NULL,
    "cotizacionId" INTEGER NOT NULL,
    "articuloId" INTEGER NOT NULL,
    "cantidadAsignada" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "cotizaciones_articulos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cotizaciones_articulos" ADD CONSTRAINT "cotizaciones_articulos_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "cotizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotizaciones_articulos" ADD CONSTRAINT "cotizaciones_articulos_articuloId_fkey" FOREIGN KEY ("articuloId") REFERENCES "articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
