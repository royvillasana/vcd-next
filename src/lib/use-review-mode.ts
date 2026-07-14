"use client";

import { useEffect, useState } from "react";

/**
 * Review Mode — a non-destructive way to preview the course as if every module
 * were already completed (no gating, no locks). Enable by visiting any page
 * with `?review=1`; it persists in localStorage so it survives navigation and
 * is shareable via a single link. Disable with `?review=0` or the Exit button.
 * Off by default — real users still get the completion gate.
 */
export function useReviewMode(): boolean {
  const [review, setReview] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- one-time read of the review flag */
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("review");
      if (p === "1") localStorage.setItem("vcd-review", "1");
      else if (p === "0") localStorage.removeItem("vcd-review");
      setReview(localStorage.getItem("vcd-review") === "1");
    } catch {
      // ignore
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return review;
}
