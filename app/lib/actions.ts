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
  visibility: z.enum(["public", "private"]),
  date: z.string()
});

const CreateProjectFormSchema = CreateProjectSchema.omit({
  id: true,
  users_id: true,
  date: true
});

export async function addProject(
  { formName, formDescription, formUrl, formVisibility }
  : { 
      formName: string, 
      formDescription: string, 
      formUrl: string, 
      formVisibility: string 
  }) {  
    const { name, description, url, visibility } = CreateProjectFormSchema.parse({ 
      name: formName, 
      description: formDescription, 
      url: formUrl, 
      visibility: formVisibility 
    });

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("projects")
      .insert([
        { name, description, url, visibility, user_id: user?.id }
      ]);

    if (!error) {
      revalidatePath("/projects/**");
    }

    return [data, error];
}

export async function removeProject(
  { id }
  : {
    id: string
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

export async function changeVisibilityPublic(
  { id }
  : {
    id: string
  }
) {

  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ visibility: "public" })
    .eq("id", id);

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}

export async function changeVisibilityPrivate(
  { id }
  : {
    id: string
  }
) {

  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ visibility: "private" })
    .eq("id", id);

  console.log(data, error);
  

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}

export async function addUrlToProject(
  { id, url }
  : {
    id: number,
    url: string
  } 
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ url: url })
    .eq("id", id);

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}

export async function updateNameProject(
  { id, name }
  : {
    id: string,
    name: string
  } 
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ name: name })
    .eq("id", id);

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}

export async function updateDescriptionProject(
  { id, description }
  : {
    id: string,
    description: string
  } 
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ description: description })
    .eq("id", id);

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}

export async function updateUrlProject(
  { id, url }
  : {
    id: string,
    url: string
  } 
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({ url: url })
    .eq("id", id);

  if (!error) {
    revalidatePath("/projects/**");
  }

  return [data, error];
}
