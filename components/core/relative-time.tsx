"use client";

import '@github/relative-time-element'

export default function RelativeTime({
  date
} : {
  date: any
}) {
  return (
    <relative-time datetime={new Date(date).toString()}></relative-time>
  )
}