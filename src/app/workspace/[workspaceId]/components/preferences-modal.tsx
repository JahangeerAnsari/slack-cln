import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace copy";
import { useConfirmation } from "@/hooks/use-confirmation";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}
export const PreferencesModal = ({
  initialValue,
  open,
  setOpen,
}: PreferencesModalProps) => {
  const [value, setValue] = useState(initialValue);
  const [ConfirmDialog, confirm] =useConfirmation("Are you sure?","This action is cannot be change.")
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const {mutate:updateWorkspace, isPending:isUpdateWorkspacePending} =useUpdateWorkspace();
  const {mutate:deleteWorkspace, isPending:isDeleteWorkspacePending} =useDeleteWorkspace();
  const [editOpen,setEditOpen] = useState(false)
  const handleEditWorkspace = (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      updateWorkspace({
        id:workspaceId,
        name:value
      },{
        onSuccess:() =>{
          toast.success("workspace updated");
           setEditOpen(false)
        },
        onError:() =>{
          toast.error('Failed to update workspace')
        }
      })

  }
  const handleDeleteWorkspace = async () =>{ 
    // confirmation modal
    // const ok = await confirm();
    //  if(!ok) return;
    deleteWorkspace({
      id:workspaceId 
    },{
      onSuccess:() =>{
        toast.success('Workspace deleted');
        router.replace("/")
      },
      onError:() =>{
          toast.error('Failed to delete workspace')
        }
    }
)
  }
  return (
    <>
    {/* <ConfirmDialog/> */}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold"> workspace name</p>
              <p className="text-sm text-[#2364a3]">Edit</p>
            </div>
            <p className="text-sm">{value}</p>
          </div>
            </DialogTrigger>
            
              <DialogContent>
                <DialogHeader>
                <DialogTitle>Rename the workspace</DialogTitle>
                </DialogHeader>
             
            <form className="space-y-4" onSubmit={handleEditWorkspace}>
             <Input value={value} disabled={isUpdateWorkspacePending} onChange={(e)=> setValue(e.target.value)}
             required autoFocus minLength={3} maxLength={80} placeholder="Workspace e.g. Home, Personals"/>
             <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isUpdateWorkspacePending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button  disabled={isUpdateWorkspacePending}>Save</Button>
             </DialogFooter>
            </form>
            </DialogContent>
            
          </Dialog>
          <button
            disabled={isDeleteWorkspacePending}
            onClick={handleDeleteWorkspace}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg
         border cursor-pointer hover:bg-gray-50 text-rose-600 
          "
          >
            <TrashIcon className="size-4 mr-2"/>
            <p className="text-sm font-semibold">Delete workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
    </>
    
  );
};
