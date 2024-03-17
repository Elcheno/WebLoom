import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function CopyClipboard({ project }: { project: any }) {
  const [ clipboard, setClipboard ] = useState<boolean>(false);

  const handlerCopyClipboard = () => {
    navigator.clipboard.writeText(project?.url);
    toast.success('URL copied to clipboard');
    setClipboard(true);
    setTimeout(() => {
      setClipboard(false);
    }, 250);
  }

  return(
    <div className="flex flex-nowrap gap-2 items-center">
      {
        project?.url
          ? (
            <>
              <a href={ project?.url } target="_blank" rel="noreferrer" className="text-lg hover:underline">{ project?.url }</a>
              <Copy className={`w-5 h-5 cursor-pointer ${clipboard ? 'animate-scale-pulse' : ''}`} onClick={ () => handlerCopyClipboard() } />
            </>
          ) : (
            <span className="text-lg">Try to add a URL</span>
          )
      }
    </div>
  )
}