-- CreateTable
CREATE TABLE "Articulo" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "enUso" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Articulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" SERIAL NOT NULL,
    "marca" VARCHAR(100) NOT NULL,
    "modelo" VARCHAR(100) NOT NULL,
    "patente" VARCHAR(100) NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id")
);
