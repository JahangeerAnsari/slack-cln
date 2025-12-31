"use client";

import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
interface ChatInputProps{
    placeholder:string;
}
interface onSubmitFormprops{
  body:string;
  file:File | null;
}
const ChatInput = ({placeholder}:ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  const [isPending,setIsPending] = useState(false);
  const workspaceId = useWorkspaceId();
  const[editorKey, setEditorKey] = useState(0)
  const channelId = useChannelId()
  const {mutate:createMessage} =useCreateMessage()
    const handleSubmit = async({body,file}:onSubmitFormprops) =>{
        console.log({body, file});
       try {
        setIsPending(true)
        await  createMessage({
          body,
          workspaceId,
          channelId
        },{throwError:true})
        setEditorKey((prev) => prev +1)
       } catch (error) {
        toast.error("Failed to send message")
       }
       finally{
        setIsPending(false)
       }
    }
  return (
    <div className="px-5 w-full">
      <Editor 
      key={editorKey}
      placeholder={placeholder}
       onSubmit={handleSubmit}
       disabled={isPending}
       innerRef={editorRef}

      />
    </div>
  );
};

export default ChatInput;
