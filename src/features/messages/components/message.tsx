

import { Id,Doc } from "../../../../convex/_generated/dataModel"

interface MessageProps{
    id:Id<"messages">;
    memberId:Id<"members">;
    authorImage?:string;
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
    setEditing:(id:Id<"messages"> | null) => void;
    hideThreadButton?:boolean;
    threadCount?:number;
    threadImage?:string;
    threadTimestamp?:number;
}
export const Message = (
    {id,body,createdAt,image,isAuthor,isEditing,memberId,reactions,setEditing,

        updatedAt,authorImage,authorName="Member",hideThreadButton,isCompact,threadCount,
        threadImage,threadTimestamp
        
    }

    :MessageProps) =>{

    return (
        <div>
            <h1>message: {JSON.stringify(body)}</h1>
        </div>
    )
}