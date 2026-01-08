import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useGetCurrentMember } from "@/features/members/api/use-get-current-member";
import { cn } from "@/lib/utils";

interface ReactionsProps{
    data:Array< Omit<Doc<"reactions">,"memberId"> &{
        count:number;
        memberId:Id<"members">[]
    }>;
    onChange:(value:string) =>void;
}

const Reactions = ({data,onChange}:ReactionsProps) => {
    const workspaceId = useWorkspaceId();
    const {data:currentMember} = useGetCurrentMember({workspaceId})
    const currentMemberId = currentMember?._id;
    if(data.length === 0 || !currentMemberId){
        return null;
    }
    return ( 
        <div className="flex items-center gap-1 mt-1 mb-1">
          {data.map((reaction) => (
            <button
             className={cn("h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800",
                reaction.memberId.includes(currentMemberId) && "BG-BLUE-100/70 BORDER-BLUE-500 text-blue-500"
             )}
            key={reaction._id}>{reaction.value}
             <span>{reaction.count}</span>
            </button>
           
          ))}
        </div>
     );
}
 
export default Reactions;