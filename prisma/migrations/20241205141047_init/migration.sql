-- CreateTable
CREATE TABLE "Poem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuessedTitle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuessedTitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Poem_name_idx" ON "Poem"("name");

-- CreateIndex
CREATE INDEX "GuessedTitle_title_idx" ON "GuessedTitle"("title");
