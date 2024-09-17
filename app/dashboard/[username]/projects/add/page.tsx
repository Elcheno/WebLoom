"use client";

import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { insertProject } from "@/app/lib/actions/actions.project"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { redirectToProjectList } from "@/app/lib/actions/actions.route"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.optional(z.string()),
  visibility: z.enum(["public", "private"]),
  url: z.string().url().optional().or(z.literal(""))
})

const privateDescription = "Control who accesses your project. Ideal for confidential or private work. This option gives you control over the privacy of your work, ensuring that only you can access it.";
const publicDescription = "Make your project visible to everyone. Get feedback and collaboration from other users. This option is ideal if you are looking to share your work with the world.";

export default function AddProject({ params }: { params: { username: string, project: string } }) {
  console.log(params);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "private",
      url: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description ?? "");
    formData.append("visibility", values.visibility);
    formData.append("url", values.url ?? "");
    const result = await insertProject(undefined, formData);

    if (!result) {
      toast.success(`Project has been created`)
      await redirectToProjectList({ dashboard: params.username });

    } else {
      toast.error(`Project has not been created`)
      
    }
  }

  return (
    <>
      <Card className="max-w-[40rem] m-auto">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Add a new project to your account, after that you can manage it.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="WebLoom" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="This project..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the description of your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                        </SelectContent>
                      </Select>                    
                  </FormControl>
                    <FormDescription>
                      { 
                        field.value === 'private' 
                          ? privateDescription 
                          : publicDescription
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>

                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder="https://webloom.es" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the public url of your project. This field is optional.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Create</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
