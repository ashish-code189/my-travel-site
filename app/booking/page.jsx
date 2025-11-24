export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { Suspense } from "react";
import BookingPageContent from "./pageContent";

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading booking page...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
