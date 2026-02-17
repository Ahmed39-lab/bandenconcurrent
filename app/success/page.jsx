import { Suspense } from "react";
import SuccessClient from "../_components/generals/SuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
