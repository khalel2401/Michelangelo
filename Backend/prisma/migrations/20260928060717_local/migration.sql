-- CreateTable
CREATE TABLE "locales" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "contacto" TEXT,
    "nombreDueno" TEXT NOT NULL,
    "aforo" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL,

    CONSTRAINT "locales_pkey" PRIMARY KEY ("id")
);
