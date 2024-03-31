"use client";

import { likeProject, unlikeProject } from "@/app/lib/actions";
import { likePublicEntity } from "@/types/types";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ButtonLike({ 
  like
}: { 
  like: likePublicEntity 
}) {
  const [state, setState] = useState(like.state);
  const [numberLikes, setNumberLikes] = useState(like.numberLikes);

  const handlerLikeAndUnlike = async () => {
    if (state) {
      setNumberLikes(numberLikes - 1);
      setState(false);
    
      const [data, error] = await unlikeProject({ id: like.id });
      
      if (!error) {
        toast.success("Unliked 😿");
      
      } else {
        toast.error("Error unliking");
        setNumberLikes(numberLikes + 1);
        setState(true);
      }

    } else {
      setNumberLikes(numberLikes + 1);
      setState(true);
    
      const [data, error] = await likeProject({ id: like.project_id });
      
      if (!error) {
        toast.success("Liked 😻");
      
      } else {
        toast.error("Error liking");
        setNumberLikes(numberLikes - 1);
        setState(false);
      }
    }
  }

  return (
    <div className="flex gap-1">
      <button onClick={ () => handlerLikeAndUnlike() }>
        <Heart className={`w-6 h-6 text-gray-600 ${ state ? "fill-red-500 text-red-500" : "" }`}/>
      </button>
      <span className="text-gray-600"> { numberLikes }</span>
    </div>
  )
}