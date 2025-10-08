ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "firstName" TEXT,
  ADD COLUMN IF NOT EXISTS "lastName"  TEXT;

-- Backfill from legacy "name" if present, else from email local-part
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'User' AND column_name = 'name'
  ) THEN
    UPDATE "User"
    SET "firstName" = COALESCE(NULLIF(split_part("name", ' ', 1), ''), 'User')
    WHERE "firstName" IS NULL;

    UPDATE "User"
    SET "lastName" = COALESCE(NULLIF(regexp_replace("name", '^[^ ]+\s*', ''), ''), '')
    WHERE "lastName" IS NULL;
  ELSE
    UPDATE "User"
    SET
      "firstName" = COALESCE("firstName", COALESCE(NULLIF(split_part(email, '@', 1), ''), 'User')),
      "lastName"  = COALESCE("lastName", '')
    WHERE "firstName" IS NULL OR "lastName" IS NULL;
  END IF;
END $$;

-- Enforce NOT NULL now that data exists
ALTER TABLE "User"
  ALTER COLUMN "firstName" SET NOT NULL,
  ALTER COLUMN "lastName"  SET NOT NULL;

-- Drop legacy "name" if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'User' AND column_name = 'name'
  ) THEN
    ALTER TABLE "User" DROP COLUMN "name";
  END IF;
END $$;
