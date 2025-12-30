"use client";

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
    const handleSubmit =({body,file}:onSubmitFormprops) =>{
        console.log({body, file});
        
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
