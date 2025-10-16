"use client";
import { Sidebar } from "./components/sidebar";
import { Toolbar } from "./components/toolbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSidebar } from "./components/workspace-sidebar";
interface WorkspaceIdPageLayoutProps {
  children: React.ReactNode;
}
const WorkspaceIdPageLayout = ({ children }: WorkspaceIdPageLayoutProps) => {
  return (
    <div className="h-full overflow-hidden">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId ="ca-workspace-layout">
            <ResizablePanel defaultSize={15} minSize={11} className="bg-[#5E2C5F]">
              {/* WORKSPACE SIDEBAR */}
              <WorkspaceSidebar/>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel>
                 {children}
            </ResizablePanel>
        </ResizablePanelGroup>
       
      </div>
    </div>
  );
};
export default WorkspaceIdPageLayout;
