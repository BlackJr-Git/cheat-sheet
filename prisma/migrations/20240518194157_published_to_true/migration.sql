-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Tool" ("description", "id", "image", "published", "title", "url") SELECT "description", "id", "image", "published", "title", "url" FROM "Tool";
DROP TABLE "Tool";
ALTER TABLE "new_Tool" RENAME TO "Tool";
PRAGMA foreign_key_check("Tool");
PRAGMA foreign_keys=ON;
