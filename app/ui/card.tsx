export default function Card({ children, classList }: any) {
  return (
    <div className={`bg-white-primary w-full h-full rounded-[2rem] ${classList}`}>
      { children }
    </div>
  )
}