"use client";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useChannelStore } from "@/features/channels/store/use-channel-store";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkspaceIdPage = () => {
  const { onOpen } = useChannelStore();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelLoading } = useGetChannels({
    workspaceId,
  });
  const channelId = useMemo(() => channels?.[0]._id, [channels]);
  useEffect(() => {
    if (workspaceLoading || channelLoading || !workspace) {
      return;
    }
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!channelId) {
      onOpen("createChannel");
    }
  }, [
    channelId,
    channelLoading,
    onOpen,
    router,
    workspace,
    workspaceId,
    workspaceLoading,
  ]);

  return <div>Workspace Id Page</div>;
};
export default WorkspaceIdPage;
