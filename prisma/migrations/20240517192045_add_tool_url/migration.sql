-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Remove.bg est un outil en ligne qui permet de supprimer automatiquement l''arrière-plan des images en quelques secondes, facilitant ainsi le détourage rapide et précis des sujets.',
    "url" TEXT NOT NULL DEFAULT 'https://www.remove.bg/',
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Tool" ("id", "image", "published", "title") SELECT "id", "image", "published", "title" FROM "Tool";
DROP TABLE "Tool";
ALTER TABLE "new_Tool" RENAME TO "Tool";
PRAGMA foreign_key_check("Tool");
PRAGMA foreign_keys=ON;
