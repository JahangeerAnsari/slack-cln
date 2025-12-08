
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { useInviteStore } from "@/features/invite-people/store/use-invite-store";
import {  } from "@radix-ui/react-dialog";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateJoinCode } from "@/features/workspaces/api/use-update-joincode";
import { useConfirm } from "@/hooks/use-confirmation";
interface InvitePeopleProps{
  name:string;
  joinCode:string;
}
export const InviteModal = ({joinCode,name}:InvitePeopleProps) => {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you Sure?",
    "This action will deactivate your current invite code and generate a new invite code"
  )
  const { isOpen, onClose, type } = useInviteStore();
  const isModalOpen = isOpen && type === "invitePeople";
 const {mutate,isPending} = useUpdateJoinCode()
  const handleCloseModal = () => {
    onClose();
  };
  const handleCopy = () =>{
    const inviteLink =  `${window.location.origin}/join/${workspaceId}`;
    window.navigator.clipboard
    .writeText(inviteLink).then(() => toast.success("Invite link copy from clipboard"))
  }
   const handleGenerateNewCode =async () =>{
    const okay =  await confirm();
     if(!okay)return;
     mutate({
      workspaceId:workspaceId
     },{
      onSuccess:() =>{
        toast.success("Invite link copied")
      }, onError:() =>{
        toast.error('Error while copied invite link')
      }
     })
   }
 
  return (
    <>
    <ConfirmDialog/>
     <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="space-y-2">Invite People to the {name} Workspace</DialogTitle>
            <DialogDescription>
                Use this code below to invite people to your workspace
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center justify-end py-10">
         <p className="text-4xl font-bold tracking-widest uppercase">{joinCode}</p>
         <Button variant="ghost" size="sm" onClick={handleCopy}>
           Copy Text
           <HiOutlineClipboardDocument />
         </Button>
         
        </div>
         <DialogFooter>
             <div className="flex  w-full mr-5">
         <Button disabled={isPending} variant="default"  size="default" onClick={handleGenerateNewCode}>
           New Code
           <RefreshCcw className="size-4 ml-2"/>
         </Button>
          <DialogClose>
          <Button asChild variant="default">
            Close
          </Button>
         </DialogClose>
         </div>
        
         </DialogFooter>
       
        
      </DialogContent>
    </Dialog>
    
    </>
   
  );
};
