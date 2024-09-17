"use server";

import { redirect } from "next/navigation";

export async function redirectToProjectList({
  dashboard
} : {
  dashboard: string
}) {
  redirect(`/dashboard/${dashboard}/projects?visibility=all`);
}

export async function navigate(url: string) {
  redirect(`${url}`)
}
