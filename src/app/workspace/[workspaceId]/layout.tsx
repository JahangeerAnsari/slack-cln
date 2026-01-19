"use client";
import { Sidebar } from "./components/sidebar";
import { Toolbar } from "./components/toolbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSidebar } from "./components/workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Thread } from "@/features/messages/components/thread";
interface WorkspaceIdPageLayoutProps {
  children: React.ReactNode;
}
const WorkspaceIdPageLayout = ({ children }: WorkspaceIdPageLayoutProps) => {
  const { onClose, parentMessageId } = usePanel();
  //string converted to boolean
  const showPanel = !!parentMessageId;
  return (
    <div className="h-full overflow-hidden">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="ca-workspace-layout"
        >
          <ResizablePanel
            defaultSize={15}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            {/* WORKSPACE SIDEBAR */}
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>{children}</ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Thread
                   messageId={parentMessageId as Id<"messages">}
                   onClose={onClose}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader className="size-5 animated-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
export default WorkspaceIdPageLayout;
