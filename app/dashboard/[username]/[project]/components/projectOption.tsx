
interface OptionProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function ProjectOption({ children, title, description, icon }: OptionProps) {

  return (
    <section className="grid grid-cols-4 border rounded-lg p-4">
      <div className="flex flex-col col-span-3 justify-center items-start">
        <div>
          <span>
            { title }
          </span>
        </div>
        <div>
          <span 
            className="text-sm text-muted-foreground text-nowrap text-ellipsis overflow-hidden">
              { description }
          </span>
        </div>
      </div>
      <div className="flex justify-end items-center">
        { children }
      </div>
    </section>
  )
}