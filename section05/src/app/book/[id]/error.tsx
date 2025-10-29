"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>{error.message}</p>
      <h3>오류가 발생했습니다</h3>
      {/* <button onClick={() => window.location.reload()}> 다시 시도</button> */}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
           });
        }}
      >
        {" "}
        다시 시도
      </button>
    </div>
  );
}
