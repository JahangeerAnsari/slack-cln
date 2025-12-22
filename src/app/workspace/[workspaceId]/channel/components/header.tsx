import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, TrashIcon } from "lucide-react";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  return (
    <div className="bg-white border-b h-[49px] items-center p-4 overflow-hidden ">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
          >
            <span className="truncate"> # {title}</span>
            <ChevronDown />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
           <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover">
            <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Channel Name</p>
            <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
            </div>
            <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600">
                <TrashIcon className="size-5"/>
                <p className="text-sm font-semibold">Delete channel</p>
            </button>
           </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
