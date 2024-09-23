"use client";

import { useEffect, useState } from "react";
import "@github/relative-time-element";

export default function RelativeTime({ date }: { date: any }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // if (!date) {
  //   return null;
  // }

  return (
    <relative-time datetime={new Date(date).toISOString()}></relative-time>
  );
}
