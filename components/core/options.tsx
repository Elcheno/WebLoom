import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid"

type OptionsProps = {
  children?: React.ReactNode;
  label?: string
};

export const Options: React.FC<OptionsProps> = ({ children, label }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="cursor-pointer hover:bg-gray-200 p-[.2rem] rounded-md transition-colors">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
