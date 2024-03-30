"use client";
import { Heart } from "lucide-react";
import { useRef } from "react";

export default function ButtonLike() {
  const button = useRef(null) as any;

  const handlerLike = () => {
    button.current.classList.toggle('fill-red-600');
    button.current.classList.toggle('text-red-600');
  }

  return (
    <div className="flex gap-1">
      <button 
        ref={button} 
        onClick={ () => handlerLike() } 
        className="fill-transparent text-gray-600">
        <Heart className="w-6 h-6 text-gray-600 fill-inherit text-inherit"/>
      </button>
      <span className="text-gray-600">12k</span>
    </div>
  )
}