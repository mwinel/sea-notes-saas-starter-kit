-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Note_userId_position_idx" ON "Note"("userId", "position");
