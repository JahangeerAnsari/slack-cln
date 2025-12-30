"use client"
import { ChannelModal } from "@/features/channels/modal/create-channel-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/modals/create-workspace-modal"
import { useEffect, useState } from "react";

 export const ModalProvider = () =>{
     const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render anything until mounted
  }

    return (
        <>
        <CreateWorkspaceModal/>
        <ChannelModal/>
        </>
    )
 }