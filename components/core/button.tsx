interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  view?: 'normal' | 'full';
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  onClick = () => {},
  variant = 'primary',
  view = 'normal',
  type = 'button'
}: ButtonProps) {
  return (
    <button type={ type } onClick={onClick} className={`${variant === 'primary' && 'bg-black-primary text-white-primary' }  ${variant === 'secondary' && 'bg-white-primary text-black-primary' } ${ view === 'full' && 'w-full' } p-1 rounded-lg border border-gray-300`}>
      <div className={`${variant === 'primary' && 'border-black-primary hover:border-[#EDFD93]' } ${ variant === 'secondary' && 'border-white-primary hover:border-slate-primary'} flex gap-1 items-center justify-center px-2 py-1 border-2 transition-colors rounded-md`}>
        {children}
      </div>
    </button>
  )
}