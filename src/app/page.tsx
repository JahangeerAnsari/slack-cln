"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceStore } from "@/features/workspaces/store/use-workspace-store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
export default function Home() {
  const router  = useRouter()
  const { data, isLoading } = useGetWorkspaces();
   const { isOpen,onOpen } = useWorkspaceStore();
  // jest get the first workspaceId
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  // if we have workspaceId redirect to the /workspaces/id page
  // otherwise open workspace modal 
  useEffect(() =>{
      if(isLoading){
        return 
      }
      if(workspaceId){
        // replace wont back previous
       router.replace(`/workspace/${workspaceId}`);
      }else if(!isOpen){
     onOpen("createWorkspace")
       
      }
  },[workspaceId,isLoading,onOpen,isOpen,router])
  return (
    <div>
      <UserButton />
    </div>
  );
}
