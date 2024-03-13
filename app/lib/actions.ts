"use server";

import { createClient } from '@/utils/supabase/server';
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    console.log(formName, formDescription, formUrl, formState);
    
    const { name, description, url, state } = CreateProjectFormSchema.parse({ 
      name: formName, 
      description: formDescription, 
      url: formUrl, 
      state: formState 
    });

    const supabase = createClient();

    const date = new Date().toJSON().slice(0, 10);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const { data, error } = await supabase
      .from("projects")
      .insert([
        { name, description, url, state, users_id: 1, date }
      ]);
    
    revalidatePath("/projects/**");
    redirect("/projects/list");
}