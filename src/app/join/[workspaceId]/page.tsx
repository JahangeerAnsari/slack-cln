"use client";
import { Button } from "@/components/ui/button";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoinCode } from "@/features/workspaces/api/use-join";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";
interface JoinCodeProps{
    params:{
        workspaceId:string;
    }
}
const WorkspaceJoinPage = () => {
    const workspaceId = useWorkspaceId()
    const router = useRouter()
    const {mutate:joinWorkspace, isPending:isJoinPending} = useJoinCode();
    const {data,isLoading} =useGetWorkspaceInfo({id:workspaceId})
      const handleJoinWorkspace = (value:string) =>{
        joinWorkspace({joinCode:value,workspaceId:workspaceId},{
            onSuccess:(id) =>{
                router.replace(`/workspace/${id}`)
                toast.success("Workspace Joined !")
            },
            onError:() =>{
                toast.error("Failed to join workspace")
            }
        });
          
      }
       if(isLoading){
        return (
            <div className="h-full flex justify-center items-center">
             <Loader className="size-6 animate-spin text-muted-foreground"/>
            </div>
        )
       }
  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
      <Image src={"/hashtag.svg"} width={60} height={60} alt="hashtag" />
      <div className="flex flex-col gap gap-y-4 items-center justify-center max-w-md">
        <h1 className="text-2xl font-bold">Join #{data?.name} Workspace</h1>
        <p>Enter joinCode to join workspace</p>
      </div>
      <VerificationInput
        length={6}
        classNames={{
          container: "flex gap-x-2",
          character:
            "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center",
          characterInactive: "bg-muted",
          characterSelected: "bg-white text-black",
          characterFilled: "bg-white text-black",
        }}
        autoFocus
        onComplete={handleJoinWorkspace}
      />
      <div className="flex flex-col gap-y-4">
       <Button size="lg" variant="secondary"> Back to home
        <Link href="/">
        </Link>
       </Button>
      </div>
    </div>

  );
};

export default WorkspaceJoinPage;
