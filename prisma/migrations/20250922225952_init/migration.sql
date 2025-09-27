-- Enable UUID extension (Postgres only, ignore if using SQLite)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Reservation Table
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY, -- Keep TEXT if SQLite; change to UUID DEFAULT uuid_generate_v4() if Postgres
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "partySize" INTEGER NOT NULL CHECK ("partySize" > 0), -- must be > 0
    "reservationTime" DATETIME NOT NULL,
    "area" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | cancelled
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster queries
CREATE INDEX "idx_reservation_email" ON "Reservation"("email");
CREATE INDEX "idx_reservation_time" ON "Reservation"("reservationTime");
CREATE INDEX "idx_reservation_status" ON "Reservation"("status");