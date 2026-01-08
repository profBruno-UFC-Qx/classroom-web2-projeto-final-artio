-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ARTIST', 'CLIENT', 'COMMON_USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "socialmedia" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
