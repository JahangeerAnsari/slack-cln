import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { Loader, TriangleAlert, XIcon } from "lucide-react";
import { useGetMessage } from "../api/use-get-message";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetCurrentMember } from "@/features/members/api/use-get-current-member";
import { useState } from "react";
import { Message } from "./message";

interface ThreadProps {
  messageId: Id<"messages">;
  onClose: () => void;
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
  const { data: message, isLoading: isMessageLoading } = useGetMessage({
    id: messageId,
  });
  const [isEditingId,setIsEditingId] = useState<Id<"messages"> | null>(null)
  const workspaceId = useWorkspaceId();
  const  {data:currentMember ,isLoading:isCurrentMemberLoading} = useGetCurrentMember({workspaceId})
  if (isMessageLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center p-4 border-b">
          <p>Thread</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  if (!message) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center p-4 border-b">
          <p>Thread</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full items-center justify-center">
          <TriangleAlert className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Message not found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <div className="h-[49px] flex justify-between items-center p-4 border-b">
        <p>Thread</p>
        <Button onClick={onClose} size="iconSm" variant="ghost">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div>
        <Message
         hideThreadButton
         memberId={message.memberId}
         authorName={message.user.name}
         authorImage={message.user.image as string}
         isAuthor={message.memberId === currentMember?._id}
         body={message.body}
         image={message.image}
         createdAt={message._creationTime}
         updatedAt={message.updatedAt}
         id={message._id}
         reactions={message.reactions}
         isEditing={isEditingId === message._id}
         setIsEditing={setIsEditingId}
        />
      </div>
    </div>
  );
};
