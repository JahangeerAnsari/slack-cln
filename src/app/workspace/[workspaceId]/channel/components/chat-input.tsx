"use client";

import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

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
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId()
  const {mutate:createMessage} =useCreateMessage()
    const handleSubmit =({body,file}:onSubmitFormprops) =>{
        console.log({body, file});
        createMessage({
          body,
          workspaceId,
          channelId
        })
        
    }
  return (
    <div className="px-5 w-full">
      <Editor placeholder={placeholder}
       onSubmit={handleSubmit}
       disabled={false}
       innerRef={editorRef}

      />
    </div>
  );
};

export default ChatInput;
