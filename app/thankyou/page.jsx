import { Suspense } from "react";
import ThankyouContent from "./ThankyouContent";

export default function ThankyouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankyouContent />
    </Suspense>
  );
}
