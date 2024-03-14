"use server";

import { createClient } from '@/utils/supabase/server';
import { z } from "zod";
import { revalidatePath } from "next/cache";

const CreateProjectSchema = z.object({
  id: z.number(),
  users_id: z.number(),
  name: z.string(),
  description: z.string(),
  url: z.string(),
  state: z.enum(["live", "pending"]),
  date: z.string()
});

const CreateProjectFormSchema = CreateProjectSchema.omit({
  id: true,
  users_id: true,
  date: true
});

export async function addProject(
  { formName, formDescription, formUrl, formState }
  : { 
      formName: string, 
      formDescription: string, 
      formUrl: string, 
      formState: string 
  }) {  
    const { name, description, url, state } = CreateProjectFormSchema.parse({ 
      name: formName, 
      description: formDescription, 
      url: formUrl, 
      state: formState 
    });

    const supabase = createClient();

    const date = new Date().toJSON().slice(0, 10);

    // await new Promise((resolve) => setTimeout(resolve, 500));

    const { data, error } = await supabase
      .from("projects")
      .insert([
        { name, description, url, state, users_id: 1, date }
      ]);

    if (!error) {
      revalidatePath("/projects/**");
    }

    return [data, error];
}

export async function removeProject(
  { id }
  : {
    id: number
  }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}

export async function changeVisibilityLive(
  { id }
  : {
    id: number
  }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ state: "live" })
    .eq("id", id);

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}

export async function changeVisibilityPending(
  { id }
  : {
    id: number
  }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ state: "pending" })
    .eq("id", id);

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}