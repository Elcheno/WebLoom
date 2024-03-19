"use client";

import { addProject } from "@/app/lib/actions";
import { PlusCircle, Undo2 } from "lucide-react";
import { create } from 'zustand'
import { toast } from 'sonner'
import { redirect } from "next/navigation";

type state = {
  name: {
    value: string,
    valid: boolean,
    pristine: boolean
  },
  description: {
    value: string,
    valid: boolean,
    pristine: boolean
  },
  visibility: {
    value: 'public' | 'private',
    valid: boolean,
    pristine: boolean
  },
  url: {
    value: string,
    valid: boolean,
    pristine: boolean
  },
}

type actions = {
  pristine: boolean,
  valid: boolean,
  setName: (value: string) => void,
  setDescription: (value: string) => void,
  setVisibility: (value: 'public' | 'private') => void,
  setUrl: (value: string) => void,
  reset: () => void,
  validate: () => void,
}

const initialState: state = {
  name: { value: '', valid: false, pristine: true },
  description: { value: '', valid: false, pristine: true },
  visibility: { value: 'public', valid: true, pristine: true },
  url: { value: '', valid: false, pristine: true },
}

const useStore = create<state & actions>((set, get) => ({
  ...initialState,
  setName: (value: string) => {
    set(() => ({ name: { value, valid: value.trim() !== '', pristine: false } })),
    get().validate()
  },
  setDescription: (value: string) => {
    set({ description: { value, valid: value.trim() !== '', pristine: false }}),
    get().validate()
  },
  setVisibility: (value: 'public' | 'private') => {
    set({ visibility: { value, valid: true, pristine: false } })
    if (value === 'private') set({ url: { ...get().url, valid: true }});
    get().validate()
  },
  setUrl: (value: string) => {
    const valid = () => {
      if (get().visibility.value === 'public') return value.trim() !== '';
      return true;
    }
    set({ url: { value, valid: valid(), pristine: false } }),
    get().validate()
  },
  pristine: true,
  valid: false,
  reset: () => {
    set(initialState)
  },
  validate: () => {
    set({ pristine: false });
    if (!get().name.valid) {
      set({ valid: false})
      return;
    };
    if (!get().description.valid) {
      set({ valid: false})
      return;
    };
    if (!get().url.valid) {
      set({ valid: false})
      return;
    };

    set({ valid: true})
  },
}))

export default function Page() {
  const formState = useStore();  
  
  const handlerSubmit = async () => {   
    if (!formState.valid) {
      toast.warning('Invalid project, check fields');
      return;
    };
    
    const [data, error] = await addProject({ 
      formName: formState.name.value, 
      formDescription: formState.description.value, 
      formUrl: formState.url.value, 
      formVisibility: formState.visibility.value
    });

    if (error) {
      toast('Error adding project');
      console.log(error);

    } else {
      toast.success(`Project ${formState.name.value} added successfully`);
      formState.reset();
      redirect('/projects/list');

    }
  }

  return (
    <main className="col-start-3 col-end-11 flex flex-col">
       
      <form action={ handlerSubmit } className="px-10 pt-10 w-full flex flex-col gap-10 pb-10">

        <section className="flex flex-col">
          <label className="text-lg pl-1">Name</label>
          <input 
            type="text" 
            placeholder="'WebLoom' for example" 
            className={`w-full py-2 px-4 border-2 rounded-xl outline-none transition-colors ${ !formState.name.pristine && !formState.name.valid ? "border-red-500" : "border-gray-200 focus:border-gray-400"}`}
            onChange={ (e) => formState.setName(e.target.value) }
          />
        </section>

        <section className="flex flex-col">
          <label className="text-lg pl-1">Description</label>
          <textarea 
            placeholder="Description of the project" 
            className={`w-full h-fit border-2 overflow-auto py-2 px-4 rounded-xl outline-none max-h-[300px] min-h-[100px] transition-colors ${ !formState.description.pristine && !formState.description.valid ? "border-red-500" : "border-gray-200 focus:border-gray-400"}`}
            onChange={ (e) => formState.setDescription(e.target.value) }
          />
        </section>

        <section className="flex flex-col">
          <label className="text-lg pl-1">Visibility<span> - { formState.visibility.value === 'public' ? 'Public' : 'Private' }</span></label>
          <div className="flex flex-col gap-5">

            <div 
              className={`p-1 bg-white-primary rounded-xl border border-gray-200 cursor-pointer`} 
              onClick={ () => formState.setVisibility('public') }
              >
              <div className={`p-4 flex flex-col transition-colors rounded-xl border-2 ${ formState.visibility.value === 'public' ? 'border-black-primary' : 'border-gray-200' }`}>
                <h3>Public</h3>
                <p className="px-5 py-2 text-gray-600">
                  Make your project visible to everyone. Get feedback and collaboration from other users. This option is ideal if you are looking to share your work with the world 
                  and receive diverse opinions. By making it public, you increase its exposure and the possibility of others benefiting from it.
                </p>
              </div>
            </div>

            <div 
              className={`p-1 bg-white-primary rounded-xl border border-gray-200 cursor-pointer`} 
              onClick={ () => formState.setVisibility('private') }
              >
              <div className={`p-4 flex flex-col transition-colors rounded-xl border-2 ${ formState.visibility.value === 'private' ? 'border-black-primary' : 'border-gray-200' }`}>
                <h3>Private</h3>
                <p className="px-5 py-2 text-gray-600">
                  Control who accesses your project. Ideal for confidential or private work. This option gives you control over the privacy of your work, ensuring that only you can access it. 
                  It is perfect for sensitive projects or projects in early stages of development.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="flex flex-col">
          <label className="text-lg pl-1">URL</label>
          <input 
            type="text" 
            placeholder="'https://webloom.com' for example" 
            className={`w-full py-2 px-4 border-2 rounded-xl outline-none transition-colors ${ !formState.url.pristine && !formState.url.valid ? "border-red-500" : "border-gray-200 focus:border-gray-400"}`}
            onChange={ (e) => formState.setUrl(e.target.value) }
          />
        </section>

        <section className="flex justify-between">
          <button 
            type="submit" 
            className="rounded-full bg-black-primary border-gray-50 p-1"
            >
            <div className="border-2 border-black-primary hover:border-[#b8d900] flex flex-nowrap gap-2 rounded-full p-2 transition-colors m-auto">
              <PlusCircle className="w-6 h-6 text-white-primary"/>
              <span className="text-white-primary text-lg">Add Project</span>
            </div>
          </button>

          <button 
            type="button" className="rounded-full bg-gray-300 border-gray-50 p-1" 
            onClick={ () => window.history.back() }
            >
            <div className="border-2 border-gray-300 hover:border-black-primary flex flex-nowrap gap-2 rounded-full p-2 transition-colors m-auto">
              <Undo2 className="w-6 h-6 text-black-primary"/>
              <span className="text-black-primary text-lg">Back</span>
            </div>
          </button>
        </section>
    
      </form>
      
    </main>
  )
}