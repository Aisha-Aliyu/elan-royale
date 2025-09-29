-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reservationId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'JPY',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineIndex
DROP INDEX "idx_reservation_status";
CREATE INDEX "Reservation_status_idx" ON "Reservation"("status");

-- RedefineIndex
DROP INDEX "idx_reservation_time";
CREATE INDEX "Reservation_reservationTime_idx" ON "Reservation"("reservationTime");

-- RedefineIndex
DROP INDEX "idx_reservation_email";
CREATE INDEX "Reservation_email_idx" ON "Reservation"("email");
