"use server";

import { RedirectType, redirect } from "next/navigation";

export async function redirectToProjectList({
  dashboard,
}: {
  dashboard: string;
}) {
  redirect(`/dashboard/${dashboard}/projects?visibility=all`);
}

export async function navigate(
  url: string,
  type: RedirectType = RedirectType.replace,
) {
  redirect(`${url}`, type);
}
