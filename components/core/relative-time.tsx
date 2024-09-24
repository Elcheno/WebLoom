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

  const resultDate = new Date(date);

  if (!resultDate) {
    return <></>;
  }

  return <relative-time datetime={resultDate}></relative-time>;
}
