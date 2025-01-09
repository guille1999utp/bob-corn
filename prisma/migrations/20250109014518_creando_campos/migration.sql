-- CreateTable
CREATE TABLE "salePopCorn" (
    "id" SERIAL NOT NULL,
    "salesCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "salePopCorn_pkey" PRIMARY KEY ("id")
);
