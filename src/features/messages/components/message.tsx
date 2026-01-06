

import dynamic from "next/dynamic";
import { Id,Doc } from "../../../../convex/_generated/dataModel"
import { format, isToday, isYesterday } from "date-fns";
import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Thumbnail from "./thumb-nail";
const Renderer = dynamic(() => import("@/features/messages/components/render-message"),{ssr:false})

interface MessageProps{
    id:Id<"messages">;
    memberId:Id<"members">;
    authorImage:string;
    authorName?:string;
    isAuthor:boolean;
    reactions:Array<
    Omit<Doc<"reactions">,"memberId"> &{
        count:number;
        memberIds:Id<"members">[]
    }
    >;
    body:Doc<"messages">["body"];
    image:string | null |undefined;
    createdAt: Doc<"messages">["_creationTime"];
    updatedAt: Doc<"messages">["updatedAt"];
    isEditing:boolean;
    isCompact?:boolean;
    setIsEditing:(id:Id<"messages"> | null) => void;
    hideThreadButton?:boolean;
    threadCount?:number;
    threadImage?:string;
    threadTimestamp?:number;
    
}
export const Message = (
    {id,body,createdAt,image,isAuthor,isEditing,memberId,reactions,setIsEditing,

        updatedAt,authorImage,authorName="Member",hideThreadButton,isCompact,threadCount,
        threadImage,threadTimestamp
        
    }
    :MessageProps) =>{
      
const avatarFallback = authorName?.charAt(0).toUpperCase();
        const formateFullTime = (date :Date) =>{
            return `${isToday(date) ? "Today": isYesterday(date) ? "Yesterday": format(date,"MMM,d,yyyy")} at ${format(date,"h:mm:ss a")}`
        }
        if(isCompact){
             return (
        <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
            <div className="flex items-start gap-2">
               <Hint label={formateFullTime(new Date(createdAt))}>
                <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 
                w-[40px] leading-[22px] text-center hover:underline
               ">{format(new Date(createdAt),"hh:mm")}</button>
               </Hint>
            </div>
            <Renderer value={body}/>
            <Thumbnail url={image}/>
        </div>
    )
        }

        return (
        <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
            <div className="flex items-start gap-2">
               <button>
                 <Avatar>
                          <AvatarImage src={authorImage} />
                          <AvatarFallback className=" bg-sky-500 text-white">
                            {avatarFallback}
                          </AvatarFallback>
                        </Avatar>
                </button>
             <div className="flex flex-col w-full overflow-hidden">
                  <div className="text-sm">
                    <button onClick={() =>{}}
                        className="font-bold text-primary hover:underline"
                        >
                        {authorName}
                    </button>
                    <span></span>
                   <Hint label={formateFullTime(new Date(createdAt))}>
                     <button className="text-xs text-muted-foreground hover:underline">
                        {format(new Date(createdAt),"h:mm:a")}
                    </button>
                    </Hint>

                  </div>
                  <div className="flex flex-col w-full">
                    <Renderer value={body}/>
                    <Thumbnail url={image}/>
                  {updatedAt ? (
                    <span className="text-xs text-muted-foreground">(edited)</span>
                  ):null}
                  </div>
             </div>
            </div>
        </div>
    )
   
}