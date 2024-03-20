-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" UUID,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" UUID,
    "albumId" UUID,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteArtist" (
    "id" UUID NOT NULL,
    "artistId" UUID,

    CONSTRAINT "FavoriteArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteAlbum" (
    "id" UUID NOT NULL,
    "albumId" UUID,

    CONSTRAINT "FavoriteAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteTrack" (
    "id" UUID NOT NULL,
    "trackId" UUID NOT NULL,

    CONSTRAINT "FavoriteTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_artistId_key" ON "Album"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_artistId_key" ON "Track"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumId_key" ON "Track"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtist_artistId_key" ON "FavoriteArtist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAlbum_albumId_key" ON "FavoriteAlbum"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteTrack_trackId_key" ON "FavoriteTrack"("trackId");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbum" ADD CONSTRAINT "FavoriteAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteTrack" ADD CONSTRAINT "FavoriteTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
