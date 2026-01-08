import { Button } from "@/components/ui/button";
import { EmojiPopover } from "@/components/ui/emoji-popover";
import { Emoji } from "@emoji-mart/data";
import { MessageSquareCodeIcon, MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";

interface ToolbarProps{
isAuthor:boolean;
isPending:boolean;
handleEdit:() =>void;
handleThread:() =>void;
handleReaction:(value:string) =>void;
handleDelete:()=>void;
hideThreadButton?:boolean;
}
const Toolbar = ({handleDelete,handleEdit,handleReaction,handleThread
    ,hideThreadButton,isAuthor,isPending
}:ToolbarProps) =>{
    return(
        <div className="absolute top-0 right-5">
            <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm ">
            <EmojiPopover hint="reactions" onEmojiSelect={(emoji) => handleReaction(emoji?.native)}>
                <Button variant="ghost" size="iconSm" disabled={isPending}>
             <Smile className="size-4"/>
            </Button>
            </EmojiPopover>
            {!hideThreadButton && (
                <Button onClick={handleThread} variant="ghost" size="iconSm" disabled={isPending}>
             <MessageSquareTextIcon className="size-4"/>
            </Button>
            )}
             {isAuthor && (
                <>
                <Button onClick={handleEdit} variant="ghost" size="iconSm" disabled={isPending}>
             <Pencil className="size-4"/>
            </Button>
            <Button onClick={handleDelete} variant="ghost" size="iconSm" disabled={isPending}>
             <Trash className="size-4"/>
            </Button>
                </>
             )}
            </div>
        
        </div>
    )
}
export default Toolbar;