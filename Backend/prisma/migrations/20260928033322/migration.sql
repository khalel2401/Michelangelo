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

-- Add the new columns before migrating existing event data.
ALTER TABLE "eventos"
ADD COLUMN "cotizacionId" INTEGER,
ADD COLUMN "local" VARCHAR(100);

-- Preserve the fields removed from eventos in a service and quotation per event.
DO $$
DECLARE
    evento_legacy RECORD;
    servicio_id INTEGER;
    cotizacion_id INTEGER;
BEGIN
    FOR evento_legacy IN
        SELECT "id", "nombre", "tipo", "cantidadPersonas", "valorTotal", "abono", "confirmado"
        FROM "eventos"
        ORDER BY "id"
    LOOP
        INSERT INTO "servicios" ("nombre", "precio", "descripcion", "updatedAt")
        VALUES (evento_legacy."tipo", evento_legacy."valorTotal", evento_legacy."nombre", CURRENT_TIMESTAMP)
        RETURNING "id" INTO servicio_id;

        INSERT INTO "cotizaciones" (
            "cantidadPersonas", "valorTotal", "abono", "estado", "servicioId", "updatedAt"
        )
        VALUES (
            evento_legacy."cantidadPersonas",
            evento_legacy."valorTotal",
            evento_legacy."abono",
            CASE WHEN evento_legacy."confirmado" THEN 'confirmado' ELSE 'pendiente' END,
            servicio_id,
            CURRENT_TIMESTAMP
        )
        RETURNING "id" INTO cotizacion_id;

        UPDATE "eventos"
        SET "cotizacionId" = cotizacion_id,
            "local" = 'Sin especificar'
        WHERE "id" = evento_legacy."id";
    END LOOP;
END $$;

ALTER TABLE "eventos"
ALTER COLUMN "cotizacionId" SET NOT NULL,
ALTER COLUMN "local" SET NOT NULL,
DROP COLUMN "abono",
DROP COLUMN "cantidadPersonas",
DROP COLUMN "confirmado",
DROP COLUMN "nombre",
DROP COLUMN "tipo",
DROP COLUMN "valorTotal";

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
