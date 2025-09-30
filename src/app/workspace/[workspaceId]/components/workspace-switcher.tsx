import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceStore } from "@/features/workspaces/store/use-workspace-store";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
export const WorkspaceSwitcher = () => {
    const {isOpen,onOpen} =useWorkspaceStore();

    const router = useRouter()
  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: workspaces, isLoading: isWorkspacesLoading } =
    useGetWorkspaces();
  //show only others workspace not active one
  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace._id != workspaceId
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
         {isWorkspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0"/>
         ): (
          workspace?.name.charAt(0).toUpperCase()
         )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem 
        onClick={() => router.push(`/workspace/${workspaceId}`)}
        className="cursor-pointer flex-col justify-start items-start capitalize">
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
         {filteredWorkspaces?.map((item) => (
            <DropdownMenuItem
             className="cursor-pointer capitalize overflow-hidden"
            key={item?._id} onClick={() =>router.push(`/workspace/${item?._id}`)}>
                <p className="truncate">{item.name}</p>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() =>onOpen("createWorkspace")}>
            <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 text-lg font-semibold rounded-md
            flex items-center justify-center">
             <Plus/>
            </div>
            Create a workspace
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
