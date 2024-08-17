-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
