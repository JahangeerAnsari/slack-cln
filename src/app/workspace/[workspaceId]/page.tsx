"use client";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useChannelStore } from "@/features/channels/store/use-channel-store";
import { useGetCurrentMember } from "@/features/members/api/use-get-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkspaceIdPage = () => {
  const { onOpen,isOpen ,type} = useChannelStore();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const isModalOpen = isOpen && type ==="createChannel";
   const {data:member,isLoading:memberLoading} =  useGetCurrentMember({workspaceId})
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelLoading } = useGetChannels({
    workspaceId,
  });
  const isAdmin = useMemo(() => member?.role ==="admin",[member?.role])
  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  useEffect(() => {
    if (workspaceLoading || channelLoading || !workspace || !member || memberLoading ) {
      return;
    }
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!isModalOpen && isAdmin) {
      onOpen("createChannel");
    }
  }, [
    isAdmin,
    member,
    memberLoading,
    channelId,
    channelLoading,
    onOpen,
    router,
    workspace,
    workspaceId,
    workspaceLoading,
    isModalOpen
  ]);
  if(workspaceLoading || channelLoading){
    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-2">
          <Loader className="size-6 animate-spin text-muted-foreground"/>
          <span className="text-sm text-muted-foreground">
            Workspace not found
          </span>
        </div>
    )
  }
  if(!workspace){
    return (
        <div className="min-h-screen flex flex-1 items-center justify-center flex-col gap-2">
          <TriangleAlert className="size-6 animate-spin text-muted-foreground"/>
          <span className="text-sm text-muted-foreground">
            Workspace not found
          </span>
        </div>
    )
  }

   return (
        <div className="min-h-screen flex flex-1 items-center justify-center flex-col gap-2">
          <TriangleAlert className="size-6  text-muted-foreground"/>
          <span className="text-sm text-muted-foreground">
            Channel not found
          </span>
        </div>
    )
};
export default WorkspaceIdPage;
