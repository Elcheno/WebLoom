
export default function ProjectsLayout({
  children
} : {
  children: React.ReactNode
}) {

  return (
    <>
      <div className="p-4 xl:p-0">
        { children }
      </div>
    </>
  )
}
