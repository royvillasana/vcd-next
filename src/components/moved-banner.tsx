"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NEW_SITE_URL } from "@/lib/progress-transfer";

/** Shown only on the OLD site (NEW_SITE_URL set), pointing learners to the new address. */
export function MovedBanner() {
  const pathname = usePathname();
  const [onNewSite, setOnNewSite] = useState(true);

  /* eslint-disable react-hooks/set-state-in-effect -- origin is only known on the client */
  useEffect(() => {
    setOnNewSite(!NEW_SITE_URL || window.location.origin === new URL(NEW_SITE_URL).origin);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (onNewSite || pathname === "/transfer") return null;

  return (
    <div role="region" aria-label="This site has moved" className="w-full border-b-[3px] border-[#191510] bg-[#FFC933] px-6 py-3 text-center text-[14px] font-bold text-[#191510]">
      This course has moved to a new address. Your progress stays in this browser, so bring it with you:{" "}
      <a href="/transfer" className="underline underline-offset-2">
        Move my progress →
      </a>
    </div>
  );
}
