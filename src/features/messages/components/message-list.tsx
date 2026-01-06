
import { GetMessageReturnType } from "../api/use-get-messages";
import {differenceInMinutes, format, isToday, isYesterday} from "date-fns";
import { Message } from "./message";
import ChannelHero from "./channel-hero";

interface MessageListProps {
    channelName?: string;
    memberImage?: string;
    memberName?: string;
    channelCreationTime?: number;
    data: GetMessageReturnType;
    loadMore: () => void;
    isLoadingMore: boolean;
    canLoadMore: boolean;
    variant?: "channel" | "thread" | "conversation"
}
const MessageList = ({ canLoadMore, data, isLoadingMore, loadMore, channelCreationTime, channelName, memberImage, memberName, variant }: MessageListProps) => {
    const TIME_THRESHOLD =5;
    const groupMessages = data?.reduce((groups,message) =>{
        const date = new Date(message._creationTime);
        const datekey = format(date,"yyyy-MM-dd");
        if(!groups[datekey]){
            groups[datekey] =[]
        }
        groups[datekey].push(message);
        return groups;
    },{}as Record<string,typeof data>) || {}
    
    const formatDateLabel =(DateStr:string) =>{
        const date  = new Date(DateStr);
        if(isToday(date)){
            return "Today"
        }
        if(isYesterday(date)){
            return "Yesterday"
        }
        return format(date,"EEEE,MMMM,d")
    }
    return (
        <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar" >
         {Object.entries(groupMessages || {}).map(([datekey,messages]) =>(
            
            <div key={datekey}>
                <div className="text-center my-2 relative">
                    <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300"/>
                    <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
                     {formatDateLabel(datekey)}
                    </span>
                </div>
               {messages?.map((message,index) =>{
                const prevMessage = messages[index -1];
                const isCompact = prevMessage && prevMessage.user?._id === message.user._id &&
                differenceInMinutes(new Date(message._creationTime),new Date(prevMessage._creationTime))< TIME_THRESHOLD;
                return (
                    <Message
                      key={message._id}
                      id={message._id}
                      memberId = {message.memberId}
                      authorImage ={message.user.image}
                      authorName ={message.user.name}
                      isAuthor={false}
                      reactions={message.reactions}
                      body={message.body}
                      image={message.image}
                      updatedAt={message.updatedAt}
                      createdAt={message._creationTime}
                      isEditing ={false}
                      setIsEditing ={() => {}}
                      isCompact={isCompact}
                      hideThreadButton={false}
                      threadCount={message.threadCount}
                      threadImage={message.threadImage}
                      threadTimestamp={message.threadTimestamp}
                    />
                )
               })}
            </div>
         ))}
         {
            variant ==="channel" && channelName && channelCreationTime && (
                <ChannelHero name={channelName} creationTime={channelCreationTime}/>
            )
         }
        </div>
    )
}
export default MessageList;