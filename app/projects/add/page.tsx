"use client";

import { addProject } from "@/app/lib/actions";
import { PlusCircle, Undo2 } from "lucide-react";
import { create } from 'zustand'

type project = {
  name: string,
  description: string,
  state: 'live' | 'pending',
  url: string,
}

type actions = {
  setName: (value: string) => void,
  setDescription: (value: string) => void,
  setState: (value: 'live' | 'pending') => void,
  setUrl: (value: string) => void,
  reset: () => void,
  validate: () => boolean
}

const initialState: project = {
  name: '',
  description: '',
  state: 'live',
  url: '',
}

const useStore = create<project & actions>((set, get) => ({
  ...initialState,
  setName: (value: string) => set(() => ({ name: value })),
  setDescription: (value: string) => set({ description: value }),
  setState: (value: 'live' | 'pending') => set({ state: value }),
  setUrl: (value: string) => set({ url: value }),
  reset: () => set({ name: '', description: '', state: 'live', url: '' }),
  validate: () => {
    if (get().name === '') return false;
    if (get().description === '') return false;
    if (get().state === 'live' && get().url === '') return false;

    return true
  }
}))

export default function Page() {
  const formState = useStore();
  
  const handlerSubmit = async () => {
    if (!formState.validate()) return;
    
    await addProject({ 
      formName: formState.name, 
      formDescription: formState.description, 
      formUrl: formState.url, 
      formState: formState.state 
    });
  }

  return (
    <main className="col-start-2 col-end-12 flex flex-col">
       
      <form action={ handlerSubmit } className="px-10 pt-10 w-full flex flex-col gap-10 pb-10">

        <section className="flex flex-col">
          <label className="text-lg pl-1">Name</label>
          <input 
            type="text" 
            placeholder="'WebLoom' for example" 
            className="w-full py-2 px-4 border border-gray-200 focus:border-gray-400 rounded-xl outline-none transition-colors"
            onChange={ (e) => formState.setName(e.target.value) }
          />
        </section>

        <section className="flex flex-col">
          <label className="text-lg pl-1">Description</label>
          <textarea 
            placeholder="Description of the project" 
            className="w-full h-fit overflow-auto py-2 px-4 border border-gray-200 focus:border-gray-400 rounded-xl outline-none max-h-[300px] min-h-[100px] transition-colors"
            onChange={ (e) => formState.setDescription(e.target.value) }
          />
        </section>

        <section className="flex flex-col">
          <label className="text-lg pl-1">Visibility<span> - { formState.state === 'live' ? 'Public' : 'Private' }</span></label>
          <div className="flex flex-col gap-5">

            <div 
              className={`p-1 bg-white-primary rounded-xl border border-gray-200 cursor-pointer`} 
              onClick={ () => formState.setState('live') }
              >
              <div className={`p-4 flex flex-col transition-colors rounded-xl border-2 ${ formState.state === 'live' ? 'border-black-primary' : 'border-gray-200' }`}>
                <h3>Public</h3>
                <p className="px-5 py-2 text-gray-600">
                  Make your project visible to everyone. Get feedback and collaboration from other users. This option is ideal if you are looking to share your work with the world 
                  and receive diverse opinions. By making it public, you increase its exposure and the possibility of others benefiting from it.
                </p>
              </div>
            </div>

            <div 
              className={`p-1 bg-white-primary rounded-xl border border-gray-200 cursor-pointer`} 
              onClick={ () => formState.setState('pending') }
              >
              <div className={`p-4 flex flex-col transition-colors rounded-xl border-2 ${ formState.state === 'pending' ? 'border-black-primary' : 'border-gray-200' }`}>
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
            className="w-full py-2 px-4 border border-gray-200 focus:border-gray-400 rounded-xl outline-none transition-colors"
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