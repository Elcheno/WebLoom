import { 
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { removeProject } from "@/app/lib/actions";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

export default function DeleteProject({ project }: { project: any}) {
  const router = useRouter();

  const handlerDeleteProject = async () => {
    const [data, error] = await removeProject({ id: project?.id });

    if (!error) {
      toast.success(`Project ${project?.name} deleted successfully`);
      router.push('/projects/list');
    } else {
      toast.error(`Error deleting project`);
    }
  }

  return(
    <section className="border-2 border-gray-50 grid grid-cols-4 grid-rows-1 gap-2 rounded-[2rem] p-4">
      <div className="col-start-1 col-end-4 flex flex-col gap-2">
        <div>
          <h3 className="text-lg">Delete Project</h3>
        </div>
        <div className="pl-4">
          <p>
            When you delete your project, it will disappear completely along with all its records in your profile. You lose all trace of its existence, 
            no one will be able to visit it and you will be able to add it again later from scratch.
          </p>
        </div>
      </div>
      <div className="col-start-4 col-end-5 flex items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <button className="bg-black-primary text-white-primary p-1 rounded-full border border-gray-50">
              <div className="flex gap-1 items-center justify-center px-2 py-1 border-2 border-black-primary hover:border-[#EDFD93] transition-colors rounded-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Project
              </div>
          </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-lg">Delete Project</AlertDialogTitle>
                <AlertDialogDescription className="text-base">
                  Are you sure you want to delete this project?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ () => handlerDeleteProject() }>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  )
}