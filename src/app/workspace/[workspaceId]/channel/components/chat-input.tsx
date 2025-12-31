"use client";

import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
interface ChatInputProps{
    placeholder:string;
}
interface onSubmitFormprops{
  body:string;
  file:File | null;
}
type CreateMessageValues ={
  channelId:Id<"channels">,
  workspaceId:Id<"workspaces">,
  body:string;
  image: Id<"_storage"> | undefined

}
const ChatInput = ({placeholder}:ChatInputProps) => {
   const {mutate:createMessage} =useCreateMessage()
  const {mutate:uploadUrl} = useGenerateUploadUrl()
  const editorRef = useRef<Quill | null>(null);
  const [isPending,setIsPending] = useState(false);
  const workspaceId = useWorkspaceId();
  const[editorKey, setEditorKey] = useState(0)
  const channelId = useChannelId()
 
    const handleSubmit = async({body,file}:onSubmitFormprops) =>{
        console.log({body, file});
       try {
        setIsPending(true);
        editorRef.current?.enable(false);
        const values :CreateMessageValues ={
          channelId,
          workspaceId,
          body,
          image:undefined
        }
        if(file){
          const url = await uploadUrl({},{throwError:true});
          if(!url){
            throw new Error("Url not found")
          }
          const result = await fetch(url,{
            method:"POST",
            headers:{"Content-Type":file.type},
            body:file
          });
          if(!result.ok){
            throw new Error("Failed to upload image")
          }
          const {storageId} = await result.json();
          values.image = storageId;

        }
        console.log("values",values);
        
        await  createMessage(values,{throwError:true})
        setEditorKey((prev) => prev +1)
       } catch (error) {
        toast.error("Failed to send message")
       }
       finally{
        setIsPending(false);
          editorRef.current?.enable(true)
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
